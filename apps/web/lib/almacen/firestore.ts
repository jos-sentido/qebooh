import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import {
  FieldValue,
  getFirestore,
  type CollectionReference,
  type DocumentReference,
  type Firestore,
} from "firebase-admin/firestore";
import type { Seccion } from "../secciones";
import {
  ESTADO_INICIAL,
  nuevaEntrada,
  type Almacen,
  type EntradaBitacora,
  type EstadoPublicacion,
} from "./tipos";

/**
 * Almacén en Firestore. Es el adaptador de producción.
 *
 * Usa el SDK de administración, no el de cliente: las escrituras ya vienen
 * autorizadas por la clave de la sección y se hacen desde el servidor, así que
 * no hace falta exponer nada al navegador ni depender de reglas de seguridad.
 * La cuenta de servicio nunca sale del servidor.
 *
 * Estructura: `publicacion_estado/{seccion}/publicaciones/{slug}`. Con la
 * sección en la ruta, listar una sección es leer una colección — sin consultas
 * ni índices compuestos que mantener.
 */

const RAIZ = "publicacion_estado";
const SUBCOLECCION = "publicaciones";

type CredencialesCuenta = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

/**
 * Lee la cuenta de servicio del entorno.
 *
 * Se acepta el JSON tal cual o codificado en base64: pegar un JSON con saltos
 * de línea en el panel de variables de entorno es una fuente conocida de
 * errores, y base64 lo evita.
 */
function credencialesDelEntorno(): CredencialesCuenta | null {
  const bruto = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!bruto || bruto.length === 0) return null;

  const texto = bruto.trimStart().startsWith("{")
    ? bruto
    : Buffer.from(bruto, "base64").toString("utf8");

  let datos: Record<string, unknown>;
  try {
    datos = JSON.parse(texto) as Record<string, unknown>;
  } catch {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT no es JSON válido (ni JSON en base64).",
    );
  }

  const projectId = String(datos["project_id"] ?? "");
  const clientEmail = String(datos["client_email"] ?? "");
  // En muchos paneles la clave llega con "\n" literales en vez de saltos de
  // línea reales; sin esto la firma falla con un error poco descriptivo.
  const privateKey = String(datos["private_key"] ?? "").replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT incompleto: faltan project_id, client_email o private_key.",
    );
  }

  return { projectId, clientEmail, privateKey };
}

/** ¿Hay configuración de Firebase utilizable en este entorno? */
export function firebaseConfigurado(): boolean {
  const conEmulador =
    Boolean(process.env.FIRESTORE_EMULATOR_HOST) &&
    Boolean(process.env.FIREBASE_PROJECT_ID);
  return conEmulador || Boolean(process.env.FIREBASE_SERVICE_ACCOUNT);
}

/**
 * La app de firebase-admin se registra por nombre en el proceso, así que
 * inicializarla dos veces lanza. Se reutiliza si ya existe.
 */
function appAdmin(): App {
  const existente = getApps()[0];
  if (existente) return existente;

  // Con el emulador el SDK no valida credenciales: basta el projectId.
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    return initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
  }

  const credenciales = credencialesDelEntorno();
  if (!credenciales) {
    throw new Error("Falta FIREBASE_SERVICE_ACCOUNT para conectar a Firestore.");
  }

  return initializeApp({
    credential: cert({
      projectId: credenciales.projectId,
      clientEmail: credenciales.clientEmail,
      privateKey: credenciales.privateKey,
    }),
    projectId: credenciales.projectId,
  });
}

function aEstado(datos: FirebaseFirestore.DocumentData | undefined): EstadoPublicacion {
  if (!datos) return ESTADO_INICIAL;
  const bitacora = Array.isArray(datos["bitacora"])
    ? (datos["bitacora"] as EntradaBitacora[])
    : [];
  return {
    archivada: datos["archivada"] === true,
    eliminada: datos["eliminada"] === true,
    // Se guarda añadiendo al final (que es lo concurrente-seguro en Firestore)
    // y se ordena al leer, para mostrar lo más reciente primero.
    bitacora: [...bitacora].sort((a, b) => b.fecha.localeCompare(a.fecha)),
  };
}

export class AlmacenFirestore implements Almacen {
  readonly nombre = "firestore";

  private db: Firestore;

  constructor() {
    this.db = getFirestore(appAdmin());
  }

  private coleccion(seccion: Seccion): CollectionReference {
    return this.db.collection(RAIZ).doc(seccion).collection(SUBCOLECCION);
  }

  private documento(seccion: Seccion, slug: string): DocumentReference {
    return this.coleccion(seccion).doc(slug);
  }

  async leerSeccion(seccion: Seccion): Promise<Map<string, EstadoPublicacion>> {
    const instantanea = await this.coleccion(seccion).get();
    return new Map(
      instantanea.docs.map((doc) => [doc.id, aEstado(doc.data())] as const),
    );
  }

  async leer(seccion: Seccion, slug: string): Promise<EstadoPublicacion> {
    const doc = await this.documento(seccion, slug).get();
    return doc.exists ? aEstado(doc.data()) : ESTADO_INICIAL;
  }

  private async fijarBandera(
    campo: "archivada" | "eliminada",
    seccion: Seccion,
    slug: string,
    valor: boolean,
  ): Promise<void> {
    await this.documento(seccion, slug).set(
      { [campo]: valor, actualizado: FieldValue.serverTimestamp() },
      { merge: true },
    );
  }

  fijarArchivada(seccion: Seccion, slug: string, valor: boolean): Promise<void> {
    return this.fijarBandera("archivada", seccion, slug, valor);
  }

  fijarEliminada(seccion: Seccion, slug: string, valor: boolean): Promise<void> {
    return this.fijarBandera("eliminada", seccion, slug, valor);
  }

  async anotar(
    seccion: Seccion,
    slug: string,
    entrada: Omit<EntradaBitacora, "id" | "fecha">,
  ): Promise<void> {
    // `arrayUnion` añade sin leer primero, así que dos notas simultáneas se
    // conservan las dos. Cada entrada trae su id, de modo que nunca se toman
    // por duplicadas.
    await this.documento(seccion, slug).set(
      {
        bitacora: FieldValue.arrayUnion(nuevaEntrada(entrada)),
        actualizado: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  }

  async borrarNota(seccion: Seccion, slug: string, id: string): Promise<void> {
    const referencia = this.documento(seccion, slug);
    // Quitar una entrada sí obliga a leer y reescribir (hay que localizarla por
    // id), así que va en transacción para no pisar una nota añadida entretanto.
    await this.db.runTransaction(async (transaccion) => {
      const doc = await transaccion.get(referencia);
      if (!doc.exists) return;
      const actual = Array.isArray(doc.data()?.["bitacora"])
        ? (doc.data()!["bitacora"] as EntradaBitacora[])
        : [];
      transaccion.set(
        referencia,
        {
          bitacora: actual.filter((entrada) => entrada.id !== id),
          actualizado: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    });
  }
}
