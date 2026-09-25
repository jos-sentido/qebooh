/**
 * Elementos gráficos de la marca QEB, tomados de las presentaciones y del
 * manual 2024. Todos son decorativos (aria-hidden) salvo BarraTitulo.
 */

import { useId, type ReactNode } from "react";
import { cn } from "@qebooh/ui";

/**
 * Retícula de cruces "+" con un leve desfase cromático (magenta y cian), como
 * en las piezas de marca: enmarca fotos de producto, fondos de posts y la
 * playera. Es el elemento de fondo del sitio; no usar líneas onduladas
 * delgadas, que no son parte del estilo QEB.
 */
export function Cruces({
  className,
  paso = 88,
  tamano = 14,
}: {
  className?: string;
  /** Distancia entre cruces, en px. */
  paso?: number;
  /** Largo de cada brazo de la cruz, en px. */
  tamano?: number;
}) {
  const id = useId().replace(/:/g, "");
  const c = paso / 2;
  const h = tamano / 2;
  const cruz = `M ${c - h} ${c} H ${c + h} M ${c} ${c - h} V ${c + h}`;
  return (
    <svg aria-hidden className={cn("pointer-events-none", className)}>
      <defs>
        <pattern id={id} width={paso} height={paso} patternUnits="userSpaceOnUse">
          <path d={cruz} stroke="#e04fd8" strokeWidth={2} transform="translate(-1.5 0)" opacity={0.8} />
          <path d={cruz} stroke="#5accea" strokeWidth={2} transform="translate(1.5 0)" opacity={0.8} />
          <path d={cruz} stroke="#ffffff" strokeWidth={2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Barra de título: texto blanco en mayúsculas sobre bloque de degradado
 * ("ACTIVIDADES CLAVE", "PUNTOS CLAVE" en las presentaciones).
 */
export function BarraTitulo({
  children,
  className,
  como: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  como?: "p" | "span" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "inline-block degradado-marca px-3 py-1 font-display text-xs font-extrabold uppercase tracking-[0.08em] text-white md:text-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Orbe de vidrio iridiscente con una barra que lo cruza (láminas
 * "INTRODUCCIÓN", "USUARIOS Y ROLES").
 */
export function Orbe({
  etiqueta,
  className,
}: {
  etiqueta?: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-full vidrio-iridiscente shadow-[0_40px_120px_-30px_rgba(156,96,240,0.8)]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_45%)]" />
      </div>
      {etiqueta ? (
        <span className="absolute left-[-6%] right-[-6%] top-1/2 -translate-y-1/2 degradado-marca py-2 text-center font-display text-sm font-extrabold uppercase tracking-[0.06em] text-white md:text-base">
          {etiqueta}
        </span>
      ) : null}
    </div>
  );
}

/** Tipos de ícono del manual (lámina de iconografía) y de producto. */
export type TipoIcono =
  | "inventario"
  | "propuesta"
  | "campana"
  | "calendario"
  | "analisis"
  | "panel"
  | "objetivo"
  | "ubicacion"
  | "pantalla"
  | "wifi";

const TRAZOS: Record<TipoIcono, ReactNode> = {
  inventario: (
    <>
      <rect x="6" y="4" width="12" height="13" rx="1.5" />
      <path d="M12 17v4M8 21h8M9 8h6M9 11h6" />
    </>
  ),
  propuesta: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 15h5" />
    </>
  ),
  campana: (
    <>
      <path d="M4 10v4h3l7 4V6l-7 4z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
    </>
  ),
  calendario: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4M8 14h2M12 14h2M16 14h0" />
    </>
  ),
  analisis: (
    <>
      <path d="M5 20V12M10 20V6M15 20v-9M20 20V4" />
    </>
  ),
  panel: (
    <>
      <rect x="4" y="4" width="7" height="9" rx="1.5" />
      <rect x="13" y="4" width="7" height="5" rx="1.5" />
      <rect x="13" y="11" width="7" height="9" rx="1.5" />
      <rect x="4" y="15" width="7" height="5" rx="1.5" />
    </>
  ),
  objetivo: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12l6-6M16 6h2v2" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  pantalla: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M10 9l4 2-4 2zM9 21h6M12 17v4" />
    </>
  ),
  wifi: (
    <>
      <path d="M4 10a12 12 0 0 1 16 0M7 13.5a7.5 7.5 0 0 1 10 0M10 17a3 3 0 0 1 4 0" />
      <circle cx="12" cy="20" r="0.8" />
    </>
  ),
};

/** Ícono blanco dentro de círculo con degradado (lámina de iconografía). */
export function IconoCirculo({
  tipo,
  tamano = "md",
  className,
}: {
  tipo: TipoIcono;
  tamano?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = { sm: "size-9", md: "size-12", lg: "size-16" }[tamano];
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full degradado-logo shadow-[inset_0_2px_6px_rgba(255,255,255,0.35),0_8px_24px_-8px_rgba(135,40,107,0.9)] ring-1 ring-white/15",
        dim,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[52%]"
        fill="none"
        stroke="white"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {TRAZOS[tipo]}
      </svg>
    </span>
  );
}
