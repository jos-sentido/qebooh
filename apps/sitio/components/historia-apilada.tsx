"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@qebooh/ui";
import { Etiqueta } from "./bloques";
import { BarraTitulo, IconoCirculo, type TipoIcono } from "./graficos";
import { Onda } from "./onda";

export type Escena = {
  icono: TipoIcono;
  cuando: string;
  quien: string;
  frase: string;
  historia: string;
  solucion: string;
  href: string;
  sistema: string;
};

/** Pantallas de scroll que consume cada carta. Más alto = swipe más lento. */
const SCROLL_POR_CARTA = 0.85;
/** Cuántas cartas se asoman detrás de la actual. */
const ASOMAN = 3;
/** Parte de cada tramo en que la carta se queda quieta para leerse. */
const PAUSA = 0.35;

/**
 * Convierte el avance lineal del scroll en uno con pausa: al llegar a una
 * carta, se queda quieta un tramo y luego sale con aceleración suave.
 */
function conPausa(p: number) {
  const base = Math.floor(p);
  const f = p - base;
  if (f <= PAUSA) return base;
  const t = (f - PAUSA) / (1 - PAUSA);
  const suave = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  return base + suave;
}

/**
 * "Una semana cualquiera" como mazo de cartas. La sección se queda fija
 * mientras se hace scroll; la carta de arriba sale con un swipe (se desliza
 * y gira) y deja ver la siguiente. Al regresar el scroll, las cartas vuelven.
 *
 * Con `prefers-reduced-motion` se muestran como lista normal. Las cartas
 * fuera de pantalla son `inert` para que el teclado no llegue a enlaces que
 * no se ven.
 */
export function HistoriaApilada({ escenas }: { escenas: Escena[] }) {
  const zona = useRef<HTMLDivElement>(null);
  const seccion = useRef<HTMLDivElement>(null);
  const [progreso, setProgreso] = useState(0);
  const [animar, setAnimar] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const alCambiar = () => setAnimar(!mq.matches);
    alCambiar();
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, []);

  useEffect(() => {
    if (!animar) return;
    let cuadro = 0;
    const medir = () => {
      cuadro = 0;
      const el = zona.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const recorrido = r.height - window.innerHeight;
      const t = recorrido > 0 ? Math.min(1, Math.max(0, -r.top / recorrido)) : 0;
      setProgreso(conPausa(t * (escenas.length - 1)));
    };
    const alDesplazar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, [animar, escenas.length]);

  const actual = Math.round(progreso);

  /**
   * Regresa al inicio de la sección. Las cartas dependen de la posición del
   * scroll, así que al llegar arriba el mazo vuelve solo a la carta 1.
   */
  const volverAlInicio = () => {
    const el = seccion.current;
    if (!el) return;
    const encabezado = 72; // alto del encabezado fijo
    const y = el.getBoundingClientRect().top + window.scrollY - encabezado;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reducir ? "auto" : "smooth" });
  };

  const intro = (
    <div>
      <Etiqueta>Si trabajas en OOH, esto te suena</Etiqueta>
      <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] text-white md:text-5xl">
        Una semana cualquiera.
      </h2>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-texto-tenue">
        La publicidad exterior se vende rápido y se opera en la calle. Pero
        detrás, casi siempre, hay hojas de cálculo, correos y la memoria de
        alguien. Así se ve una semana normal.
      </p>
    </div>
  );

  // Sin animación: lista simple.
  if (!animar) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
        {intro}
        <ol className="mt-12 space-y-5">
          {escenas.map((e) => (
            <li key={e.cuando}>
              <Carta escena={e} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={seccion} className="relative scroll-mt-20 py-20 md:py-32">
      {/* En móvil la introducción va arriba, fuera de la zona fija. */}
      <div className="mx-auto max-w-7xl px-6 pb-10 md:px-10 lg:hidden">{intro}</div>

      <div
        ref={zona}
        className="relative"
        style={{ height: `${100 + (escenas.length - 1) * SCROLL_POR_CARTA * 100}vh` }}
      >
        <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="hidden lg:block">
              {intro}
              <Contador
                actual={actual}
                total={escenas.length}
                progreso={progreso}
                alVolver={volverAlInicio}
              />
              <Onda variante="tubo" className="mt-12 h-44 w-44" />
            </div>

            <div>
              <ol className="relative h-[34rem] sm:h-[26rem]" aria-label="Una semana en una empresa OOH">
                {escenas.map((e, i) => {
                  const d = i - progreso; // < 0: ya pasó; 0: al frente; > 0: detrás
                  let estilo: React.CSSProperties;
                  if (d < 0) {
                    // Swipe: sale hacia la derecha y arriba, girando. Se queda
                    // opaca casi todo el recorrido para no encimarse con la
                    // siguiente; sólo se desvanece al final.
                    const s = Math.min(1, -d);
                    estilo = {
                      transform: `translate3d(${s * 135}%, ${-s * 18}%, 0) rotate(${s * 16}deg)`,
                      opacity: s < 0.7 ? 1 : 1 - (s - 0.7) / 0.3,
                      zIndex: escenas.length + i,
                    };
                  } else {
                    // En el mazo: más atrás, más abajo y más chica.
                    const k = Math.min(d, ASOMAN);
                    estilo = {
                      transform: `translate3d(0, ${k * 18}px, 0) scale(${1 - k * 0.045})`,
                      opacity: d > ASOMAN ? 0 : 1 - Math.max(0, d - ASOMAN + 1) * 0.6,
                      zIndex: escenas.length - i,
                      filter: `brightness(${1 - k * 0.22})`,
                    };
                  }
                  return (
                    <li
                      key={e.cuando}
                      className="absolute inset-0 origin-bottom-left will-change-transform"
                      style={estilo}
                      inert={i !== actual}
                      aria-hidden={i !== actual}
                    >
                      <Carta escena={e} alta />
                    </li>
                  );
                })}
              </ol>
              <div className="mt-14 lg:hidden">
                <Contador
                  actual={actual}
                  total={escenas.length}
                  progreso={progreso}
                  alVolver={volverAlInicio}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contador({
  actual,
  total,
  progreso,
  alVolver,
}: {
  actual: number;
  total: number;
  progreso: number;
  alVolver: () => void;
}) {
  const dos = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="mt-10 max-w-xs">
      <p className="flex items-baseline gap-2 font-display font-extrabold uppercase text-white">
        <span className="text-3xl">{dos(actual + 1)}</span>
        <span className="text-sm text-texto-tenue">/ {dos(total)}</span>
        <span className="ml-auto text-[11px] font-semibold tracking-[0.22em] text-rosa">
          {actual < total - 1 ? "Sigue bajando ↓" : "Así se ve con QEB ↓"}
        </span>
      </p>
      <span className="mt-3 block h-1 bg-white/10">
        <span
          className="block h-full degradado-marca"
          style={{ width: `${((progreso + 1) / total) * 100}%` }}
        />
      </span>
      {/* Sólo cuando ya se avanzó: evita un botón que no hace nada. */}
      <button
        type="button"
        onClick={alVolver}
        tabIndex={actual > 0 ? 0 : -1}
        aria-hidden={actual === 0}
        className={cn(
          "mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-linea px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-violeta-claro hover:bg-tinta-alta",
          actual > 0 ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <span aria-hidden>↑</span> Volver a la 1
      </button>
    </div>
  );
}

function Carta({ escena: e, alta = false }: { escena: Escena; alta?: boolean }) {
  return (
    <article
      className={cn(
        "grid overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:grid-cols-[1fr_1.05fr]",
        alta && "h-full",
      )}
    >
      {/* Panel oscuro: la escena. */}
      <div className="relative flex flex-col justify-between gap-6 bg-grafito p-6 md:p-8">
        <span
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-1.5 bg-gradient-to-b from-violeta via-violeta-claro to-magenta-vivo sm:block"
        />
        <div className="flex items-center gap-3">
          <IconoCirculo tipo={e.icono} tamano="sm" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-texto-tenue">
            {e.cuando}
            <br />
            <span className="text-rosa">{e.quien}</span>
          </p>
        </div>
        <h3 className="text-2xl font-extrabold leading-tight text-white md:text-[1.7rem]">
          {e.frase}
        </h3>
      </div>
      {/* Panel claro: qué pasa y qué lo resuelve. */}
      <div className="flex flex-col justify-between gap-6 bg-niebla p-6 md:p-8">
        <p className="text-lg leading-relaxed text-grafito/80">{e.historia}</p>
        <Link href={e.href} className="group block">
          <BarraTitulo como="span">{e.sistema}</BarraTitulo>
          <span className="mt-2 flex items-center justify-between gap-3">
            <span className="font-display text-lg font-extrabold uppercase leading-tight text-grafito">
              {e.solucion}
            </span>
            <span
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-grafito text-white transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </Link>
      </div>
    </article>
  );
}
