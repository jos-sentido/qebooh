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
  /** Fondo oscuro para cortar el ritmo entre bloques claros. */
  tone?: "paper" | "dim" | "ink";
} & Omit<ComponentPropsWithoutRef<"section">, "as">;

const TONES = {
  paper: "bg-paper text-ink-900",
  dim: "bg-paper-dim text-ink-900",
  ink: "bg-ink-950 text-paper",
} as const;

export function Section({
  children,
  as: Tag = "section",
  tone = "paper",
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
        "font-mono text-xs uppercase tracking-[0.2em] text-signal-500",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
