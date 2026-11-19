import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { appAdmin, firebaseConfigurado } from "./almacen/firestore";

/**
 * Prospectos que el equipo registra desde una presentación comercial.
 *
 * La presentación es una sola y se usa con muchos prospectos; lo que cambia es
 * este registro, que se llena en la junta desde la lámina de licencias. Por
 * eso vive aquí y no en el documento: el HTML no guarda nada, sólo llama a la
 * API de su sección con la sesión del índice.
 *
 * Los campos siguen los de `apps/crm` (empresa, contacto, cargo, correo,
 * teléfono, notas) para poder pasar estos registros a su pipeline cuando el CRM
 * esté publicado. Firestore: `prospectos_propuestas/{id}`.
 */

export const FORMATOS = [
  "Espectacular",
  "Valla",
  "Parabús",
  "Kiosko",
  "Muro",
  "Puente",
  "Mupi",
  "Pantalla digital",
  "Indoor",
  "Transporte",
] as const;

export const LICENCIAS = ["Por definir", "Starter", "Professional", "Premium"] as const;

export type Diagnostico = {
  /** % de afinidad que dio el precalificador. */
  afinidad: number;
  nivel: string;
  areas: string[];
  /** Índices de los dolores marcados, para volver a pintarlos al cargarlo. */
  marcados: number[];
  /** Texto de esos dolores, para leerlo sin la presentación. */
  dolores: string[];
};

export type Prospecto = {
  id: string;
  empresa: string;
  contacto: string;
  cargo: string;
  correo: string;
  telefono: string;
  plazas: string;
  /** Caras aproximadas. Texto libre: en la junta se dice "unas 800". */
  inventario: string;
  formatos: string[];
  otrosFormatos: string;
  usuarios: string;
  licencia: string;
  asesor: string;
  notas: string;
  diagnostico: Diagnostico | null;
  /** Slug de la presentación desde la que se registró. */
  presentacion: string;
  creado: string;
  actualizado: string;
};

type Entrada = Omit<Prospecto, "id" | "creado" | "actualizado">;

const COLECCION = "prospectos_propuestas";

const texto = (v: unknown, max = 400): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/**
 * Normaliza lo que llega del navegador. Todo campo es opcional salvo la
 * empresa; lo desconocido se descarta en vez de guardarse tal cual.
 */
export function limpiar(datos: unknown): Entrada | null {
  if (!datos || typeof datos !== "object") return null;
  const d = datos as Record<string, unknown>;
  const empresa = texto(d["empresa"], 160);
  if (!empresa) return null;

  const formatos = Array.isArray(d["formatos"])
    ? d["formatos"].filter((f): f is string => (FORMATOS as readonly string[]).includes(String(f)))
    : [];
  const licencia = (LICENCIAS as readonly string[]).includes(String(d["licencia"]))
    ? String(d["licencia"])
    : "Por definir";

  let diagnostico: Diagnostico | null = null;
  const g = d["diagnostico"];
  if (g && typeof g === "object") {
    const x = g as Record<string, unknown>;
    const lista = (v: unknown) =>
      Array.isArray(v) ? v.map((s) => texto(s, 200)).filter(Boolean).slice(0, 30) : [];
    diagnostico = {
      afinidad: Math.max(0, Math.min(100, Math.round(Number(x["afinidad"]) || 0))),
      nivel: texto(x["nivel"], 60),
      areas: lista(x["areas"]),
      marcados: Array.isArray(x["marcados"])
        ? x["marcados"].map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n < 100).slice(0, 30)
        : [],
      dolores: lista(x["dolores"]),
    };
  }

  return {
    empresa,
    contacto: texto(d["contacto"], 120),
    cargo: texto(d["cargo"], 120),
    correo: texto(d["correo"], 160),
    telefono: texto(d["telefono"], 40),
    plazas: texto(d["plazas"], 240),
    inventario: texto(d["inventario"], 40),
    formatos: [...new Set(formatos)],
    otrosFormatos: texto(d["otrosFormatos"], 160),
    usuarios: texto(d["usuarios"], 40),
    licencia,
    asesor: texto(d["asesor"], 120),
    notas: texto(d["notas"], 4000),
    diagnostico,
    presentacion: texto(d["presentacion"], 120),
  };
}

interface Registro {
  listar(): Promise<Prospecto[]>;
  guardar(id: string | null, entrada: Entrada): Promise<Prospecto>;
}

/** Sólo para `pnpm dev` sin credenciales: se pierde al reiniciar. */
class RegistroMemoria implements Registro {
  private datos = new Map<string, Prospecto>();

  async listar() {
    return [...this.datos.values()].sort((a, b) => b.actualizado.localeCompare(a.actualizado));
  }

  async guardar(id: string | null, entrada: Entrada) {
    const ahora = new Date().toISOString();
    const previo = id ? this.datos.get(id) : undefined;
    const p: Prospecto = {
      ...entrada,
      id: previo?.id ?? crypto.randomUUID(),
      creado: previo?.creado ?? ahora,
      actualizado: ahora,
    };
    this.datos.set(p.id, p);
    return p;
  }
}

class RegistroFirestore implements Registro {
  private col = getFirestore(appAdmin()).collection(COLECCION);

  async listar() {
    const snap = await this.col.orderBy("actualizado", "desc").limit(500).get();
    return snap.docs.map((doc) => {
      // `marca` es el sello del servidor; no viaja al navegador.
      const datos = doc.data();
      delete datos["marca"];
      return { ...(datos as Omit<Prospecto, "id">), id: doc.id };
    });
  }

  async guardar(id: string | null, entrada: Entrada) {
    const ahora = new Date().toISOString();
    const ref = id ? this.col.doc(id) : this.col.doc();
    // Si el id no existe (lo borraron, o es de otra base) se crea de nuevo en
    // vez de fallar: lo que se llenó en la junta no se pierde.
    const previo = await ref.get();
    const creado = previo.exists ? String(previo.data()?.["creado"] ?? ahora) : ahora;
    await ref.set({ ...entrada, creado, actualizado: ahora, marca: FieldValue.serverTimestamp() });
    return { ...entrada, id: ref.id, creado, actualizado: ahora };
  }
}

const global = globalThis as typeof globalThis & { __qebProspectos?: Registro };

export function prospectos(): Registro {
  if (!global.__qebProspectos) {
    global.__qebProspectos = firebaseConfigurado() ? new RegistroFirestore() : new RegistroMemoria();
  }
  return global.__qebProspectos;
}

/** CSV para abrir en Excel: BOM UTF-8 y punto y coma, que es lo que espera Excel en es-MX. */
export function aCsv(lista: Prospecto[]): string {
  const columnas: [string, (p: Prospecto) => string][] = [
    ["Empresa", (p) => p.empresa],
    ["Contacto", (p) => p.contacto],
    ["Cargo", (p) => p.cargo],
    ["Correo", (p) => p.correo],
    ["Teléfono", (p) => p.telefono],
    ["Plazas", (p) => p.plazas],
    ["Inventario (caras)", (p) => p.inventario],
    ["Formatos", (p) => [...p.formatos, p.otrosFormatos].filter(Boolean).join(", ")],
    ["Usuarios", (p) => p.usuarios],
    ["Licencia de interés", (p) => p.licencia],
    ["Afinidad", (p) => (p.diagnostico ? `${p.diagnostico.afinidad}%` : "")],
    ["Áreas", (p) => p.diagnostico?.areas.join(", ") ?? ""],
    ["Dolores marcados", (p) => p.diagnostico?.dolores.join(" | ") ?? ""],
    ["Asesor", (p) => p.asesor],
    ["Notas", (p) => p.notas],
    ["Presentación", (p) => p.presentacion],
    ["Registrado", (p) => p.creado.slice(0, 10)],
    ["Actualizado", (p) => p.actualizado.slice(0, 10)],
  ];
  const celda = (v: string) => `"${v.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  const filas = [
    columnas.map(([t]) => celda(t)).join(";"),
    ...lista.map((p) => columnas.map(([, f]) => celda(f(p))).join(";")),
  ];
  return "﻿" + filas.join("\r\n");
}
