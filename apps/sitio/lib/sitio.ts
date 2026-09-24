/** Datos generales del sitio público. Un solo lugar para URL, correo y menú. */

export const SITIO_URL = (
  process.env.NEXT_PUBLIC_SITIO_URL ?? "https://qeb.mx"
).replace(/\/$/, "");

/**
 * Sólo se indexa en buscadores si se pide explícitamente. Mientras el sitio se
 * revisa (tool.qeb.mx/sitio-qeb) queda fuera de Google; al publicarlo en qeb.mx se
 * define NEXT_PUBLIC_INDEXAR=true.
 */
export const INDEXAR = process.env.NEXT_PUBLIC_INDEXAR === "true";

export const CORREO_CONTACTO = "contacto@qeb.mx";

export const DESCRIPCION =
  "QEB es la plataforma de gestión de publicidad exterior (OOH): inventario en vivo, propuestas, campañas, versionario y catorcenas en un solo sistema.";

export type EnlaceMenu = { href: string; texto: string; detalle?: string };

export const MENU: EnlaceMenu[] = [
  { href: "/plataforma", texto: "Plataforma" },
  {
    href: "/geo-behavior-indoor",
    texto: "Geo Behavior",
    detalle: "Afluencia y movilidad en espacios cerrados",
  },
  {
    href: "/wifi-inteligente",
    texto: "WiFi Inteligente",
    detalle: "Analítica y audiencias desde tu red WiFi",
  },
  { href: "/blog", texto: "Blog" },
  { href: "/nosotros", texto: "Nosotros" },
];
