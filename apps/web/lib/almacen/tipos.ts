import type { Seccion } from "../secciones";

export type EntradaBitacora = {
  id: string;
  /** ISO con hora: la bitácora es una secuencia temporal, no una fecha suelta. */
  fecha: string;
  autor: string;
  texto: string;
};

/**
 * Estado administrable de una publicación.
 *
 * El contenido vive en el repo (versionado, con su historial); esto es la capa
 * mutable que se maneja desde el índice. Por eso `eliminada` es un borrado
 * suave: oculta la publicación y hace que su slug devuelva 404, pero el archivo
 * sigue en git. Borrar de verdad sería perder trazabilidad, y la trazabilidad
 * del desarrollo es justo lo que respalda el producto.
 */
export type EstadoPublicacion = {
  archivada: boolean;
  eliminada: boolean;
  bitacora: EntradaBitacora[];
};

export const ESTADO_INICIAL: EstadoPublicacion = {
  archivada: false,
  eliminada: false,
  bitacora: [],
};

export interface Almacen {
  /** Nombre del adaptador, para poder decir en la UI dónde se está guardando. */
  readonly nombre: string;
  /** Estado de todas las publicaciones de una sección, indexado por slug. */
  leerSeccion(seccion: Seccion): Promise<Map<string, EstadoPublicacion>>;
  leer(seccion: Seccion, slug: string): Promise<EstadoPublicacion>;
  fijarArchivada(seccion: Seccion, slug: string, valor: boolean): Promise<void>;
  fijarEliminada(seccion: Seccion, slug: string, valor: boolean): Promise<void>;
  anotar(
    seccion: Seccion,
    slug: string,
    entrada: Omit<EntradaBitacora, "id" | "fecha">,
  ): Promise<void>;
  borrarNota(seccion: Seccion, slug: string, id: string): Promise<void>;
}

export function nuevaEntrada(
  entrada: Omit<EntradaBitacora, "id" | "fecha">,
): EntradaBitacora {
  return {
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
    autor: entrada.autor,
    texto: entrada.texto,
  };
}
