import type { Seccion } from "@/lib/secciones";
import type { Publicacion } from "../tipos";
import { propuestaImplementacion } from "./propuesta-implementacion";
import { reporteAvance } from "./reporte-avance";
import { toolConciliador } from "./tool-conciliador";

/** Registro de publicaciones. Añadir aquí cada archivo nuevo. */
const PUBLICACIONES: Publicacion[] = [
  propuestaImplementacion,
  reporteAvance,
  toolConciliador,
];

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

/** Para `generateStaticParams` y para comprobaciones de integridad. */
export function todasLasPublicaciones(): readonly Publicacion[] {
  return PUBLICACIONES;
}
