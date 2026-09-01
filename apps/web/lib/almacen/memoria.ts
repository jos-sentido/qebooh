import type { Seccion } from "../secciones";
import {
  ESTADO_INICIAL,
  nuevaEntrada,
  type Almacen,
  type EntradaBitacora,
  type EstadoPublicacion,
} from "./tipos";

/**
 * Almacén en memoria, para desarrollo local.
 *
 * NO sirve en producción: cada instancia serverless tiene su propia memoria y
 * el estado se pierde al reciclarse. Está aquí para que `pnpm dev` funcione sin
 * levantar una base de datos, y `crearAlmacen` sólo lo elige cuando no hay
 * cadena de conexión configurada.
 */
export class AlmacenMemoria implements Almacen {
  readonly nombre = "memoria";

  private datos = new Map<string, EstadoPublicacion>();

  private llave(seccion: Seccion, slug: string): string {
    return `${seccion}/${slug}`;
  }

  private mutar(
    seccion: Seccion,
    slug: string,
    cambio: (estado: EstadoPublicacion) => EstadoPublicacion,
  ): void {
    const actual = this.datos.get(this.llave(seccion, slug)) ?? ESTADO_INICIAL;
    this.datos.set(this.llave(seccion, slug), cambio(actual));
  }

  async leerSeccion(seccion: Seccion): Promise<Map<string, EstadoPublicacion>> {
    const prefijo = `${seccion}/`;
    const salida = new Map<string, EstadoPublicacion>();
    for (const [llave, estado] of this.datos) {
      if (llave.startsWith(prefijo)) {
        salida.set(llave.slice(prefijo.length), estado);
      }
    }
    return salida;
  }

  async leer(seccion: Seccion, slug: string): Promise<EstadoPublicacion> {
    return this.datos.get(this.llave(seccion, slug)) ?? ESTADO_INICIAL;
  }

  async fijarArchivada(
    seccion: Seccion,
    slug: string,
    valor: boolean,
  ): Promise<void> {
    this.mutar(seccion, slug, (estado) => ({ ...estado, archivada: valor }));
  }

  async fijarEliminada(
    seccion: Seccion,
    slug: string,
    valor: boolean,
  ): Promise<void> {
    this.mutar(seccion, slug, (estado) => ({ ...estado, eliminada: valor }));
  }

  async anotar(
    seccion: Seccion,
    slug: string,
    entrada: Omit<EntradaBitacora, "id" | "fecha">,
  ): Promise<void> {
    const nueva = nuevaEntrada(entrada);
    this.mutar(seccion, slug, (estado) => ({
      ...estado,
      bitacora: [nueva, ...estado.bitacora],
    }));
  }

  async borrarNota(
    seccion: Seccion,
    slug: string,
    id: string,
  ): Promise<void> {
    this.mutar(seccion, slug, (estado) => ({
      ...estado,
      bitacora: estado.bitacora.filter((entrada) => entrada.id !== id),
    }));
  }
}
