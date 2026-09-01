import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ButtonLink, Container, Eyebrow, Section } from "@qebooh/ui";
import { BloquePublicacion, tonoAlterno } from "@/components/bloques";
import { obtenerPublicacion } from "@/content/publicaciones";
import { almacen } from "@/lib/almacen";
import { ETIQUETA_ESTADO, formatearFecha } from "@/lib/formato";
import { esSeccion } from "@/lib/secciones";

/**
 * Cada visita comprueba si la publicación fue eliminada desde el índice, así
 * que la página se sirve por petición.
 *
 * Sin `generateStaticParams`, igual que el índice: una versión prerenderizada
 * seguiría abriendo un enlace que ya se retiró de circulación.
 */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ seccion: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion, slug } = await params;
  if (!esSeccion(seccion)) return { title: "No encontrado" };

  const publicacion = obtenerPublicacion(seccion, slug);
  if (!publicacion) return { title: "No encontrado" };

  return {
    title: publicacion.cliente
      ? `${publicacion.titulo} — ${publicacion.cliente}`
      : publicacion.titulo,
    description: publicacion.resumen,
    // Material de cliente: se comparte por enlace, no se indexa.
    robots: { index: false, follow: false },
  };
}

export default async function PaginaPublicacion({ params }: Props) {
  const { seccion, slug } = await params;
  if (!esSeccion(seccion)) notFound();

  const publicacion = obtenerPublicacion(seccion, slug);
  if (!publicacion) notFound();

  // Eliminada desde el índice: el enlace compartido deja de abrir. El archivo
  // sigue en el repo, sólo se retira de circulación.
  const estado = await almacen().leer(seccion, slug);
  if (estado.eliminada) notFound();

  if (publicacion.contenido.tipo === "enlace") {
    redirect(publicacion.contenido.href);
  }

  const { bloques, cierre } = publicacion.contenido;

  return (
    <>
      <Section className="pt-20 md:pt-28">
        <Container width="wide">
          {publicacion.cliente ? (
            <Eyebrow>{publicacion.cliente}</Eyebrow>
          ) : null}
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-titulo md:text-display">
            {publicacion.titulo}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-texto-tenue">
            {publicacion.resumen}
          </p>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-borde pt-8 text-sm">
            <div>
              <dt className="text-texto-tenue">Fecha</dt>
              <dd className="mt-1">{formatearFecha(publicacion.fecha)}</dd>
            </div>
            {publicacion.periodo ? (
              <div>
                <dt className="text-texto-tenue">Periodo</dt>
                <dd className="mt-1">{publicacion.periodo}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-texto-tenue">Estado</dt>
              <dd className="mt-1">{ETIQUETA_ESTADO[publicacion.estado]}</dd>
            </div>
            {publicacion.contacto ? (
              <div>
                <dt className="text-texto-tenue">Contacto</dt>
                <dd className="mt-1">
                  {publicacion.contacto.email ? (
                    <a
                      href={`mailto:${publicacion.contacto.email}`}
                      className="underline underline-offset-4"
                    >
                      {publicacion.contacto.nombre}
                    </a>
                  ) : (
                    publicacion.contacto.nombre
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        </Container>
      </Section>

      {bloques.map((bloque, indice) => (
        <BloquePublicacion
          key={`${bloque.tipo}-${bloque.titulo}`}
          bloque={bloque}
          indice={indice}
        />
      ))}

      {cierre ? (
        <Section tone={tonoAlterno(bloques.length + 1)}>
          <Container>
            <h2 className="text-3xl font-bold tracking-tight text-titulo">
              {cierre.titulo}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-texto-tenue">
              {cierre.texto}
            </p>
            {cierre.accion ? (
              <ButtonLink href={cierre.accion.href} size="lg" className="mt-10">
                {cierre.accion.etiqueta}
              </ButtonLink>
            ) : null}
          </Container>
        </Section>
      ) : null}
    </>
  );
}
