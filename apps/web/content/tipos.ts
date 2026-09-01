/**
 * Modelo de una propuesta a cliente.
 *
 * Una propuesta es contenido, no código: se declara como un objeto y la
 * plantilla de `/propuestas/[slug]` la renderiza. Añadir un cliente nuevo es
 * añadir un archivo en `content/propuestas/` y registrarlo en el índice.
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

export type Propuesta = {
  /** Segmento de URL. Solo minúsculas, números y guiones. */
  slug: string;
  cliente: string;
  titulo: string;
  /** Una o dos frases; se usa en el índice y en el hero. */
  resumen: string;
  /** Fecha ISO (YYYY-MM-DD) de la versión que ve el cliente. */
  fecha: string;
  estado: "borrador" | "enviada" | "aprobada";
  /** Periodo de la campaña, p. ej. "Marzo – Mayo 2026". */
  periodo?: string;
  contacto?: {
    nombre: string;
    email?: string;
  };
  bloques: Bloque[];
  /** Qué pasa al final de la propuesta: firmar, agendar, pedir ajustes. */
  cierre?: {
    titulo: string;
    texto: string;
    accion?: { etiqueta: string; href: string };
  };
};
