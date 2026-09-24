/** "2024-03-25" → "25 de marzo de 2024". Se fija la zona para no correr un día. */
export function formatoFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
