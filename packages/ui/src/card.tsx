import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

type CardProps = {
  children: ReactNode;
  /** Añade estados de hover; usar solo cuando la tarjeta es clicable. */
  interactive?: boolean;
} & ComponentPropsWithoutRef<"div">;

export function Card({
  children,
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-ink-900/10 bg-white/60 p-6",
        interactive &&
          "transition-colors hover:border-ink-900/30 hover:bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type StatProps = {
  /** Cifra ya formateada, p. ej. "1.2M" o "38%". */
  value: string;
  label: string;
  /** Aclaración opcional: metodología, periodo, fuente. */
  note?: string;
};

/** Cifra destacada para resultados de campaña o alcance de un circuito. */
export function Stat({ value, label, note }: StatProps) {
  return (
    <div>
      <p className="text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {note ? <p className="mt-1 text-xs opacity-60">{note}</p> : null}
    </div>
  );
}
