import { cn } from "./cn";

type LogoProps = {
  className?: string;
};

/**
 * Marca denominativa QEB. Es texto, no una imagen, para que escale limpio y
 * siga siendo legible por lectores de pantalla. Sustituir por el logotipo
 * oficial cuando esté disponible en SVG.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 text-lg font-bold tracking-tight",
        className,
      )}
    >
      QEB
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-marca-400">
        OOH
      </span>
    </span>
  );
}
