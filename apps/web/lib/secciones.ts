/**
 * Las tres secciones publicables, cada una en su propio subdominio de qeb.mx.
 *
 * Un solo proyecto de Vercel sirve las tres: el middleware lee el hostname y
 * reescribe la ruta al prefijo de la sección. En local no hay subdominios, así
 * que se navega por prefijo (`localhost:3000/propuestas`), que es exactamente
 * la ruta a la que reescribe producción.
 */

/**
 * Cabecera con la que el middleware le dice a las páginas cómo armar sus
 * enlaces: vacía en un subdominio (`/mi-slug`), con prefijo en el dominio
 * principal y en local (`/propuestas/mi-slug`).
 */
export const CABECERA_BASE = "x-qeb-base";

export const SECCIONES = ["propuestas", "reportes", "tool"] as const;

export type Seccion = (typeof SECCIONES)[number];

type ConfigSeccion = {
  /** Subdominio que sirve esta sección en producción. */
  host: string;
  /** Nombre visible. */
  nombre: string;
  /** Una línea que explica qué se publica aquí. */
  descripcion: string;
  /**
   * Nombre de la variable de entorno con la clave de acceso al índice.
   * Sin ella la sección queda cerrada — falla cerrado, nunca abierto.
   */
  variableClave: string;
};

export const CONFIG: Record<Seccion, ConfigSeccion> = {
  propuestas: {
    host: "propuestas.qeb.mx",
    nombre: "Propuestas",
    descripcion: "Propuestas comerciales que se comparten con el cliente.",
    variableClave: "QEB_CLAVE_PROPUESTAS",
  },
  reportes: {
    host: "reportes.qeb.mx",
    nombre: "Reportes",
    descripcion: "Reportes y entregables de avance.",
    variableClave: "QEB_CLAVE_REPORTES",
  },
  tool: {
    host: "tool.qeb.mx",
    nombre: "Herramientas",
    descripcion: "Herramientas internas y comerciales.",
    variableClave: "QEB_CLAVE_TOOL",
  },
};

const POR_HOST = new Map<string, Seccion>(
  SECCIONES.map((seccion) => [CONFIG[seccion].host, seccion]),
);

export function esSeccion(valor: string): valor is Seccion {
  return (SECCIONES as readonly string[]).includes(valor);
}

/**
 * Sección que corresponde a un hostname, o `null` si el host no es uno de los
 * subdominios (dominio principal, previews de Vercel, localhost). En ese caso
 * se navega por prefijo de ruta.
 *
 * Se ignora el puerto: `propuestas.qeb.mx:3000` es la misma sección.
 */
export function seccionDeHost(host: string | null): Seccion | null {
  if (!host) return null;
  const sinPuerto = host.split(":")[0]?.toLowerCase() ?? "";
  return POR_HOST.get(sinPuerto) ?? null;
}
