import type { Propuesta } from "../tipos";
import { ejemploCircuitoCdmx } from "./ejemplo-circuito-cdmx";

/** Registro de propuestas. Añadir aquí cada archivo nuevo. */
const PROPUESTAS: Propuesta[] = [ejemploCircuitoCdmx];

/** Ordenadas de más reciente a más antigua. */
export function listarPropuestas(): Propuesta[] {
  return [...PROPUESTAS].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function obtenerPropuesta(slug: string): Propuesta | undefined {
  return PROPUESTAS.find((propuesta) => propuesta.slug === slug);
}
