import type { Publicacion } from "../tipos";

/**
 * Segunda versión de la presentación comercial, con los ajustes de la reunión
 * con las aliadas del 20 de octubre de 2026. Vive en su propio slug para no
 * tocar la versión publicada (`presentacion-comercial`), que se conserva tal
 * cual mientras esta se revisa.
 *
 * Cambios frente a la primera: los dos sistemas antes de los módulos, una
 * lámina interactiva de "¿Qué estás buscando?" por área antes del precio,
 * licencias con precio base "desde", personalización en tres capas con un
 * plan de trabajo de hasta 90 días, comunicación interna entre las funciones y un cierre
 * hacia 2027.
 *
 * El comparativo contra la competencia es una lámina oculta: sólo aparece con
 * `?comparativo` en la URL (la liga de trabajo) o con la tecla C. La liga sin
 * parámetro es la que se entrega.
 *
 * Igual que la primera, es un HTML autocontenido —tipografías, logotipo y
 * scripts dentro— que funciona sin conexión, y sus pantallas de producto son
 * ilustraciones en código con datos de ejemplo.
 */
export const presentacionComercialV2: Publicacion = {
  slug: "presentacion-comercial-v2",
  seccion: "propuestas",
  titulo: "Presentación comercial QEB · versión 2",
  resumen:
    "La presentación comercial reordenada tras la reunión con las aliadas: " +
    "dolores de una semana cualquiera, los dos sistemas, el recorrido por " +
    "los módulos, la personalización en tres capas, un diagnóstico " +
    "interactivo por área y el precio base de las licencias.",
  fecha: "2026-10-27",
  estado: "vigente",
  etiquetas: ["comercial", "producto", "licencias"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "documento",
    archivo: "presentacion-comercial-v2.html",
  },
};
