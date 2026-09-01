import type { Publicacion } from "../tipos";

/**
 * Reporte de ejemplo. Plantilla para lo que se publica en reportes.qeb.mx:
 * avances, entregables y cortes que se comparten con el cliente.
 *
 * Las cifras van con `nota` a propósito. Un reporte sin metodología a la vista
 * es el origen de la discusión de "estas dos pantallas no cuadran": si cada
 * cifra dice de dónde sale, la conversación empieza en el dato y no en la
 * sospecha.
 */
export const reporteAvance: Publicacion = {
  slug: "ejemplo-avance-trimestral",
  seccion: "reportes",
  cliente: "Cliente Ejemplo",
  titulo: "Avance trimestral",
  resumen:
    "Corte del trimestre: qué se entregó, qué quedó abierto y qué decisiones " +
    "hacen falta para el siguiente.",
  fecha: "2026-09-01",
  estado: "vigente",
  periodo: "Q3 2026",
  etiquetas: ["avance", "plantilla"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "bloques",
    bloques: [
      {
        tipo: "texto",
        titulo: "Resumen del periodo",
        cuerpo: [
          "Dos o tres párrafos con lo que pasó en el trimestre. Primero lo que " +
            "se entregó, después lo que quedó abierto y por qué.",
          "Si algo se retrasó por una causa que no está confirmada, se dice que " +
            "se desconoce. Nunca se infiere una causa raíz en un texto que va " +
            "al cliente.",
        ],
      },
      {
        tipo: "cifras",
        titulo: "El trimestre en números",
        cifras: [
          {
            valor: "00",
            etiqueta: "Entregables cerrados",
            nota: "Validados en pruebas antes del release",
          },
          {
            valor: "00",
            etiqueta: "Incidencias resueltas",
          },
          {
            valor: "00%",
            etiqueta: "Avance sobre el plan",
            nota: "Sobre el alcance acordado al inicio del trimestre",
          },
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué sigue",
        intro: "Lo que entra al siguiente periodo, en orden de prioridad.",
        items: [
          {
            titulo: "1. Pendiente principal",
            descripcion:
              "Qué es, qué lo destraba y de quién depende. Si la dependencia " +
              "es del cliente, decirlo con la secuencia de fechas, sin " +
              "señalamientos.",
          },
          {
            titulo: "2. Segundo pendiente",
            descripcion: "Mismo formato: alcance, dependencia y fecha objetivo.",
          },
          {
            titulo: "3. Tercero",
            descripcion: "Mismo formato.",
          },
        ],
      },
    ],
    cierre: {
      titulo: "Siguiente paso",
      texto:
        "Comparto lo acordado para su respectivo seguimiento. Quedo atento a " +
        "sus comentarios para lograr avanzar con el siguiente corte.",
      accion: {
        etiqueta: "Escribirnos",
        href: "mailto:jos@sentido.mx",
      },
    },
  },
};
