import { AlmacenMemoria } from "./memoria";
import { AlmacenPostgres } from "./postgres";
import type { Almacen } from "./tipos";

export type {
  Almacen,
  EntradaBitacora,
  EstadoPublicacion,
} from "./tipos";
export { ESTADO_INICIAL } from "./tipos";

function cadenaConexion(): string | null {
  const valor = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  return valor && valor.length > 0 ? valor : null;
}

/**
 * La instancia se ancla a `globalThis` y no a una variable de módulo.
 *
 * Next empaqueta las Server Actions y las páginas por separado, así que el
 * mismo módulo puede cargarse dos veces en un proceso: con una variable de
 * módulo, la acción escribiría en un almacén y la página leería de otro. Con
 * el almacén en memoria eso se ve como acciones que "no hacen nada"; con
 * Postgres serían dos pools en vez de uno. Anclarlo aquí también evita
 * acumular pools entre recargas en desarrollo.
 */
const global = globalThis as typeof globalThis & { __qebAlmacen?: Almacen };

/**
 * Almacén de estado, elegido por entorno: Postgres si hay cadena de conexión,
 * memoria si no.
 */
export function almacen(): Almacen {
  if (global.__qebAlmacen) return global.__qebAlmacen;

  let instancia: Almacen;
  const cadena = cadenaConexion();
  if (cadena) {
    instancia = new AlmacenPostgres(cadena);
  } else {
    if (process.env.NODE_ENV === "production") {
      // No se lanza un error para no tumbar el sitio: las publicaciones se
      // siguen viendo, lo que no persiste es archivado, borrado y bitácora.
      console.warn(
        "[qeb] Sin POSTGRES_URL: el estado de administración no se guarda. " +
          "Ver docs/DESPLIEGUE.md.",
      );
    }
    instancia = new AlmacenMemoria();
  }

  global.__qebAlmacen = instancia;
  return instancia;
}

/** ¿El estado administrable sobrevive a un despliegue? Se avisa en la UI si no. */
export function almacenPersistente(): boolean {
  return cadenaConexion() !== null;
}
