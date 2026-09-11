import { AlmacenFirestore, firebaseConfigurado } from "./firestore";
import { AlmacenMemoria } from "./memoria";
import type { Almacen } from "./tipos";

export type { Almacen, EntradaBitacora, EstadoPublicacion } from "./tipos";
export { ESTADO_INICIAL } from "./tipos";

/**
 * La instancia se ancla a `globalThis` y no a una variable de módulo.
 *
 * Next empaqueta las Server Actions y las páginas por separado, así que el
 * mismo módulo puede cargarse dos veces en un proceso: con una variable de
 * módulo, la acción escribiría en un almacén y la página leería de otro. Con
 * el almacén en memoria eso se ve como acciones que "no hacen nada"; con
 * Firestore serían dos apps de firebase-admin inicializadas en el mismo
 * proceso. Anclarlo aquí también evita reinicializar entre recargas en
 * desarrollo.
 */
const global = globalThis as typeof globalThis & { __qebAlmacen?: Almacen };

/**
 * Almacén de estado, elegido por entorno: Firestore si hay credenciales,
 * memoria si no.
 */
export function almacen(): Almacen {
  if (global.__qebAlmacen) return global.__qebAlmacen;

  let instancia: Almacen;
  if (firebaseConfigurado()) {
    instancia = new AlmacenFirestore();
  } else {
    if (process.env.NODE_ENV === "production") {
      // No se lanza un error para no tumbar el sitio: las publicaciones se
      // siguen viendo, lo que no persiste es archivado, borrado y bitácora.
      console.warn(
        "[qeb] Sin credenciales de Firebase: el estado de administración no " +
          "se guarda. Ver docs/DESPLIEGUE.md.",
      );
    }
    instancia = new AlmacenMemoria();
  }

  global.__qebAlmacen = instancia;
  return instancia;
}

/** ¿El estado administrable sobrevive a un despliegue? Se avisa en la UI si no. */
export function almacenPersistente(): boolean {
  return firebaseConfigurado();
}
