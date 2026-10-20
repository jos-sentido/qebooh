import type { Publicacion } from "../tipos";

/**
 * Reporte de tiempos de operación (autorizaciones de Dirección, ciclo de la
 * propuesta y atención de circuitos por Tráfico), servido como documento HTML
 * autocontenido.
 *
 * El contenido y los datos son los del reporte original; sólo se adaptó la
 * identidad visual al sistema de qeb.mx (tipografías embebidas, logo en
 * base64). La única llamada de red es Chart.js desde cdnjs.
 */
export const reporteMetricasIndicadores2026: Publicacion = {
  slug: "reporte-metricas-indicadores-2026",
  seccion: "propuestas",
  titulo: "Tiempos de Operación QEB",
  resumen:
    "Dónde se va el tiempo en la operación: autorizaciones de Dirección, " +
    "ciclo de la propuesta hasta pasar a venta y atención de circuitos por " +
    "Tráfico (Jul–Sep 2026).",
  cliente: "IMU",
  fecha: "2026-10-20",
  periodo: "Julio – Septiembre 2026",
  estado: "enviada",
  etiquetas: ["métricas", "indicadores", "operación"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "documento",
    archivo: "reporte-metricas-indicadores-2026.html",
  },
};
