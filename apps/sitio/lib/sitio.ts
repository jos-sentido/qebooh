/** Datos generales del sitio público. Un solo lugar para URL, correo y menú. */

/**
 * URL canónica del sitio. Fija en código: el sitio vive en www.qeb.mx (qeb.mx
 * redirige ahí desde Vercel).
 */
export const SITIO_URL = "https://www.qeb.mx";

/**
 * Sólo el despliegue de producción de Vercel se indexa en buscadores. Las
 * vistas previas y el desarrollo local quedan con noindex.
 */
export const INDEXAR = process.env.VERCEL_ENV === "production";

export const CORREO_CONTACTO = "contacto@qeb.mx";

/**
 * Agenda de demos (LeadConnector). Todos los botones "Agendar demo" apuntan
 * aquí y abren en pestaña nueva.
 */
export const AGENDA_URL =
  "https://api.leadconnectorhq.com/widget/booking/M51HmuoRAOqKXXHogsBR";

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
        detalle: "Inventario, propuestas, campañas y periodos de venta",
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
    texto: "Smart Spaces",
    base: "/smart-spaces",
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
