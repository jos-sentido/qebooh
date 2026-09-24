/**
 * Entradas del blog. El contenido vive en el repo, igual que las
 * publicaciones de apps/web: una entrada nueva es un archivo nuevo en esta
 * carpeta más su registro en `index.ts`.
 */

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; items: { titulo?: string; texto: string }[] };

export type Entrada = {
  slug: string;
  titulo: string;
  /** ISO `AAAA-MM-DD`. */
  fecha: string;
  /** Una o dos frases para el listado y la meta descripción. */
  resumen: string;
  /** Ruta dentro de `public/`. */
  imagen: string;
  cuerpo: Bloque[];
};
