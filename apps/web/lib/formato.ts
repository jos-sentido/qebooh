const FORMATO_FECHA = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
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

export const ETIQUETA_ESTADO = {
  borrador: "Borrador",
  enviada: "Enviada",
  aprobada: "Aprobada",
} as const;
