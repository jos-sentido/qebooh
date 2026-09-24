import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@qebooh/ui";
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
        "scroll-mt-20 py-20 md:py-32",
        tono === "tinta" && "border-y border-linea bg-tinta",
        className,
      )}
    >
      {children}
    </section>
  );
}

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
        "font-mono text-xs font-medium uppercase tracking-[0.22em] text-rosa",
        className,
      )}
    >
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
        centrado && "mx-auto text-center",
        className,
      )}
    >
      {etiqueta ? <Etiqueta>{etiqueta}</Etiqueta> : null}
      <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl">
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
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition",
        variante === "marca"
          ? "degradado-marca text-white shadow-[0_10px_40px_-10px_rgba(135,40,107,0.9)] hover:brightness-125"
          : "border border-linea text-white hover:border-rosa hover:bg-tinta-alta",
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
  children,
}: {
  etiqueta: string;
  titulo: ReactNode;
  bajada: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      <Resplandor />
      <Onda
        animada
        className="pointer-events-none absolute right-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] top-1/2 hidden h-44 w-[28rem] -translate-y-1/2 opacity-80 xl:block"
      />
      <Contenedor className="relative">
        <Etiqueta>{etiqueta}</Etiqueta>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight text-white md:text-7xl">
          {titulo}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-texto-tenue md:text-xl">
          {bajada}
        </p>
        {children}
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
        "pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px]",
        "bg-[radial-gradient(closest-side,#87286b,transparent),radial-gradient(closest-side,#632a94,transparent)] bg-[length:60%_100%,60%_100%] bg-[position:0_0,100%_0] bg-no-repeat",
        className,
      )}
    />
  );
}

/** Banda final de llamada a la acción. */
export function LlamadoFinal({
  titulo = (
    <>
      Pon tu OOHperación
      <br className="hidden md:block" /> en orden.
    </>
  ),
  bajada = "Te mostramos QEB con un recorrido por tu propia operación: tus plazas, tus formatos y tu flujo comercial.",
}: {
  titulo?: ReactNode;
  bajada?: ReactNode;
}) {
  return (
    <section className="px-4 pb-20 md:px-6 md:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] degradado-marca px-6 py-16 md:px-16 md:py-24">
        <Onda
          className="pointer-events-none absolute -right-16 top-1/2 h-64 w-[44rem] -translate-y-1/2 opacity-30 mix-blend-screen"
          pulsos={[12, 22, 36, 46, 32, 20, 10]}
        />
        <div className="relative max-w-2xl">
          <h2 className="text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl">
            {titulo}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">{bajada}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold text-negro transition hover:bg-white/90"
            >
              Agendar demo
            </Link>
            <Link
              href="/plataforma"
              className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver la plataforma
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tarjeta con número o ícono, título y texto. */
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
        "group relative rounded-3xl border border-linea bg-tinta p-7 transition-colors hover:border-magenta-marca md:p-8",
        className,
      )}
    >
      {indice ? (
        <p className="font-mono text-xs tracking-[0.2em] text-texto-tenue">
          {indice}
        </p>
      ) : null}
      <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
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
        <li key={i} className="flex gap-3 leading-relaxed text-texto">
          <span
            aria-hidden
            className="mt-2.5 h-1.5 w-4 shrink-0 rounded-full degradado-marca"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
