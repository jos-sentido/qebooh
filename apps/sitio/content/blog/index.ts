import { entrada1 } from "./inventario";
import { entradaMedicion } from "./medicion";
import { entradaOohDooh } from "./ooh-dooh";
import { entrada2 } from "./propuestas";
import { entradaSoftware } from "./software";
import { entrada3 } from "./transformacion";
import type { Entrada } from "./tipos";

export type { Bloque, Entrada } from "./tipos";

const ENTRADAS: Entrada[] = [
  entradaOohDooh,
  entradaMedicion,
  entradaSoftware,
  entrada1,
  entrada2,
  entrada3,
];

/** Más recientes primero. */
export function entradas(): Entrada[] {
  return [...ENTRADAS].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function entrada(slug: string): Entrada | undefined {
  return ENTRADAS.find((e) => e.slug === slug);
}
