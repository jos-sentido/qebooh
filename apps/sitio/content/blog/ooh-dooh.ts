import type { Entrada } from "./tipos";

/**
 * Keyword principal: "qué es DOOH" / "OOH y DOOH". Es el término de la
 * categoría con más crecimiento en México (Google Trends, 2025-2026).
 * Dato de inversión: Statista vía Latinspots y Marketing4eCommerce MX.
 */
export const entradaOohDooh: Entrada = {
  slug: "ooh-y-dooh-en-mexico-que-son-y-como-operarlos",
  titulo: "OOH y DOOH en México: qué son y cómo operar inventario tradicional y digital en un solo sistema",
  fecha: "2026-10-02",
  resumen:
    "Qué es la publicidad OOH, qué es DOOH, en qué se diferencian y por qué una empresa de publicidad exterior que ya opera los dos formatos necesita llevarlos en un mismo inventario.",
  imagen: "/blog/ooh-dooh.png",
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "Cada vez más empresas de publicidad exterior en México suman pantallas digitales a su inventario de espectaculares, parabuses y muros. El problema es que muchas los siguen administrando por separado: el inventario tradicional en una hoja de cálculo y las pantallas en otra, con su propia lógica de horarios y tarifas. Antes de hablar de cómo resolverlo, vale la pena aclarar los términos.",
    },
    { tipo: "subtitulo", texto: "¿Qué es la publicidad OOH?" },
    {
      tipo: "parrafo",
      texto:
        "OOH viene de out of home: toda la publicidad que alcanza a las personas fuera de casa. En México incluye espectaculares, unipolares, muros, puentes peatonales, parabuses, mupis, boleros, columnas y la publicidad en transporte. Su fuerza es la presencia continua: un anuncio en una vialidad se ve todos los días, a todas horas, por todos los que pasan.",
    },
    {
      tipo: "parrafo",
      texto:
        "Para el operador, el inventario OOH tradicional tiene una lógica simple: cada cara se vende completa a un anunciante por un periodo, normalmente por catorcena. Una cara, un anunciante, un arte.",
    },
    { tipo: "subtitulo", texto: "¿Qué es DOOH?" },
    {
      tipo: "parrafo",
      texto:
        "DOOH es digital out of home: la publicidad exterior en pantallas digitales. Está en vialidades, centros comerciales, aeropuertos, transporte público y mobiliario urbano. A diferencia del formato impreso, una pantalla muestra varios anuncios en rotación, se puede programar por horario y el contenido se cambia sin instalar nada.",
    },
    {
      tipo: "parrafo",
      texto:
        "Es el segmento que más crece. Se proyecta que la inversión en publicidad exterior digital en México supere los 138 millones de dólares en 2025 y siga creciendo cerca de 9 % al año hacia 2030. En Google, las búsquedas de “DOOH” en México pasaron de ser esporádicas a aparecer casi todas las semanas desde 2025.",
    },
    { tipo: "subtitulo", texto: "OOH vs. DOOH: diferencias que importan al operar" },
    {
      tipo: "lista",
      items: [
        {
          titulo: "Unidad de venta",
          texto:
            "En OOH se vende la cara completa por catorcena. En DOOH se vende una fracción del tiempo de pantalla: un spot dentro de un loop, por horario o por número de impactos.",
        },
        {
          titulo: "Capacidad",
          texto:
            "Una cara tradicional está libre u ocupada. Una pantalla puede tener varios anunciantes a la vez, así que la disponibilidad se mide en espacios del loop, no en sí o no.",
        },
        {
          titulo: "Operación",
          texto:
            "OOH requiere impresión, instalación y evidencia fotográfica. DOOH requiere carga del archivo, programación y reporte de reproducciones.",
        },
        {
          titulo: "Tarifa",
          texto:
            "La tarifa OOH depende de la ubicación y el periodo. En DOOH también entran el horario, la duración del spot y la frecuencia de aparición.",
        },
      ],
    },
    { tipo: "subtitulo", texto: "El problema de operarlos por separado" },
    {
      tipo: "parrafo",
      texto:
        "Cuando el inventario digital vive aparte del tradicional, el equipo comercial no puede armar una propuesta mixta sin juntar a mano dos fuentes. Es difícil saber cuánto se vendió en total en una plaza, comparar la ocupación de un parabús contra la de una pantalla en la misma zona o detectar que un anunciante ya tiene presencia digital en esa ubicación.",
    },
    {
      tipo: "parrafo",
      texto:
        "Y el anunciante ya no piensa en formatos separados: pide una campaña en Guadalajara con presencia en vialidad y en pantallas. Si la propuesta tarda días en armarse porque los datos están repartidos, la venta se enfría.",
    },
    { tipo: "subtitulo", texto: "Cómo llevar OOH y DOOH en un solo inventario" },
    {
      tipo: "lista",
      items: [
        {
          titulo: "Un mismo catálogo",
          texto:
            "Cada cara impresa y cada pantalla se registran con su código, plaza, ubicación y formato en un solo lugar. Lo que cambia es cómo se mide su disponibilidad.",
        },
        {
          titulo: "Disponibilidad por catorcena para ambos",
          texto:
            "Razonar todo en catorcenas permite comparar y combinar: una cara ocupada contra un loop con espacios libres, en el mismo calendario.",
        },
        {
          titulo: "Propuestas mixtas",
          texto:
            "El asesor arma una propuesta con espectaculares, mupis y pantallas desde el mismo inventario, con tarifas y vigencias de cada formato.",
        },
        {
          titulo: "Una sola cifra de venta",
          texto:
            "Las campañas cerradas de ambos formatos suman en el mismo reporte, para ver ventas, ocupación y clientes sin conciliar archivos.",
        },
      ],
    },
    { tipo: "subtitulo", texto: "Conclusión" },
    {
      tipo: "parrafo",
      texto:
        "OOH y DOOH no compiten: se complementan, y los anunciantes los compran juntos. La empresa de publicidad exterior que los opere desde un mismo sistema vende más rápido y entiende mejor su negocio. QEB Operación centraliza el inventario tradicional y digital, y QEB Inteligencia convierte esa operación en reportes de venta y ocupación en tiempo real.",
    },
  ],
};
