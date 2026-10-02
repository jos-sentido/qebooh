import type { Entrada } from "./tipos";

/**
 * Keyword principal: "software para empresas de publicidad exterior".
 * Bajo volumen, alta intención de compra. Guía de evaluación neutral: no
 * se menciona ni se compara a competidores por nombre.
 */
export const entradaSoftware: Entrada = {
  slug: "software-para-empresas-de-publicidad-exterior-que-debe-tener",
  titulo: "Software para empresas de publicidad exterior: qué debe tener antes de elegirlo",
  fecha: "2026-09-30",
  resumen:
    "Una guía para evaluar software de gestión de publicidad exterior: inventario, periodos de venta, propuestas, campañas, reportes e integraciones, y las preguntas que conviene hacer antes de contratar.",
  imagen: "/blog/software.png",
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "La mayoría de las empresas de publicidad exterior en México empezó administrando su inventario en hojas de cálculo. Funciona mientras el negocio es chico. Cuando crecen las plazas, los asesores y los anunciantes, aparecen los mismos síntomas: espacios vendidos dos veces, propuestas que tardan días y cifras de venta que no cuadran entre áreas.",
    },
    {
      tipo: "parrafo",
      texto:
        "Un CRM genérico o un ERP no resuelve esos problemas porque no entiende cómo funciona el negocio OOH. Estas son las capacidades que conviene revisar antes de elegir un software.",
    },
    { tipo: "subtitulo", texto: "1. Inventario en vivo con identificador único por cara" },
    {
      tipo: "parrafo",
      texto:
        "Cada cara debe tener un código único, su plaza, ubicación, formato, dimensiones y sentido de circulación. La disponibilidad tiene que verse al momento y para todo el equipo. Si el inventario depende de que alguien actualice un archivo, el empalme es cuestión de tiempo.",
    },
    { tipo: "subtitulo", texto: "2. Que maneje distintos periodos de venta" },
    {
      tipo: "parrafo",
      texto:
        "Cada formato se comercializa de forma distinta: los espectaculares se venden por mes, los parabuses por catorcena y una pantalla digital puede venderse por día, por horario o por spot. Y cada empresa tiene sus propias reglas. Un software que obliga a un solo periodo fija genera descuadres en la disponibilidad, la ocupación y la facturación. Pregunta qué periodicidades maneja, si se pueden combinar en una misma propuesta y si se configuran según tu forma de vender.",
    },
    { tipo: "subtitulo", texto: "3. Detección de conflictos antes de vender" },
    {
      tipo: "parrafo",
      texto:
        "El sistema debe avisar cuando una cara ya está comprometida en otra propuesta o campaña para el mismo periodo, antes de que la propuesta llegue al anunciante. Detectar el empalme después de vender cuesta dinero y relación con el cliente.",
    },
    { tipo: "subtitulo", texto: "4. El flujo comercial completo: solicitud, propuesta y campaña" },
    {
      tipo: "parrafo",
      texto:
        "La venta OOH tiene tres etapas: la solicitud del anunciante, la propuesta con inventario y tarifas, y la campaña cerrada. El software debe registrar las tres y conectarlas, para que cada propuesta sepa de qué solicitud viene y cada campaña de qué propuesta, con todas sus versiones.",
    },
    { tipo: "subtitulo", texto: "5. Operación: artes, montaje y testigos" },
    {
      tipo: "parrafo",
      texto:
        "Vender es la mitad del trabajo. Revisa si el sistema controla qué arte va en cada cara, genera órdenes de montaje y guarda las evidencias de instalación para el anunciante. Si eso sigue en correos, el error en la calle sigue pasando.",
    },
    { tipo: "subtitulo", texto: "6. Reportes que separen venta de pipeline" },
    {
      tipo: "parrafo",
      texto:
        "Los reportes deben contar como venta sólo las campañas cerradas y mostrar el pipeline aparte. Pide ver venta contra presupuesto, ocupación por periodo, embudo de conversión y avance por asesor. Si para obtenerlos hay que exportar y armar un Excel, el problema sigue ahí.",
    },
    { tipo: "subtitulo", texto: "7. Integraciones con lo que ya usas" },
    {
      tipo: "parrafo",
      texto:
        "La campaña cerrada tiene que llegar a facturación sin recaptura. Pregunta qué integraciones vía API ofrece con ERP, facturación o sistemas de instalación, y cómo se define su alcance.",
    },
    { tipo: "subtitulo", texto: "8. Que se adapte a tu operación" },
    {
      tipo: "parrafo",
      texto:
        "Cada empresa OOH tiene su nomenclatura, sus catálogos y sus reglas comerciales. Un buen software tiene un núcleo sólido y se configura para cada cliente, en lugar de obligar al equipo a cambiar su forma de trabajar.",
    },
    { tipo: "subtitulo", texto: "Preguntas para hacer en la demo" },
    {
      tipo: "lista",
      items: [
        { texto: "¿Cómo migramos nuestro inventario actual y quién normaliza los códigos?" },
        { texto: "¿Qué pasa si dos asesores proponen la misma cara para el mismo periodo?" },
        { texto: "¿Puedo ver la ocupación por plaza y tipo de mueble sin exportar nada?" },
        { texto: "¿Cómo se manejan las pantallas digitales junto al inventario impreso?" },
        { texto: "¿Qué integraciones existen hoy y cuáles se desarrollan a la medida?" },
        { texto: "¿Quién da soporte: el equipo que construye el software o un intermediario?" },
      ],
    },
    { tipo: "subtitulo", texto: "Conclusión" },
    {
      tipo: "parrafo",
      texto:
        "El software adecuado no es el que tiene más funciones, sino el que entiende el negocio de la publicidad exterior en México: caras, plazas, formatos con distintos periodos de venta y un flujo comercial que deja rastro. QEB nació en esa operación: QEB Operación para el día a día y QEB Inteligencia para decidir con datos, configurados a la forma de trabajar de cada cliente.",
    },
  ],
};
