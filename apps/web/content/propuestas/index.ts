import type { Propuesta } from "../tipos";
import { ejemploImplementacion } from "./ejemplo-implementacion";

/** Registro de propuestas. Añadir aquí cada archivo nuevo. */
const PROPUESTAS: Propuesta[] = [ejemploImplementacion];

/** Ordenadas de más reciente a más antigua. */
export function listarPropuestas(): Propuesta[] {
  return [...PROPUESTAS].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function obtenerPropuesta(slug: string): Propuesta | undefined {
  return PROPUESTAS.find((propuesta) => propuesta.slug === slug);
}
