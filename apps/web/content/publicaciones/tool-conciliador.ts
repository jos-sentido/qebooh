import type { Publicacion } from "../tipos";

/**
 * Herramienta de ejemplo, publicada como enlace.
 *
 * Es el patrón para lo que vive fuera de esta app: otra app del monorepo, un
 * dashboard autocontenido, una hoja. El slug de tool.qeb.mx queda como la URL
 * estable que se comparte; si el destino cambia, se cambia aquí y el enlace
 * repartido sigue funcionando.
 *
 * Una herramienta que se construya dentro de esta misma app no necesita este
 * tipo: se declara con `tipo: "bloques"` o se le añade un tipo de contenido
 * nuevo en `content/tipos.ts`.
 */
export const toolConciliador: Publicacion = {
  slug: "ejemplo-conciliador",
  seccion: "tool",
  titulo: "Conciliador de inventario",
  resumen:
    "Cruza un archivo externo contra el inventario por Código Único y reporta " +
    "los que no empatan. Normaliza antes de comparar.",
  fecha: "2026-09-01",
  estado: "vigente",
  etiquetas: ["interna", "plantilla"],
  contenido: {
    tipo: "enlace",
    // Sustituir por el destino real. Mientras apunte aquí, el slug redirige a
    // la documentación del monorepo en vez de a una herramienta.
    href: "https://github.com/jos-sentido/qebooh",
  },
};
