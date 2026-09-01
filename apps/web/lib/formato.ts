import type { EstadoEditorial } from "@/content/tipos";

const FORMATO_FECHA = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const FORMATO_MOMENTO = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Mexico_City",
});

/**
 * Formatea una fecha ISO (YYYY-MM-DD) para mostrarla.
 *
 * Se fija a UTC a propósito: sin eso, "2026-03-01" se interpreta como
 * medianoche UTC y en México se mostraría como 28 de febrero.
 */
export function formatearFecha(iso: string): string {
  return FORMATO_FECHA.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Formatea una marca de tiempo completa (bitácora) en hora de México, que es
 * donde está el equipo que la lee.
 */
export function formatearMomento(iso: string): string {
  return FORMATO_MOMENTO.format(new Date(iso));
}

export const ETIQUETA_ESTADO: Record<EstadoEditorial, string> = {
  borrador: "Borrador",
  enviada: "Enviada",
  aprobada: "Aprobada",
  vigente: "Vigente",
  retirada: "Retirada",
};
