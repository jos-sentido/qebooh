import type { Seccion } from "@/lib/secciones";

/**
 * Modelo de una publicación: una propuesta, un reporte o una herramienta.
 *
 * Una publicación es contenido, no código: se declara como objeto y la
 * plantilla de `[seccion]/[slug]` la renderiza. Añadir algo es añadir un
 * archivo en `content/publicaciones/` y registrarlo en el índice.
 *
 * Esto es la capa de personalización: cada archivo pertenece a un cliente o a
 * un encargo concreto. Nada de esto sube a `packages/*`.
 */

export type Cifra = {
  /** Ya formateada para mostrar, p. ej. "1.2M" o "38%". */
  valor: string;
  etiqueta: string;
  /** Metodología, periodo o fuente. Conviene ponerla: evita preguntas. */
  nota?: string;
};

export type Bloque =
  | {
      tipo: "texto";
      titulo: string;
      /** Un elemento por párrafo. */
      cuerpo: string[];
    }
  | {
      tipo: "lista";
      titulo: string;
      intro?: string;
      items: { titulo: string; descripcion: string }[];
    }
  | {
      tipo: "cifras";
      titulo: string;
      cifras: Cifra[];
    }
  | {
      tipo: "inversion";
      titulo: string;
      conceptos: {
        concepto: string;
        detalle: string;
        /** Ya formateado con moneda, p. ej. "$180,000 MXN". */
        monto: string;
      }[];
      total?: string;
      nota?: string;
    };

export type Cierre = {
  titulo: string;
  texto: string;
  accion?: { etiqueta: string; href: string };
};

export type Contenido =
  /** Página armada con los bloques de arriba. */
  | { tipo: "bloques"; bloques: Bloque[]; cierre?: Cierre }
  /**
   * La publicación vive fuera de esta app — otra app del monorepo, un
   * dashboard, un archivo. El slug redirige al destino, así que la URL corta
   * de qeb.mx sigue siendo la que se comparte aunque el destino cambie.
   */
  | { tipo: "enlace"; href: string };

/**
 * Estado editorial. `borrador`, `enviada` y `aprobada` describen el ciclo de
 * una propuesta; `vigente` y `retirada`, el de un reporte o una herramienta.
 *
 * No confundir con el estado administrable (archivada / eliminada), que se
 * maneja desde el índice y vive en la base de datos, no aquí.
 */
export type EstadoEditorial =
  | "borrador"
  | "enviada"
  | "aprobada"
  | "vigente"
  | "retirada";

export type Publicacion = {
  /** Segmento de URL. Solo minúsculas, números y guiones. */
  slug: string;
  seccion: Seccion;
  titulo: string;
  /** Una o dos frases; se usa en el índice y en el encabezado. */
  resumen: string;
  /** Cliente al que pertenece. Se omite en lo que es puramente interno. */
  cliente?: string;
  /** Fecha ISO (YYYY-MM-DD) de la versión que se comparte. */
  fecha: string;
  estado: EstadoEditorial;
  /** Para filtrar en el índice: plaza, tipo de entregable, lo que sirva. */
  etiquetas?: string[];
  /** Periodo que cubre, p. ej. "Marzo – Mayo 2026". */
  periodo?: string;
  contacto?: {
    nombre: string;
    email?: string;
  };
  contenido: Contenido;
};
