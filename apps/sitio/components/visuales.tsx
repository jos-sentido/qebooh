/**
 * Ilustraciones de producto hechas en código.
 *
 * Recrean la estructura real de la plataforma (módulos, KPIs de inventario,
 * catorcenas, versionario) con DATOS DE EJEMPLO. Nunca usar capturas de la
 * plataforma en producción: traen marcas, agencias e inventario de clientes
 * reales. Las cifras de aquí son inventadas pero coherentes entre sí (los
 * estados suman el total, los muebles también).
 */

import { cn } from "@qebooh/ui";

const KPIS = [
  { etiqueta: "Total", valor: "4,820", color: "bg-white" },
  { etiqueta: "Disponible", valor: "612", color: "bg-estado-activo" },
  { etiqueta: "Reservado", valor: "148", color: "bg-estado-espera" },
  { etiqueta: "Vendido", valor: "3,994", color: "bg-estado-campana" },
  { etiqueta: "Bloqueado", valor: "66", color: "bg-estado-propuesta" },
];

const MUEBLES = [
  { nombre: "Parabús", n: 2140 },
  { nombre: "Unipolar", n: 860 },
  { nombre: "Puente peatonal", n: 540 },
  { nombre: "Bolero", n: 480 },
  { nombre: "Muro", n: 420 },
  { nombre: "Digital", n: 380 },
];

const NAV = ["Dashboard", "Solicitudes", "Propuestas", "Campañas", "Inventarios"];

function Marco({
  children,
  titulo,
  className,
}: {
  children: React.ReactNode;
  titulo: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#180c24] shadow-[0_40px_120px_-30px_rgba(99,42,148,0.7)] ring-1 ring-black",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate font-mono text-[11px] text-texto-tenue">
          {titulo}
        </span>
      </div>
      {children}
      <figcaption className="sr-only">
        Ilustración de la plataforma QEB con datos de ejemplo.
      </figcaption>
    </figure>
  );
}

/** Dashboard de inventario. Visual principal de la portada. */
export function PanelDemo({ className }: { className?: string }) {
  const max = Math.max(...MUEBLES.map((m) => m.n));
  return (
    <Marco titulo="QEB · Dashboard / Resumen de inventario" className={className}>
      <div className="flex">
        <aside className="hidden w-40 shrink-0 border-r border-white/5 p-3 sm:block">
          <ul className="space-y-1">
            {NAV.map((n, i) => (
              <li
                key={n}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs",
                  i === 0
                    ? "degradado-marca font-semibold text-white"
                    : "text-texto-tenue",
                )}
              >
                {n}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 space-y-3 p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">Resumen de inventario</p>
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-texto-tenue">
              Cat. 19 · 14–27 sep
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {KPIS.map((k, i) => (
              <div
                key={k.etiqueta}
                className={cn(
                  "rounded-xl border border-white/5 bg-white/[0.03] p-2.5",
                  i > 2 && "hidden sm:block",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", k.color)} />
                  <span className="truncate text-[9px] uppercase tracking-wider text-texto-tenue">
                    {k.etiqueta}
                  </span>
                </div>
                <p className="mt-1.5 text-xl font-light tabular-nums text-white">
                  {k.valor}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-wider text-texto-tenue">
                Por mueble
              </p>
              <ul className="mt-3 space-y-2">
                {MUEBLES.map((m) => (
                  <li key={m.nombre} className="flex items-center gap-2">
                    <span className="w-20 shrink-0 truncate text-[10px] text-texto-tenue">
                      {m.nombre}
                    </span>
                    <span className="h-2 flex-1 rounded-full bg-white/5">
                      <span
                        className="block h-full rounded-full degradado-marca"
                        style={{ width: `${(m.n / max) * 100}%` }}
                      />
                    </span>
                    <span className="w-9 text-right font-mono text-[10px] tabular-nums text-texto">
                      {m.n.toLocaleString("es-MX")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-estado-espera/40 bg-estado-espera/10 p-3">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-estado-espera">
                  <span className="size-1.5 animate-pulse rounded-full bg-estado-espera" />
                  Conflicto detectado
                </p>
                <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-texto">
                  Parabus042A
                </p>
                <p className="text-[10px] leading-relaxed text-texto-tenue">
                  En 2 propuestas para la Cat. 20. Se bloquea antes de venderse
                  dos veces.
                </p>
              </div>
              <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <p className="text-[10px] uppercase tracking-wider text-texto-tenue">
                  Ocupación por catorcena
                </p>
                <div className="mt-3 flex h-16 items-end gap-1">
                  {[62, 70, 74, 81, 78, 86, 90, 83, 88, 94].map((v, i) => (
                    <span
                      key={i}
                      className="latido flex-1 rounded-sm degradado-marca"
                      style={{
                        height: `${v}%`,
                        animationDelay: `${i * 0.18}s`,
                        opacity: 0.45 + i * 0.055,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Marco>
  );
}

/** Solicitud → Propuesta → Campaña con los colores de estado del manual. */
export function Embudo() {
  const etapas = [
    {
      n: "01",
      nombre: "Solicitud",
      color: "bg-estado-espera",
      anillo: "border-estado-espera/50",
      texto:
        "Se levanta la necesidad del anunciante: plazas, formatos, fechas y presupuesto. Nada se pierde en un correo.",
      dato: "Plazas · formatos · catorcenas · presupuesto",
    },
    {
      n: "02",
      nombre: "Propuesta",
      color: "bg-estado-propuesta",
      anillo: "border-estado-propuesta/50",
      texto:
        "Se arma con inventario disponible, tarifas y vigencias. Puede tener varias versiones sin perder el rastro de ninguna.",
      dato: "Inventario · tarifas · versiones",
    },
    {
      n: "03",
      nombre: "Campaña",
      color: "bg-estado-campana",
      anillo: "border-estado-campana/60",
      texto:
        "La propuesta cerrada se vuelve venta: reserva el inventario y arranca la operación de montaje, artes y evidencias.",
      dato: "Reserva · montaje · versionario · testigos",
    },
  ];
  return (
    <ol className="grid gap-4 lg:grid-cols-3">
      {etapas.map((e, i) => (
        <li
          key={e.nombre}
          className={cn(
            "relative rounded-3xl border bg-tinta p-7 md:p-8",
            e.anillo,
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.2em] text-texto-tenue">
              {e.n}
            </span>
            <span className={cn("h-2 w-10 rounded-full", e.color)} />
          </div>
          <h3 className="mt-6 text-3xl font-bold text-white md:text-4xl">
            {e.nombre}
          </h3>
          <p className="mt-3 leading-relaxed text-texto-tenue">{e.texto}</p>
          <p className="mt-6 border-t border-linea pt-4 font-mono text-[11px] uppercase tracking-wider text-texto">
            {e.dato}
          </p>
          {i < etapas.length - 1 ? (
            <span
              aria-hidden
              className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-linea bg-negro text-xs text-rosa lg:flex"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/**
 * Tira de catorcenas con ocupación de una cara y un conflicto marcado.
 *
 * Los códigos de inventario de ejemplo siguen el formato genérico
 * Formato + número + cara (Parabus042A, Espectacular101A). No usar la
 * nomenclatura de IMU ({code}_{Flujo|Contraflujo}_{Plaza}).
 */
export function TiraCatorcenas() {
  const cats = [
    { c: 17, e: "campana" },
    { c: 18, e: "campana" },
    { c: 19, e: "campana" },
    { c: 20, e: "conflicto" },
    { c: 21, e: "propuesta" },
    { c: 22, e: "propuesta" },
    { c: 23, e: "libre" },
    { c: 24, e: "libre" },
  ] as const;
  const estilos = {
    campana: "bg-estado-campana",
    propuesta: "bg-estado-propuesta/70",
    libre: "bg-white/5 border border-dashed border-white/15",
    conflicto:
      "bg-[repeating-linear-gradient(135deg,#f5a524_0_6px,#6d4bd8_6px_12px)]",
  };
  return (
    <Marco titulo="Inventarios · Parabus042A">
      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-texto-tenue">
          <span>
            Parabús · Cara <b className="font-semibold text-texto">A</b>
          </span>
          <span>Plaza Monterrey</span>
          <span>1.21 × 1.77 m</span>
        </div>
        <div className="grid grid-cols-8 gap-1.5">
          {cats.map((k) => (
            <div key={k.c} className="space-y-1.5">
              <div className={cn("h-12 rounded-md", estilos[k.e])} />
              <p className="text-center font-mono text-[10px] text-texto-tenue">
                C{k.c}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-[11px] text-texto-tenue">
          <Leyenda color="bg-estado-campana">Campaña</Leyenda>
          <Leyenda color="bg-estado-propuesta/70">Propuesta</Leyenda>
          <Leyenda color="bg-estado-espera">Conflicto</Leyenda>
          <Leyenda color="bg-white/10">Disponible</Leyenda>
        </div>
      </div>
    </Marco>
  );
}

function Leyenda({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", color)} />
      {children}
    </span>
  );
}

/** Versionario: qué arte va en cada cara. */
export function Versionario() {
  const filas = [
    { cara: "Parabus042A", version: "V3 · Temporada otoño", estado: "Aprobada" },
    { cara: "Parabus042B", version: "V3 · Temporada otoño", estado: "Aprobada" },
    { cara: "Mupi210A", version: "V2 · Lanzamiento", estado: "En revisión" },
    { cara: "Espectacular101A", version: "V4 · Promoción", estado: "Instalada" },
  ];
  const tono: Record<string, string> = {
    Aprobada: "text-estado-activo border-estado-activo/40",
    "En revisión": "text-estado-espera border-estado-espera/40",
    Instalada: "text-rosa border-rosa/40",
  };
  return (
    <Marco titulo="Campañas · Versionario">
      <ul className="divide-y divide-white/5">
        {filas.map((f) => (
          <li
            key={f.cara}
            className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] text-texto">{f.cara}</p>
              <p className="mt-0.5 text-xs text-texto-tenue">{f.version}</p>
            </div>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] font-semibold",
                tono[f.estado],
              )}
            >
              {f.estado}
            </span>
          </li>
        ))}
      </ul>
    </Marco>
  );
}

/** Mapa de calor de afluencia por zona (Geo Behavior). */
export function MapaAfluencia() {
  // Rejilla 8×5 con intensidad 0–1. Pasillo central y accesos más altos.
  const zonas = [
    [0.2, 0.3, 0.5, 0.9, 0.9, 0.5, 0.3, 0.2],
    [0.1, 0.3, 0.6, 0.8, 0.85, 0.6, 0.35, 0.15],
    [0.15, 0.4, 0.7, 1, 0.95, 0.7, 0.45, 0.2],
    [0.1, 0.25, 0.5, 0.75, 0.7, 0.55, 0.3, 0.1],
    [0.3, 0.2, 0.35, 0.6, 0.65, 0.4, 0.25, 0.35],
  ];
  return (
    <Marco titulo="Geo Behavior Indoor · Afluencia por zona">
      <div className="p-5">
        <div className="grid grid-cols-8 gap-1">
          {zonas.flat().map((v, i) => (
            <div
              key={i}
              className="aspect-square rounded-[4px]"
              style={{
                background:
                  v > 0.7
                    ? `rgba(229,154,211,${v})`
                    : v > 0.4
                      ? `rgba(135,40,107,${v + 0.2})`
                      : `rgba(99,42,148,${v + 0.15})`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-texto-tenue">
          <span>Bajo flujo</span>
          <span className="mx-3 h-1.5 flex-1 rounded-full bg-gradient-to-r from-purpura-marca via-violeta to-rosa" />
          <span>Alto flujo</span>
        </div>
      </div>
    </Marco>
  );
}

/** Tablero de analítica WiFi. */
export function PanelWifi() {
  const horas = [18, 22, 30, 46, 62, 74, 88, 80, 66, 58, 70, 84, 92, 76, 50, 34];
  return (
    <Marco titulo="WiFi Inteligente · Analítica de visitantes">
      <div className="grid grid-cols-3 gap-2 p-4">
        {[
          { e: "Visitantes", v: "12,480" },
          { e: "Recurrentes", v: "38%" },
          { e: "Estancia media", v: "27 min" },
        ].map((k) => (
          <div key={k.e} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
            <p className="truncate text-[9px] uppercase tracking-wider text-texto-tenue">
              {k.e}
            </p>
            <p className="mt-1 text-xl font-light text-white">{k.v}</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-5">
        <p className="text-[10px] uppercase tracking-wider text-texto-tenue">
          Tráfico por hora
        </p>
        <div className="mt-3 flex h-24 items-end gap-1">
          {horas.map((h, i) => (
            <span
              key={i}
              className="latido flex-1 rounded-t-sm degradado-marca"
              style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] text-texto-tenue">
          <span>07:00</span>
          <span>14:00</span>
          <span>22:00</span>
        </div>
      </div>
    </Marco>
  );
}

/* ------------------------------------------------------------------------ */
/* QEB Inteligencia. Datos de ejemplo, coherentes entre sí:                  */
/* embudo 120 → 92 → 62 (conversión 51.7 %), ventas por catorcena contra     */
/* el año anterior y un objetivo repartido entre asesores genéricos.         */
/* ------------------------------------------------------------------------ */

const CATORCENAS_VENTA = [
  { c: "C13", real: 58, anterior: 52 },
  { c: "C14", real: 64, anterior: 55 },
  { c: "C15", real: 61, anterior: 60 },
  { c: "C16", real: 72, anterior: 63 },
  { c: "C17", real: 70, anterior: 66 },
  { c: "C18", real: 81, anterior: 68 },
  { c: "C19", real: 86, anterior: 71 },
];

/** Tablero principal de inteligencia: KPIs, ventas vs. año anterior, embudo. */
export function PanelInteligencia({ className }: { className?: string }) {
  const max = 90;
  return (
    <Marco titulo="QEB Inteligencia · Resumen de ventas" className={className}>
      <div className="space-y-3 p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { e: "Venta acumulada", v: "$48.6 M", n: "+7.9 % vs. año ant.", c: "text-estado-activo" },
            { e: "Avance vs. objetivo", v: "71.5 %", n: "Meta anual $68 M", c: "text-rosa" },
            { e: "Conversión", v: "51.7 %", n: "Solicitud → campaña", c: "text-estado-espera" },
            { e: "Ciclo de venta", v: "24 días", n: "Solicitud → campaña", c: "text-lila" },
          ].map((k, i) => (
            <div
              key={k.e}
              className={cn(
                "rounded-xl border border-white/5 bg-white/[0.03] p-2.5",
                i > 1 && "hidden sm:block",
              )}
            >
              <p className="truncate text-[9px] uppercase tracking-wider text-texto-tenue">{k.e}</p>
              <p className="mt-1 text-xl font-light tabular-nums text-white">{k.v}</p>
              <p className={cn("truncate text-[9px]", k.c)}>{k.n}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider text-texto-tenue">
                Venta por catorcena
              </p>
              <div className="flex gap-3 text-[9px] text-texto-tenue">
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-rosa" /> Real
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-white/25" /> Año anterior
                </span>
              </div>
            </div>
            <div className="mt-3 flex h-28 items-end gap-2">
              {CATORCENAS_VENTA.map((k, i) => (
                <div key={k.c} className="flex h-full flex-1 flex-col justify-end">
                  <div className="flex h-full items-end gap-0.5">
                    <span
                      className="flex-1 rounded-t-sm bg-white/15"
                      style={{ height: `${(k.anterior / max) * 100}%` }}
                    />
                    <span
                      className="latido flex-1 rounded-t-sm degradado-marca"
                      style={{ height: `${(k.real / max) * 100}%`, animationDelay: `${i * 0.2}s` }}
                    />
                  </div>
                  <p className="mt-1 text-center font-mono text-[9px] text-texto-tenue">{k.c}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-wider text-texto-tenue">
              Embudo de conversión
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { e: "Solicitudes", n: 120, c: "bg-estado-espera" },
                { e: "Propuestas", n: 92, c: "bg-estado-propuesta" },
                { e: "Campañas", n: 62, c: "bg-estado-campana" },
              ].map((f) => (
                <li key={f.e}>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-texto-tenue">{f.e}</span>
                    <span className="font-mono tabular-nums text-texto">{f.n}</span>
                  </div>
                  <span className="mt-1 block h-2 rounded-full bg-white/5">
                    <span
                      className={cn("block h-full rounded-full", f.c)}
                      style={{ width: `${(f.n / 120) * 100}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-white/5 pt-2 text-[10px] leading-relaxed text-texto-tenue">
              Sólo las campañas cerradas cuentan como venta.
            </p>
          </div>
        </div>
      </div>
    </Marco>
  );
}

/** Objetivo anual repartido entre asesores, con avance de cada uno. */
export function ObjetivosAsesores() {
  const asesores = [
    { n: "Asesor A", meta: 14.3, real: 11.2 },
    { n: "Asesor B", meta: 13.6, real: 10.4 },
    { n: "Asesor C", meta: 12.2, real: 8.1 },
    { n: "Asesor D", meta: 10.9, real: 8.3 },
    { n: "Asesor E", meta: 9.5, real: 5.6 },
    { n: "Asesor F", meta: 7.5, real: 5.0 },
  ];
  return (
    <Marco titulo="QEB Inteligencia · Objetivos">
      <div className="p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-white">Objetivo anual $68 M</p>
          <p className="text-[11px] text-estado-activo">Reparto 100 % · cuadra ✓</p>
        </div>
        <ul className="mt-4 space-y-3">
          {asesores.map((a) => {
            const avance = (a.real / a.meta) * 100;
            return (
              <li key={a.n}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-texto">{a.n}</span>
                  <span className="font-mono tabular-nums text-texto-tenue">
                    ${a.real} M / ${a.meta} M ·{" "}
                    <b className={avance >= 75 ? "text-estado-activo" : "text-estado-espera"}>
                      {avance.toFixed(0)} %
                    </b>
                  </span>
                </div>
                <span className="mt-1 block h-2 rounded-full bg-white/5">
                  <span
                    className="block h-full rounded-full degradado-marca"
                    style={{ width: `${avance}%` }}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Marco>
  );
}

/** Historial de ediciones que movieron la venta de campañas ya cerradas. */
export function HistorialVariaciones() {
  const filas = [
    { id: "CMP-0412", campo: "Caras", cambio: "6 → 9", delta: "+$27,000", sube: true },
    { id: "CMP-0388", campo: "Tarifa", cambio: "24 k → 22.5 k", delta: "−$9,000", sube: false },
    { id: "CMP-0371", campo: "Caras", cambio: "5 → 7", delta: "+$26,000", sube: true },
    { id: "CMP-0359", campo: "Caras", cambio: "10 → 6", delta: "−$36,000", sube: false },
  ];
  return (
    <Marco titulo="QEB Inteligencia · Variaciones e impacto">
      <div className="grid grid-cols-3 gap-2 p-4">
        {[
          { e: "Alzas", v: "+$2.1 M", c: "text-estado-activo" },
          { e: "Bajas", v: "−$1.8 M", c: "text-estado-espera" },
          { e: "Variación neta", v: "+$0.3 M", c: "text-white" },
        ].map((k) => (
          <div key={k.e} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
            <p className="text-[9px] uppercase tracking-wider text-texto-tenue">{k.e}</p>
            <p className={cn("mt-1 text-xl font-light", k.c)}>{k.v}</p>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-white/5 border-t border-white/5">
        {filas.map((f) => (
          <li key={f.id + f.cambio} className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 py-3 sm:grid-cols-[1fr_1fr_auto]">
            <span className="font-mono text-[11px] text-texto">{f.id}</span>
            <span className="hidden text-[11px] text-texto-tenue sm:block">
              {f.campo} · {f.cambio}
            </span>
            <span
              className={cn(
                "text-right font-mono text-[11px] font-semibold",
                f.sube ? "text-estado-activo" : "text-estado-espera",
              )}
            >
              {f.delta}
            </span>
          </li>
        ))}
      </ul>
    </Marco>
  );
}

/** Mapa de ocupación: caras (filas) por catorcena (columnas). */
export function MapaOcupacion() {
  // Cada fila es una cara; 1 = vendida, 0 = libre. Patrones distintos para
  // que se lean zonas que rinden y zonas subutilizadas.
  const filas = [
    { z: "Av. Reforma", o: [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1] },
    { z: "Periférico", o: [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1] },
    { z: "Av. Vallarta", o: [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0] },
    { z: "Garza Sada", o: [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1] },
    { z: "Av. Itzáes", o: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0] },
    { z: "Blvd. 5 de Mayo", o: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
  ];
  return (
    <Marco titulo="QEB Inteligencia · Ocupación por zona × catorcena">
      <div className="space-y-2 p-5">
        {filas.map((f) => {
          const pct = Math.round((f.o.reduce((a, b) => a + b, 0) / f.o.length) * 100);
          return (
            <div key={f.z} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3">
              <span className="truncate text-[11px] text-texto-tenue">{f.z}</span>
              <div className="grid grid-cols-12 gap-1">
                {f.o.map((v, i) => (
                  <span
                    key={i}
                    className={cn("h-4 rounded-[3px]", v ? "degradado-marca" : "bg-white/[0.06]")}
                  />
                ))}
              </div>
              <span
                className={cn(
                  "text-right font-mono text-[11px] tabular-nums",
                  pct >= 70 ? "text-estado-activo" : pct < 45 ? "text-estado-espera" : "text-texto",
                )}
              >
                {pct}%
              </span>
            </div>
          );
        })}
        <div className="flex flex-wrap gap-4 pt-3 text-[11px] text-texto-tenue">
          <Leyenda color="degradado-marca">Vendida</Leyenda>
          <Leyenda color="bg-white/10">Libre</Leyenda>
          <span className="text-estado-espera">&lt; 45 % subutilizada</span>
        </div>
      </div>
    </Marco>
  );
}
