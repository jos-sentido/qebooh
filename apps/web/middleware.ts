import { NextResponse, type NextRequest } from "next/server";
import { cookieValida, nombreCookie } from "@/lib/auth";
import { CABECERA_BASE, esSeccion, seccionDeHost } from "@/lib/secciones";

/**
 * Dos trabajos, en este orden:
 *
 * 1. Enrutar por subdominio. `propuestas.qeb.mx/algo` se reescribe a
 *    `/propuestas/algo`, que es la misma ruta que se navega en local por
 *    prefijo. Un solo proyecto de Vercel sirve los tres subdominios.
 *
 * 2. Cerrar el índice de cada sección. El índice lista todo lo publicado, así
 *    que pide clave; los slugs quedan abiertos por enlace para poder
 *    compartirlos con el cliente.
 *
 * Ojo con las dos formas de la URL: en un subdominio el navegador ve `/algo`
 * mientras el router ve `/propuestas/algo`. Todo lo que se mande al navegador
 * —redirecciones y enlaces— tiene que usar la forma que el navegador entiende,
 * así que el middleware publica esa base en la cabecera `x-qeb-base` y las
 * páginas construyen sus enlaces a partir de ella.
 */

export async function middleware(peticion: NextRequest) {
  const url = peticion.nextUrl;
  const seccionHost = seccionDeHost(peticion.headers.get("host"));
  const segmentos = url.pathname.split("/").filter(Boolean);
  const primero = segmentos[0];

  const seccion =
    seccionHost ?? (primero && esSeccion(primero) ? primero : null);

  if (!seccion) return NextResponse.next();

  // Ruta dentro de la sección, sin el prefijo que sólo existe en el router.
  const resto = seccionHost ? segmentos : segmentos.slice(1);

  // Base con la que el navegador arma enlaces: vacía en el subdominio, con
  // prefijo en el dominio principal y en local.
  const base = seccionHost ? "" : `/${seccion}`;

  // Sólo el índice pide clave. `resto` vacío es el índice; cualquier otra cosa
  // es un slug o la pantalla de acceso, y esas quedan abiertas.
  if (resto.length === 0) {
    const cookie = peticion.cookies.get(nombreCookie(seccion))?.value;
    if (!(await cookieValida(seccion, cookie))) {
      return NextResponse.redirect(new URL(`${base}/acceso`, url));
    }
  }

  const cabeceras = new Headers(peticion.headers);
  cabeceras.set(CABECERA_BASE, base);

  if (!seccionHost) {
    return NextResponse.next({ request: { headers: cabeceras } });
  }

  const destino = new URL(`/${seccion}${url.pathname}`, url);
  destino.search = url.search;
  return NextResponse.rewrite(destino, { request: { headers: cabeceras } });
}

export const config = {
  // Se excluyen los recursos internos de Next y los archivos estáticos: el
  // middleware sólo debe ver navegaciones.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)"],
};
