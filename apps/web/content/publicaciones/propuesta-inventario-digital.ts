import type { Publicacion } from "../tipos";

/**
 * Propuesta de inventario digital programático (slots y reels, desde la
 * reserva hasta el gestor de artes y los cierres) y activación formal de QEBI
 * con la renovación del contrato. Servida como documento HTML autocontenido.
 *
 * El contenido y los simuladores son los de la propuesta original de Jos; sólo
 * se adaptó la identidad visual al sistema de qeb.mx (tipografías y logo
 * embebidos, mismos tokens que el reporte de tiempos de operación). No hace
 * llamadas de red.
 *
 * Lleva montos (inversión del desarrollo e incremento de la iguala): el enlace
 * es abierto, así que sólo se comparte con el cliente.
 */
export const propuestaInventarioDigital: Publicacion = {
  slug: "inventario-digital",
  seccion: "propuestas",
  titulo: "Inventario digital programático y QEBI",
  resumen:
    "Gestión de pantallas digitales por slot y por reel, de la reserva en " +
    "propuestas a la campaña, los artes y los cierres, y activación formal " +
    "de QEBI con la renovación del contrato.",
  cliente: "IMU",
  fecha: "2026-11-27",
  periodo: "Noviembre 2026",
  estado: "enviada",
  etiquetas: ["inventario digital", "programático", "QEBI"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "documento",
    archivo: "propuesta-inventario-digital.html",
  },
};
