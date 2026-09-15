import type { Seccion } from "@/lib/secciones";
import type { Publicacion } from "../tipos";
import { reporteVentasPrototipo } from "./reporte-ventas-prototipo";

/**
 * Registro de publicaciones. Añadir aquí cada archivo nuevo.
 *
 * `doc` está reservado como primer segmento dentro de una sección (sirve los
 * documentos HTML), así que ninguna publicación puede usarlo de slug.
 *
 * Sólo se registra lo que debe estar en circulación. Hoy el único cliente es
 * IMU. Los archivos `propuesta-implementacion.ts`, `reporte-avance.ts` y
 * `tool-conciliador.ts` siguen en esta carpeta como plantillas de cada tipo de
 * publicación (propuesta, reporte y herramienta enlazada): se copian, se les
 * cambia slug y contenido, y se registran aquí. No se importan a propósito,
 * para no publicarlas.
 */
const PUBLICACIONES: Publicacion[] = [reporteVentasPrototipo];

/** Todas las de una sección, de más reciente a más antigua. */
export function listarPublicaciones(seccion: Seccion): Publicacion[] {
  return PUBLICACIONES.filter(
    (publicacion) => publicacion.seccion === seccion,
  ).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function obtenerPublicacion(
  seccion: Seccion,
  slug: string,
): Publicacion | undefined {
  return PUBLICACIONES.find(
    (publicacion) =>
      publicacion.seccion === seccion && publicacion.slug === slug,
  );
}

/** Para comprobaciones de integridad sobre el registro completo. */
export function todasLasPublicaciones(): readonly Publicacion[] {
  return PUBLICACIONES;
}
