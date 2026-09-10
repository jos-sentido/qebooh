import type { Publicacion } from "../tipos";

/**
 * Dashboard de Reportes de Ventas, servido como documento HTML autocontenido.
 *
 * Capa de cliente: Reportes de Ventas (BI, Variaciones e impacto, Embudo,
 * Objetivos) es un desarrollo hecho para IMU, no núcleo de producto. Nada de su
 * nomenclatura ni de sus reglas sube a `packages/*`.
 *
 * El dashboard trae sus datos dentro y se declara a sí mismo como prototipo con
 * datos demostrativos; no lee de la plataforma ni de ninguna API.
 */
export const reporteVentasPrototipo: Publicacion = {
  slug: "reportes-ventas-prototipo",
  seccion: "reportes",
  cliente: "IMU",
  titulo: "Reportes de Ventas — prototipo",
  resumen:
    "Embudo, BI, variaciones e impacto y objetivos sobre el flujo Solicitud → " +
    "Propuesta → Campaña. Prototipo con datos demostrativos.",
  fecha: "2026-09-10",
  estado: "vigente",
  etiquetas: ["prototipo", "bi", "embudo"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "documento",
    archivo: "reportes-ventas-prototipo.html",
  },
};
