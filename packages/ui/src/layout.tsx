import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "./cn";

type ContainerProps = {
  children: ReactNode;
  /** `wide` para galerías de piezas, `narrow` para bloques de texto largo. */
  width?: "narrow" | "default" | "wide";
} & ComponentPropsWithoutRef<"div">;

const WIDTHS = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-10", WIDTHS[width], className)}
      {...props}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  as?: ElementType;
  /**
   * `fondo` es la base; `superficie` marca una banda intermedia; `marca` es el
   * bloque morado — uno o dos por página como mucho, si no deja de destacar.
   */
  tone?: "fondo" | "superficie" | "marca";
} & Omit<ComponentPropsWithoutRef<"section">, "as">;

const TONES = {
  fondo: "bg-fondo text-texto",
  superficie: "bg-superficie text-texto",
  marca: "bg-marca-700 text-white",
} as const;

export function Section({
  children,
  as: Tag = "section",
  tone = "fondo",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("py-20 md:py-28", TONES[tone], className)} {...props}>
      {children}
    </Tag>
  );
}

type EyebrowProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

/** Etiqueta corta sobre un titular. Da contexto sin competir con el título. */
export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em] text-cian",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
