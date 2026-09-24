import type { Publicacion } from "../tipos";

/**
 * Sitio público nuevo de qeb.mx, en revisión.
 *
 * Vive en `apps/sitio` y se despliega como proyecto de Vercel propio
 * (`qeb-sitio`). Mientras se hace el desarrollo inicial, este slug es la URL
 * que se comparte para revisarlo. Cuando el sitio se publique en qeb.mx, se
 * retira esta publicación desde el índice.
 */
export const toolSitioQeb: Publicacion = {
  slug: "sitio-qeb",
  seccion: "tool",
  titulo: "Sitio qeb.mx (en revisión)",
  resumen:
    "Nueva versión del sitio público: plataforma, Geo Behavior Indoor, WiFi " +
    "Inteligente, blog y formulario de demo. No indexado.",
  fecha: "2026-09-24",
  estado: "vigente",
  etiquetas: ["interna", "sitio web"],
  contenido: {
    tipo: "enlace",
    href: "https://qeb-sitio.vercel.app",
  },
};
