import type { Publicacion } from "../tipos";

/**
 * Propuesta de colaboración comercial, servida como documento HTML
 * autocontenido (presentación de 10 láminas con calculadora de comisiones).
 *
 * No es un entregable de cliente: es una propuesta para reclutar a un equipo de
 * ventas externo que lleve QEB a nuevas empresas de OOH. La reunión es con el
 * equipo que representa Lorena. Por eso no lleva `cliente` —el único cliente es
 * IMU y no conviene mezclar un prospecto en ese filtro—; se identifica por el
 * slug, el resumen y las etiquetas.
 *
 * El deck trae todo dentro (estilos, script de navegación y calculadora,
 * imágenes en base64); no hace ninguna llamada de red.
 */
export const colaboracionComercialLorena: Publicacion = {
  slug: "colaboracion-comercial-lorena",
  seccion: "propuestas",
  titulo: "Propuesta de colaboración comercial",
  resumen:
    "Presentación para el equipo comercial de Lorena: esquema de comisiones " +
    "(el primer cierre paga doble), exclusividad por cliente sin límite de " +
    "territorio y una opción alterna de fee único por la estrategia y el " +
    "contenido comercial.",
  fecha: "2026-09-15",
  estado: "enviada",
  etiquetas: ["reclutamiento", "comercial", "comisiones"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "documento",
    archivo: "colaboracion-comercial-lorena.html",
  },
};
