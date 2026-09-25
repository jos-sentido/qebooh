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
  "QEB es la plataforma de gestión de negocio para publicidad exterior (OOH): un sistema que opera inventario, propuestas y campañas, y otro que convierte esa operación en inteligencia de negocio en tiempo real.";

export type EnlaceMenu = { href: string; texto: string; detalle?: string };

/** Entrada del menú: enlace directo o grupo desplegable. */
export type EntradaMenu =
  | ({ tipo: "enlace" } & EnlaceMenu)
  | { tipo: "grupo"; texto: string; base: string; enlaces: EnlaceMenu[] };

export const MENU: EntradaMenu[] = [
  {
    tipo: "grupo",
    texto: "Sistemas",
    base: "/sistemas",
    enlaces: [
      {
        href: "/sistemas",
        texto: "Visión general",
        detalle: "Gestión de negocio OOH: cómo se conectan",
      },
      {
        href: "/sistemas/operacion",
        texto: "QEB Operación",
        detalle: "Inventario, propuestas, campañas y catorcenas",
      },
      {
        href: "/sistemas/inteligencia",
        texto: "QEB Inteligencia",
        detalle: "Ventas, metas, embudo y ocupación en tiempo real",
      },
    ],
  },
  {
    tipo: "grupo",
    texto: "Audiencias",
    base: "/audiencias",
    enlaces: [
      {
        href: "/geo-behavior-indoor",
        texto: "Geo Behavior Indoor",
        detalle: "Afluencia y movilidad en espacios cerrados",
      },
      {
        href: "/wifi-inteligente",
        texto: "WiFi Inteligente",
        detalle: "Analítica y audiencias desde tu red WiFi",
      },
    ],
  },
  { tipo: "enlace", href: "/blog", texto: "Blog" },
  { tipo: "enlace", href: "/nosotros", texto: "Nosotros" },
];
