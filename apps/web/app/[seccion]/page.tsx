import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Section } from "@qebooh/ui";
import { listarPublicaciones } from "@/content/publicaciones";
import { almacen, almacenPersistente, ESTADO_INICIAL } from "@/lib/almacen";
import { baseDeSeccion } from "@/lib/base";
import { CONFIG, esSeccion } from "@/lib/secciones";
import { Panel, type Fila } from "./panel";

/**
 * Se arma en cada petición: el índice refleja el estado en base de datos, que
 * cambia desde el propio panel.
 *
 * Sin `generateStaticParams` a propósito. Exportarlo prerenderiza la página al
 * construir y esa versión congelada gana sobre `force-dynamic`: el índice se
 * quedaría con el estado que había en el build y archivar o anotar no se vería.
 */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ seccion: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion } = await params;
  if (!esSeccion(seccion)) return { title: "No encontrado" };
  return {
    title: CONFIG[seccion].nombre,
    robots: { index: false, follow: false },
  };
}

export default async function IndiceSeccion({ params }: Props) {
  const { seccion } = await params;
  if (!esSeccion(seccion)) notFound();

  const config = CONFIG[seccion];
  const [publicaciones, estados, base] = await Promise.all([
    listarPublicaciones(seccion),
    almacen().leerSeccion(seccion),
    baseDeSeccion(seccion),
  ]);

  const filas: Fila[] = publicaciones.map((publicacion) => {
    const estado = estados.get(publicacion.slug) ?? ESTADO_INICIAL;
    return {
      slug: publicacion.slug,
      titulo: publicacion.titulo,
      resumen: publicacion.resumen,
      cliente: publicacion.cliente ?? null,
      fecha: publicacion.fecha,
      estado: publicacion.estado,
      etiquetas: publicacion.etiquetas ?? [],
      esEnlace: publicacion.contenido.tipo === "enlace",
      archivada: estado.archivada,
      eliminada: estado.eliminada,
      bitacora: estado.bitacora,
    };
  });

  return (
    <Section className="py-12 md:py-16">
      <Container width="wide">
        <Eyebrow>Índice</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-titulo">
          {config.nombre}
        </h1>
        <p className="mt-4 max-w-2xl text-texto-tenue">
          {config.descripcion} Cada publicación tiene su propia URL para
          compartirla directo. Este índice pide clave y no se indexa; los
          enlaces individuales, no.
        </p>

        <div className="mt-10">
          <Panel
            seccion={seccion}
            base={base}
            filas={filas}
            persistente={almacenPersistente()}
          />
        </div>
      </Container>
    </Section>
  );
}
