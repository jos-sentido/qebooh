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
        "rounded-card border border-borde bg-superficie p-6",
        interactive &&
          "transition-colors hover:border-marca-500 hover:bg-superficie-alta",
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

/**
 * Cifra destacada. Toda cifra que salga de un cruce de datos debería llevar
 * `note` con su fuente o metodología: es lo primero que pregunta el cliente.
 */
export function Stat({ value, label, note }: StatProps) {
  return (
    <div>
      <p className="text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {note ? <p className="mt-1 text-xs opacity-70">{note}</p> : null}
    </div>
  );
}
