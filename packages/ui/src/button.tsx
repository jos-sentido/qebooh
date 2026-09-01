import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-paper hover:bg-ink-800 focus-visible:outline-ink-900",
  outline:
    "border border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/[0.03] focus-visible:outline-ink-900",
  ghost: "text-ink-700 hover:text-ink-900 hover:bg-ink-900/[0.05]",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

/** Misma apariencia que Button, para navegación o descargas. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
