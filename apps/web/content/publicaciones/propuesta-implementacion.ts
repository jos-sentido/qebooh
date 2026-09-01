import type { Publicacion } from "../tipos";

/**
 * Propuesta de ejemplo: implementación de QEB para una empresa que comercializa
 * inventario OOH. Sirve como plantilla — copiar este archivo, cambiar el slug y
 * el contenido, y registrarlo en `content/publicaciones/index.ts`.
 *
 * Ojo con el encuadre: QEB vende la plataforma a quien opera el inventario. Una
 * propuesta de QEB habla de implementación, módulos e integración, no de un
 * plan de medios — eso es lo que el cliente vende a los suyos usando QEB.
 *
 * La nomenclatura usada aquí es la del núcleo de producto (Solicitud,
 * Propuesta, Campaña, catorcena, cara, plaza, Código Único). No usar términos
 * de la personalización de un cliente concreto en una plantilla general.
 */
export const propuestaImplementacion: Publicacion = {
  slug: "ejemplo-implementacion",
  seccion: "propuestas",
  cliente: "Cliente Ejemplo",
  titulo: "Implementación de QEB",
  resumen:
    "Puesta en marcha de QEB para centralizar el flujo comercial, la operación " +
    "de inventario y la reportería, hoy repartidos entre hojas de cálculo y " +
    "correo.",
  fecha: "2026-09-01",
  estado: "borrador",
  periodo: "Enero – Abril 2026",
  etiquetas: ["implementación", "plantilla"],
  contacto: {
    nombre: "Jos Alvarez",
    email: "jos@sentido.mx",
  },
  contenido: {
    tipo: "bloques",
    bloques: [
      {
        tipo: "texto",
        titulo: "El reto",
        cuerpo: [
          "Describe aquí, en las palabras del cliente, el problema que hay que " +
            "resolver. Cuanto más literal sea la formulación, más rápido se " +
            "reconocen en ella.",
          "Un segundo párrafo para acotar el alcance: qué entra en esta " +
            "propuesta y qué queda fuera. Conviene separar explícitamente lo " +
            "que es núcleo de producto de lo que se construye a medida, porque " +
            "cambia el costo y el tiempo de entrega.",
        ],
      },
      {
        tipo: "cifras",
        titulo: "Alcance de la implementación",
        cifras: [
          {
            valor: "0,000",
            etiqueta: "Caras en el inventario a migrar",
            nota: "Con Código Único normalizado por plaza y sentido",
          },
          {
            valor: "0",
            etiqueta: "Plazas cubiertas",
          },
          {
            valor: "00",
            etiqueta: "Catorcenas de histórico a cargar",
            nota: "La vigencia se razona en catorcenas, no en meses",
          },
        ],
      },
      {
        tipo: "lista",
        titulo: "Cómo lo ejecutamos",
        intro:
          "Tres fases. Cada una cierra con un entregable que el cliente valida " +
          "en pruebas.qeb.mx antes de que llegue a producción.",
        items: [
          {
            titulo: "1. Modelo de inventario",
            descripcion:
              "Carga y normalización del catálogo de caras por plaza, con " +
              "tarifas y vigencias en catorcenas. Entregable: inventario " +
              "cargado y conciliado contra la fuente del cliente.",
          },
          {
            titulo: "2. Flujo comercial",
            descripcion:
              "Solicitud → Propuesta → Campaña operando de punta a punta, con " +
              "reserva de inventario al cierre. Entregable: flujo completo " +
              "validado por el área comercial.",
          },
          {
            titulo: "3. Integración y reportería",
            descripcion:
              "Conexión vía API con el ERP del cliente y reportes de ventas y " +
              "ocupación. Entregable: conciliación cuadrada contra el sistema " +
              "del cliente.",
          },
        ],
      },
      {
        tipo: "inversion",
        titulo: "Inversión",
        conceptos: [
          {
            concepto: "Implementación",
            detalle: "Configuración, carga de inventario y puesta en marcha",
            monto: "$000,000 MXN",
          },
          {
            concepto: "Personalización",
            detalle:
              "Catálogos, nomenclatura propia y reglas de negocio del cliente",
            monto: "$000,000 MXN",
          },
          {
            concepto: "Integración con ERP",
            detalle: "API de reconciliación contra el sistema del cliente",
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
        "Si el alcance y el calendario funcionan, arrancamos con el modelo de " +
        "inventario y agendamos la primera validación en pruebas. Cualquier " +
        "ajuste, lo vemos antes.",
      accion: {
        etiqueta: "Escribirnos",
        href: "mailto:jos@sentido.mx",
      },
    },
  },
};
