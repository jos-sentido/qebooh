import Link from "next/link";
import { cn } from "@qebooh/ui";
import {
  FLUJOS,
  LISTA_SISTEMAS,
  SISTEMAS,
  type SistemaId,
} from "@/lib/sistemas";
import { BarraTitulo, IconoCirculo, LineaTopografica } from "./graficos";

/**
 * Barra que une las páginas de sistemas. Va bajo la portada de cada una para
 * que se pueda saltar entre la visión general y cada sistema.
 */
export function NavSistemas({ actual }: { actual: SistemaId | "general" }) {
  const items = [
    { id: "general", nombre: "Visión general", href: "/sistemas", categoria: "Cómo se conectan" },
    ...LISTA_SISTEMAS,
  ];
  return (
    <nav aria-label="Sistemas QEB" className="border-y border-linea bg-tinta/80">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 md:px-10">
        {items.map((s) => {
          const esActual = s.id === actual;
          return (
            <li key={s.id} className="shrink-0">
              <Link
                href={s.href}
                aria-current={esActual ? "page" : undefined}
                className={cn(
                  "flex flex-col rounded-2xl px-5 py-2.5 transition-colors",
                  esActual
                    ? "degradado-marca text-white"
                    : "text-texto-tenue hover:bg-tinta-alta hover:text-white",
                )}
              >
                <span className="font-display text-sm font-extrabold uppercase">{s.nombre}</span>
                <span className={cn("text-[11px]", esActual ? "text-white/80" : "text-texto-tenue")}>
                  {s.categoria}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Los dos sistemas y lo que fluye entre ellos. `resaltar` pone al frente los
 * flujos que salen de un sistema (para la página de ese sistema).
 */
export function DiagramaConexion({ resaltar }: { resaltar?: SistemaId }) {
  const op = SISTEMAS.operacion;
  const intel = SISTEMAS.inteligencia;
  const ida = FLUJOS.filter((f) => f.de === "operacion");
  const vuelta = FLUJOS.filter((f) => f.de === "inteligencia");

  const Nodo = ({ id }: { id: SistemaId }) => {
    const s = SISTEMAS[id];
    return (
      <Link
        href={s.href}
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-colors md:p-8",
          resaltar === id
            ? "border-violeta bg-tinta-alta"
            : "border-linea bg-tinta hover:border-violeta",
        )}
      >
        <div>
          <div className="flex items-center gap-3">
            <IconoCirculo tipo={id === "operacion" ? "panel" : "analisis"} />
            <BarraTitulo como="span">{s.categoria}</BarraTitulo>
          </div>
          <h3 className="mt-6 text-2xl font-extrabold uppercase text-white">
            {s.nombre}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {s.capacidades.map((c) => (
              <li
                key={c}
                className="rounded-full border border-linea px-3 py-1 text-xs text-texto"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm font-semibold text-rosa">
          Ver {s.nombre} <span aria-hidden>→</span>
        </p>
      </Link>
    );
  };

  const Flujos = ({
    lista,
    direccion,
  }: {
    lista: typeof FLUJOS;
    direccion: "ida" | "vuelta";
  }) => (
    <div>
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-texto-tenue">
        <span aria-hidden className="text-rosa">
          {direccion === "ida" ? "↓" : "↑"}
        </span>
        {direccion === "ida"
          ? `De ${op.nombre} a ${intel.nombre}`
          : `De ${intel.nombre} a ${op.nombre}`}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {lista.map((f) => (
          <li
            key={f.dato}
            className="rounded-2xl border border-linea bg-negro p-4 text-sm leading-relaxed"
          >
            <span className="text-texto">{f.dato}</span>
            <span aria-hidden className="mx-2 text-rosa">
              →
            </span>
            <span className="text-texto-tenue">{f.resultado}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.35fr_1fr] lg:items-stretch">
      <Nodo id="operacion" />
      <div className="relative flex flex-col justify-center gap-6 rounded-3xl border border-dashed border-linea p-5 md:p-6">
        <LineaTopografica className="absolute inset-0 h-full w-full rounded-3xl opacity-20" densidad={5} />
        <p className="relative text-center font-display text-base font-extrabold uppercase text-white">
          En tiempo real, sin recapturar
        </p>
        <div className="relative space-y-6">
          {resaltar === "inteligencia" ? (
            <>
              <Flujos lista={vuelta} direccion="vuelta" />
              <Flujos lista={ida} direccion="ida" />
            </>
          ) : (
            <>
              <Flujos lista={ida} direccion="ida" />
              <Flujos lista={vuelta} direccion="vuelta" />
            </>
          )}
        </div>
      </div>
      <Nodo id="inteligencia" />
    </div>
  );
}

/** Tarjeta grande hacia el otro sistema, al final de cada página de sistema. */
export function OtroSistema({ desde }: { desde: SistemaId }) {
  const otro = desde === "operacion" ? SISTEMAS.inteligencia : SISTEMAS.operacion;
  return (
    <Link
      href={otro.href}
      className="group relative block overflow-hidden rounded-[2rem] border border-linea bg-tinta p-8 transition-colors hover:border-violeta md:p-14"
    >
      <LineaTopografica className="absolute inset-0 h-full w-full opacity-40 transition-opacity group-hover:opacity-70" />
      <div className="relative flex items-center gap-4">
        <IconoCirculo tipo={otro.id === "operacion" ? "panel" : "analisis"} tamano="lg" />
        <BarraTitulo como="span">Siguiente sistema · {otro.categoria}</BarraTitulo>
      </div>
      <h2 className="relative mt-6 max-w-2xl text-4xl font-extrabold leading-[1.02] text-white md:text-6xl">
        {otro.nombre}
      </h2>
      <p className="relative mt-5 max-w-xl text-lg leading-relaxed text-texto-tenue">
        {otro.lema}
      </p>
      <p className="relative mt-8 text-sm font-semibold text-white">
        Conocer {otro.nombre} <span aria-hidden className="text-rosa">→</span>
      </p>
    </Link>
  );
}
