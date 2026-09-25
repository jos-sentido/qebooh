/**
 * Los sistemas de QEB. Nombres, rutas y descripciones viven aquí para que un
 * cambio de nombre se propague a menú, páginas, pie y enlaces cruzados.
 *
 * QEB se presenta como gestión de negocio OOH: un sistema opera el día a día y
 * otro convierte esa operación, en tiempo real, en inteligencia de negocio y
 * planificación estratégica.
 */

export type SistemaId = "operacion" | "inteligencia";

export type Sistema = {
  id: SistemaId;
  nombre: string;
  /** Qué es, en tres o cuatro palabras. */
  categoria: string;
  href: string;
  /** Una frase: para qué sirve. */
  lema: string;
  capacidades: string[];
};

export const SISTEMAS: Record<SistemaId, Sistema> = {
  operacion: {
    id: "operacion",
    nombre: "QEB Operación",
    categoria: "Sistema operativo OOH",
    href: "/sistemas/operacion",
    lema: "Todo lo que pasa entre la solicitud del anunciante y la campaña en la calle, en un solo flujo.",
    capacidades: [
      "Inventario en vivo",
      "Solicitudes y propuestas",
      "Campañas y Versionario",
      "Catorcenas y facturación",
      "Montaje y testigos",
      "Integraciones vía API",
    ],
  },
  inteligencia: {
    id: "inteligencia",
    nombre: "QEB Inteligencia",
    categoria: "Inteligencia de negocio",
    href: "/sistemas/inteligencia",
    lema: "La operación convertida, en tiempo real, en decisiones: ventas, metas, embudo y ocupación.",
    capacidades: [
      "Ventas vs. presupuesto",
      "Embudo y ciclo de venta",
      "Variaciones e impacto",
      "Objetivos por asesor",
      "Ocupación estratégica",
      "Clientes y asesores",
    ],
  },
};

export const LISTA_SISTEMAS: Sistema[] = [SISTEMAS.operacion, SISTEMAS.inteligencia];

/**
 * Cómo se alimentan entre sí. Cada flujo dice qué sale de un sistema y en qué
 * se convierte en el otro. Sólo se describe lo que el sistema hace hoy.
 */
export const FLUJOS: { de: SistemaId; dato: string; resultado: string }[] = [
  {
    de: "operacion",
    dato: "Cada cambio de estatus: solicitud, propuesta, campaña",
    resultado: "Embudo de conversión y ciclo de venta, sin capturar nada",
  },
  {
    de: "operacion",
    dato: "Campañas cerradas",
    resultado: "Ventas reales contra presupuesto y contra el año anterior",
  },
  {
    de: "operacion",
    dato: "Ediciones de caras y tarifas en campañas vendidas",
    resultado: "Variaciones: cuánto subió o bajó la venta y por qué",
  },
  {
    de: "operacion",
    dato: "Ocupación del inventario por catorcena",
    resultado: "Mapa de ocupación por plaza, zona y tipo de mueble",
  },
  {
    de: "inteligencia",
    dato: "Objetivos repartidos por asesor y periodo",
    resultado: "Cada asesor ve su avance mientras vende",
  },
  {
    de: "inteligencia",
    dato: "Zonas y caras que se subutilizan",
    resultado: "Qué inventario empujar en las próximas propuestas",
  },
];

/** Soluciones de audiencia, complementarias a los sistemas. */
export const AUDIENCIAS = [
  {
    nombre: "Geo Behavior Indoor",
    href: "/geo-behavior-indoor",
    lema: "Afluencia, movilidad y tiempos de estancia en espacios cerrados.",
  },
  {
    nombre: "WiFi Inteligente",
    href: "/wifi-inteligente",
    lema: "Tu red WiFi como fuente de analítica y audiencias.",
  },
];
