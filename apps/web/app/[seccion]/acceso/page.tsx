import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Button, Container, Eyebrow, Section } from "@qebooh/ui";
import { claveCorrecta, claveDeSeccion, nombreCookie, valorCookie } from "@/lib/auth";
import { baseDeSeccion } from "@/lib/base";
import { CONFIG, esSeccion } from "@/lib/secciones";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ seccion: string }>;
  searchParams: Promise<{ error?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion } = await params;
  if (!esSeccion(seccion)) return { title: "No encontrado" };
  return {
    title: `Acceso · ${CONFIG[seccion].nombre}`,
    robots: { index: false, follow: false },
  };
}

export default async function Acceso({ params, searchParams }: Props) {
  const { seccion } = await params;
  if (!esSeccion(seccion)) notFound();

  const { error } = await searchParams;
  const base = await baseDeSeccion(seccion);
  const sinConfigurar = claveDeSeccion(seccion) === null;

  async function entrar(datos: FormData) {
    "use server";
    if (!esSeccion(seccion)) notFound();

    const enviada = String(datos.get("clave") ?? "");
    const destino = await baseDeSeccion(seccion);

    if (!(await claveCorrecta(seccion, enviada))) {
      redirect(`${destino}/acceso?error=1`);
    }

    const clave = claveDeSeccion(seccion);
    // `claveCorrecta` ya garantiza que hay clave; esto satisface al tipo.
    if (!clave) redirect(`${destino}/acceso?error=1`);

    const galletas = await cookies();
    galletas.set(nombreCookie(seccion), await valorCookie(seccion, clave), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    redirect(destino || "/");
  }

  return (
    <Section className="py-20 md:py-28">
      <Container width="narrow">
        <Eyebrow>{CONFIG[seccion].nombre}</Eyebrow>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-titulo">
          Acceso al índice
        </h1>
        <p className="mt-4 text-texto-tenue">
          El índice lista todo lo publicado en esta sección, así que pide clave.
          Los enlaces individuales que ya hayas compartido siguen abriéndose sin
          ella.
        </p>

        {sinConfigurar ? (
          <p
            role="alert"
            className="mt-8 rounded-card border border-ambar/40 bg-ambar/10 p-4 text-sm"
          >
            Esta sección no tiene clave configurada, así que nadie puede entrar.
            Define <code className="font-mono">{CONFIG[seccion].variableClave}</code>{" "}
            en el entorno (ver <code className="font-mono">docs/DESPLIEGUE.md</code>).
          </p>
        ) : (
          <form action={entrar} className="mt-8 flex flex-wrap gap-3">
            <input
              type="password"
              name="clave"
              required
              autoComplete="current-password"
              placeholder="Clave de la sección"
              aria-label="Clave de la sección"
              className="min-w-56 flex-1 rounded-full border border-borde bg-superficie px-5 py-2.5 text-sm outline-none placeholder:text-texto-tenue focus-visible:border-marca-500"
            />
            <Button type="submit">Entrar</Button>
          </form>
        )}

        {error ? (
          <p role="alert" className="mt-4 text-sm text-magenta">
            Clave incorrecta.
          </p>
        ) : null}

        <p className="mt-10 text-sm text-texto-tenue">
          <a href={base || "/"} className="underline underline-offset-4">
            Volver al índice
          </a>
        </p>
      </Container>
    </Section>
  );
}
