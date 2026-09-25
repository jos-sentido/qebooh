import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@qebooh/ui";
import { LineaTopografica, Orbe } from "./graficos";
import { Onda } from "./onda";

/** Ancho estándar del sitio. */
export function Contenedor({
  children,
  className,
  angosto = false,
}: {
  children: ReactNode;
  className?: string;
  angosto?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        angosto ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Seccion({
  children,
  className,
  id,
  tono = "negro",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** `tinta` marca una banda intermedia para separar ritmos de lectura. */
  tono?: "negro" | "tinta";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-20 md:py-32",
        tono === "tinta" && "border-y border-linea bg-tinta",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Subtítulo sobre un titular: mayúsculas con tracking y una barra corta de
 * degradado, como los subtítulos del manual ("ESTADO DISPONIBLE").
 */
export function Etiqueta({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-rosa md:text-[13px]",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-7 shrink-0 degradado-marca" />
      {children}
    </p>
  );
}

/** Titular de sección con etiqueta y bajada opcionales. */
export function Encabezado({
  etiqueta,
  titulo,
  bajada,
  centrado = false,
  className,
}: {
  etiqueta?: string;
  titulo: ReactNode;
  bajada?: ReactNode;
  centrado?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        centrado && "mx-auto text-center [&>p:first-child]:justify-center",
        className,
      )}
    >
      {etiqueta ? <Etiqueta>{etiqueta}</Etiqueta> : null}
      <h2 className="mt-5 text-3xl font-extrabold leading-[1.02] text-white md:text-5xl">
        {titulo}
      </h2>
      {bajada ? (
        <p className="mt-6 text-lg leading-relaxed text-texto-tenue md:text-xl">
          {bajada}
        </p>
      ) : null}
    </div>
  );
}

type BotonProps = {
  href: string;
  children: ReactNode;
  variante?: "marca" | "borde";
  className?: string;
};

export function Boton({
  href,
  children,
  variante = "marca",
  className,
}: BotonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold uppercase tracking-[0.12em] transition",
        variante === "marca"
          ? "degradado-marca text-white shadow-[0_10px_40px_-10px_rgba(156,96,240,0.9)] hover:brightness-110"
          : "border border-linea text-white hover:border-violeta-claro hover:bg-tinta-alta",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

/** Portada de páginas interiores. */
export function Portada({
  etiqueta,
  titulo,
  bajada,
  orbe,
  children,
}: {
  etiqueta: string;
  titulo: ReactNode;
  bajada: ReactNode;
  /** Texto de la barra del orbe iridiscente. Sin él, no hay orbe. */
  orbe?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      <Resplandor />
      <LineaTopografica className="absolute inset-0 h-full w-full opacity-40" />
      <Contenedor
        className={cn(
          "relative",
          orbe && "grid items-center gap-14 lg:grid-cols-[1.35fr_1fr]",
        )}
      >
        <div>
          <Etiqueta>{etiqueta}</Etiqueta>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[0.98] text-white md:text-6xl">
            {titulo}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-texto-tenue md:text-xl">
            {bajada}
          </p>
          {children}
        </div>
        {orbe ? (
          <Orbe etiqueta={orbe} className="mx-auto hidden w-full max-w-md lg:block" />
        ) : null}
      </Contenedor>
    </section>
  );
}

/** Halo de color de fondo. Decorativo. */
export function Resplandor({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-45 blur-[120px]",
        "bg-[radial-gradient(closest-side,#9c60f0,transparent),radial-gradient(closest-side,#c045d8,transparent)] bg-[length:60%_100%,60%_100%] bg-[position:0_0,100%_0] bg-no-repeat",
        className,
      )}
    />
  );
}

/** Banda final de llamada a la acción, sobre vidrio iridiscente. */
export function LlamadoFinal({
  titulo = <>Pon tu OOHperación en orden.</>,
  bajada = "Te mostramos QEB con un recorrido por un negocio como el tuyo: tus plazas, tus formatos, tu flujo comercial y tus metas.",
}: {
  titulo?: ReactNode;
  bajada?: ReactNode;
}) {
  return (
    <section className="px-4 pb-20 md:px-6 md:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] vidrio-iridiscente px-6 py-16 md:px-16 md:py-24">
        <Onda
          variante="tubo"
          grosor={11}
          className="pointer-events-none absolute -right-10 top-1/2 hidden h-[26rem] w-[40rem] -translate-y-1/2 md:block"
          pulsos={[20, 32, 42, 46, 34, 22]}
          cola={40}
        />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-[1.02] text-white md:text-5xl">
            {titulo}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">{bajada}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold uppercase tracking-[0.12em] text-grafito transition hover:bg-white/90"
            >
              Agendar demo
            </Link>
            <Link
              href="/sistemas"
              className="inline-flex h-12 items-center rounded-full border border-white/60 px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/15"
            >
              Conocer los sistemas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tarjeta con número, título y texto. */
export function Tarjeta({
  indice,
  titulo,
  children,
  className,
}: {
  indice?: string;
  titulo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-linea bg-tinta p-7 transition-colors hover:border-violeta md:p-8",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 degradado-marca opacity-0 transition-opacity group-hover:opacity-100" />
      {indice ? (
        <p className="font-display text-sm font-extrabold text-lila [font-stretch:125%]">
          {indice}
        </p>
      ) : null}
      <h3 className="mt-4 text-xl font-bold leading-tight text-white md:text-2xl">
        {titulo}
      </h3>
      <div className="mt-3 leading-relaxed text-texto-tenue">{children}</div>
    </div>
  );
}

/** Lista con viñeta de marca. */
export function ListaMarca({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-lg leading-relaxed text-texto">
          <span
            aria-hidden
            className="mt-3 h-1.5 w-4 shrink-0 degradado-marca"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
