import type { Propuesta } from "../tipos";

/**
 * Propuesta de ejemplo. Sirve como plantilla: copiar este archivo, cambiar el
 * slug y el contenido, y registrarlo en `content/propuestas/index.ts`.
 */
export const ejemploCircuitoCdmx: Propuesta = {
  slug: "ejemplo-circuito-cdmx",
  cliente: "Cliente Ejemplo",
  titulo: "Circuito urbano CDMX",
  resumen:
    "Campaña de tres meses en corredores de alto flujo peatonal en CDMX, " +
    "con medición de alcance y refuerzo digital en los mismos polígonos.",
  fecha: "2026-09-01",
  estado: "borrador",
  periodo: "Marzo – Mayo 2026",
  contacto: {
    nombre: "QEB OOH",
    email: "hola@qebooh.com",
  },
  bloques: [
    {
      tipo: "texto",
      titulo: "El reto",
      cuerpo: [
        "Describe aquí, en las palabras del cliente, el problema que hay que " +
          "resolver. Cuanto más literal sea la formulación, más rápido se " +
          "reconocen en ella.",
        "Un segundo párrafo para acotar el alcance: qué entra en esta " +
          "propuesta y qué queda fuera.",
      ],
    },
    {
      tipo: "cifras",
      titulo: "El circuito en números",
      cifras: [
        {
          valor: "42",
          etiqueta: "Caras en circuito",
          nota: "Distribuidas en 6 corredores",
        },
        {
          valor: "1.2M",
          etiqueta: "Impactos semanales estimados",
          nota: "Base: aforo peatonal municipal 2025",
        },
        {
          valor: "12",
          etiqueta: "Semanas de exhibición",
        },
      ],
    },
    {
      tipo: "lista",
      titulo: "Cómo lo ejecutamos",
      intro:
        "Tres fases. Cada una cierra con un entregable que el cliente aprueba " +
        "antes de pasar a la siguiente.",
      items: [
        {
          titulo: "1. Selección de sitios",
          descripcion:
            "Cruzamos el perfil de audiencia con aforo y visibilidad real " +
            "de cada cara. Entregable: mapa del circuito con fotos de sitio.",
        },
        {
          titulo: "2. Producción e instalación",
          descripcion:
            "Adaptación de arte a cada formato, impresión e instalación. " +
            "Entregable: reporte fotográfico de montaje por cara.",
        },
        {
          titulo: "3. Medición",
          descripcion:
            "Reporte quincenal de alcance y frecuencia, más lectura del " +
            "refuerzo digital en los mismos polígonos.",
        },
      ],
    },
    {
      tipo: "inversion",
      titulo: "Inversión",
      conceptos: [
        {
          concepto: "Renta de espacios",
          detalle: "42 caras · 12 semanas",
          monto: "$000,000 MXN",
        },
        {
          concepto: "Producción e instalación",
          detalle: "Impresión, montaje y desmontaje",
          monto: "$000,000 MXN",
        },
        {
          concepto: "Refuerzo digital",
          detalle: "Geocercas sobre los polígonos del circuito",
          monto: "$000,000 MXN",
        },
      ],
      total: "$000,000 MXN",
      nota: "Precios antes de IVA. Vigencia de la cotización: 30 días naturales.",
    },
  ],
  cierre: {
    titulo: "Siguiente paso",
    texto:
      "Si el circuito y el periodo funcionan, apartamos los sitios y " +
      "arrancamos con la selección. Cualquier ajuste, lo vemos antes.",
    accion: {
      etiqueta: "Escribirnos",
      href: "mailto:hola@qebooh.com",
    },
  },
};
