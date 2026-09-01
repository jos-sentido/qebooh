import { CONFIG, type Seccion } from "./secciones";

/**
 * Acceso al índice de cada sección con una clave compartida.
 *
 * Alcance deliberado: protege el índice (que lista todo lo publicado) y las
 * acciones de administración. Los slugs individuales quedan abiertos por
 * enlace, para poder compartir una propuesta con el cliente sin darle
 * credenciales. Es lo que se eligió al diseñar esto; si alguna publicación
 * lleva información que no puede circular, necesita su propia protección.
 *
 * La cookie es un HMAC de la sección firmado con la clave. Como la clave es la
 * llave, cambiarla invalida todas las sesiones abiertas — que es lo que se
 * espera al rotar una contraseña compartida. No hace falta un secreto aparte.
 *
 * Este módulo corre en el runtime Edge (middleware) y en Node (server
 * actions), así que usa Web Crypto y nada de `node:crypto`.
 */

const codificador = new TextEncoder();

export function nombreCookie(seccion: Seccion): string {
  return `qeb_acceso_${seccion}`;
}

/** Clave configurada para la sección, o `null` si no hay ninguna. */
export function claveDeSeccion(seccion: Seccion): string | null {
  const valor = process.env[CONFIG[seccion].variableClave];
  return valor && valor.length > 0 ? valor : null;
}

async function firmar(mensaje: string, clave: string): Promise<string> {
  const llave = await crypto.subtle.importKey(
    "raw",
    codificador.encode(clave),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const firma = await crypto.subtle.sign("HMAC", llave, codificador.encode(mensaje));
  return Array.from(new Uint8Array(firma))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Valor de cookie que acredita acceso a la sección. */
export function valorCookie(seccion: Seccion, clave: string): Promise<string> {
  return firmar(`acceso:${seccion}`, clave);
}

/**
 * Compara sin ramificar según el contenido. Dos cadenas de distinta longitud se
 * rechazan de inmediato: la longitud de un HMAC hexadecimal es pública, así que
 * no filtra nada.
 */
function igualdadConstante(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diferencia = 0;
  for (let i = 0; i < a.length; i += 1) {
    diferencia |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diferencia === 0;
}

/**
 * ¿La cookie acredita acceso a esta sección?
 *
 * Falla cerrado: si la sección no tiene clave configurada, nadie entra. Es
 * preferible un índice inaccesible a uno abierto por un despliegue sin
 * variables de entorno.
 */
export async function cookieValida(
  seccion: Seccion,
  cookie: string | undefined,
): Promise<boolean> {
  if (!cookie) return false;
  const clave = claveDeSeccion(seccion);
  if (!clave) return false;
  return igualdadConstante(cookie, await valorCookie(seccion, clave));
}

/** ¿La contraseña enviada en el formulario de acceso es la de la sección? */
export async function claveCorrecta(
  seccion: Seccion,
  enviada: string,
): Promise<boolean> {
  const clave = claveDeSeccion(seccion);
  if (!clave) return false;
  // Se comparan los HMAC y no las cadenas: iguala la longitud y evita que el
  // tiempo de comparación revele cuántos caracteres coinciden.
  const [a, b] = await Promise.all([
    firmar("clave", enviada),
    firmar("clave", clave),
  ]);
  return igualdadConstante(a, b);
}
