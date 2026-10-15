import type { Publicacion } from "../tipos";

/**
 * La presentación comercial de QEB: el documento con el que el equipo de
 * ventas lleva la plataforma a empresas de OOH.
 *
 * No es una propuesta a un cliente concreto, sino el material de venta que se
 * reutiliza con cada prospecto; por eso va sin `cliente` y en estado
 * `vigente` —se mantiene al día— en vez de `enviada`.
 *
 * Documento HTML autocontenido de 16 láminas: trae dentro las tipografías en
 * base64 (RF Dewi Extended, Barlow, IBM Plex Mono), el logotipo, el script de
 * navegación y las animaciones. No hace ninguna llamada de red.
 *
 * Las pantallas de producto son ilustraciones en código con datos de ejemplo
 * —códigos `Parabus042A`, campañas y clientes inventados—, nunca capturas de
 * la plataforma: la lleva un equipo externo a otras empresas del ramo.
 */
export const presentacionComercial: Publicacion = {
  slug: "presentacion-comercial",
  seccion: "propuestas",
  titulo: "Presentación comercial QEB",
  resumen:
    "Las 16 láminas con las que se presenta QEB a una empresa de OOH: los " +
    "dolores de una semana cualquiera, los dos sistemas y cómo se conectan, " +
    "el recorrido por los módulos, el comparativo contra la competencia y " +
    "los niveles de licencia.",
  fecha: "2026-10-15",
  estado: "vigente",
  etiquetas: ["comercial", "producto", "licencias"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "documento",
    archivo: "presentacion-comercial.html",
  },
};
