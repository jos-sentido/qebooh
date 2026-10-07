import type { Entrada } from "./tipos";

/**
 * Keyword principal: "ocupación de publicidad exterior" / "cómo medir la
 * ocupación". Enfoque exclusivo en ocupación del inventario para el
 * operador y su planificación estratégica. No se habla de métricas de
 * audiencia (OTS, alcance, frecuencia, CPM): QEB no las mide.
 */
export const entradaMedicion: Entrada = {
  slug: "como-medir-la-ocupacion-del-inventario-de-publicidad-exterior",
  titulo: "Cómo medir la ocupación del inventario de publicidad exterior y usarla para planear",
  fecha: "2026-10-01",
  resumen:
    "La ocupación es la métrica que dice cómo va el negocio de una empresa de publicidad exterior. Cómo calcularla según el periodo en que se vende cada formato, cómo leerla por plaza, zona y tipo de mueble, y cómo usarla para decidir precios, paquetes e inventario.",
  imagen: "/blog/medicion.png",
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "En una empresa de publicidad exterior, el inventario es el negocio. Cada cara que pasa un periodo sin venderse es ingreso que no regresa. Aun así, muchas operaciones saben cuánto vendieron, pero no qué tan lleno estuvo su inventario, dónde se queda vacío ni por qué.",
    },
    {
      tipo: "parrafo",
      texto:
        "La ocupación responde esas preguntas. Es la métrica central para el operador y la base de cualquier planificación estratégica: precios, paquetes, expansión y metas comerciales.",
    },
    { tipo: "subtitulo", texto: "Qué es la ocupación y cómo se calcula" },
    {
      tipo: "parrafo",
      texto:
        "La ocupación es la proporción del inventario vendido sobre el inventario disponible en un periodo. Se mide en la misma unidad en que se vende cada formato: los espectaculares suelen venderse por mes, los parabuses por catorcena y el inventario digital por día, horario o spot. Una operación con varios formatos necesita medir cada uno en su propio periodo.",
    },
    {
      tipo: "parrafo",
      texto:
        "Por ejemplo, si una plaza tiene 100 espectaculares y el periodo de análisis es de 6 meses, hay 600 meses-cara disponibles; si se vendieron 420, la ocupación es de 70 %. Con 200 parabuses en 12 catorcenas hay 2,400 catorcenas-cara disponibles, y la cuenta es la misma. Medir todo en una sola unidad que no corresponde a como se vende cada formato produce cifras que no cuadran con la facturación.",
    },
    { tipo: "subtitulo", texto: "Qué contar como ocupado" },
    {
      tipo: "lista",
      items: [
        {
          titulo: "Vendido",
          texto:
            "Sólo las campañas cerradas. Una cara en propuesta todavía no es venta y no debe sumar a la ocupación.",
        },
        {
          titulo: "Reservado",
          texto:
            "Caras apartadas para una propuesta en negociación. Conviene verlas aparte: muestran la ocupación que viene, no la que ya es.",
        },
        {
          titulo: "Bloqueado",
          texto:
            "Caras fuera de venta por mantenimiento, permisos o acuerdos. Se descuentan del inventario disponible para no castigar la cifra.",
        },
      ],
    },
    { tipo: "subtitulo", texto: "Cómo leer la ocupación para encontrar oportunidades" },
    {
      tipo: "parrafo",
      texto:
        "Una cifra global de ocupación dice poco. El valor está en desglosarla:",
    },
    {
      tipo: "lista",
      items: [
        {
          titulo: "Por plaza",
          texto:
            "Muestra qué ciudades sostienen el negocio y cuáles tienen inventario de sobra.",
        },
        {
          titulo: "Por zona o ubicación",
          texto:
            "Dentro de una misma plaza, hay avenidas que se venden solas y otras que casi nunca. Ahí está el dinero que se queda en la mesa.",
        },
        {
          titulo: "Por tipo de mueble",
          texto:
            "Espectaculares, parabuses, mupis, puentes y pantallas no se venden igual. Saber qué formato se llena y cuál no orienta inversión y tarifas.",
        },
        {
          titulo: "Por cara y por periodo",
          texto:
            "Un mapa de inventario contra periodos deja ver huecos concretos: qué caras están libres y cuándo, para ofrecerlas antes de que se pierdan.",
        },
        {
          titulo: "Contra el año anterior",
          texto:
            "Comparar el mismo periodo del año pasado separa la temporada de un problema real de venta.",
        },
      ],
    },
    { tipo: "subtitulo", texto: "Ingreso por ocupación y asignación promedio" },
    {
      tipo: "parrafo",
      texto:
        "Dos métricas complementan a la ocupación. El ingreso por ocupación dice cuánto generó el inventario vendido en el periodo. La asignación promedio dice cuántos periodos se vende en promedio cada cara. Juntas distinguen una zona llena a buen precio de una zona llena porque se vendió barato.",
    },
    { tipo: "subtitulo", texto: "Cómo usar la ocupación en la planificación estratégica" },
    {
      tipo: "lista",
      items: [
        {
          titulo: "Precios",
          texto:
            "Una zona con ocupación alta sostenida admite ajustar tarifa. Una zona con ocupación baja pide revisar precio o la forma de venderla.",
        },
        {
          titulo: "Paquetes",
          texto:
            "Combinar caras de alta demanda con caras subutilizadas en una misma propuesta mueve el inventario que se queda vacío.",
        },
        {
          titulo: "Metas comerciales",
          texto:
            "La ocupación de cada plaza ayuda a fijar metas realistas por asesor y por periodo, y a saber dónde enfocar al equipo.",
        },
        {
          titulo: "Inversión en inventario",
          texto:
            "Antes de abrir nuevas ubicaciones o retirar las que no rinden, la ocupación histórica por zona y formato da el argumento.",
        },
      ],
    },
    { tipo: "subtitulo", texto: "Medir la ocupación sin armar reportes a mano" },
    {
      tipo: "parrafo",
      texto:
        "Calcular la ocupación a mano exige juntar el inventario, las campañas cerradas y los bloqueos de varios archivos, y cuando el reporte está listo ya cambió. La ocupación es útil cuando se ve al momento: si cada campaña cerrada y cada bloqueo se registran en el mismo sistema, la cifra se actualiza sola.",
    },
    { tipo: "subtitulo", texto: "Conclusión" },
    {
      tipo: "parrafo",
      texto:
        "La ocupación medida en el periodo de venta de cada formato es la forma más clara de saber qué tan bien rinde el inventario y de decidir con datos qué vender, a qué precio y dónde crecer. QEB Inteligencia la calcula en tiempo real a partir de lo que el equipo ya registra en QEB Operación: ocupación global, por plaza, zona, tipo de mueble y cara, junto con el ingreso que genera.",
    },
  ],
};
