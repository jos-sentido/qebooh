import { cn } from "./cn";

type LogoProps = {
  className?: string;
};

/**
 * Marca denominativa QEB.
 *
 * El nombre es QEB; "OOH" es un complemento descriptivo, por eso va en menor
 * tamaño y peso. No es parte del nombre: en texto corrido se escribe QEB a
 * secas (ver CLAUDE.md §6).
 *
 * Es texto, no una imagen, para que escale limpio y siga siendo legible por
 * lectores de pantalla. Sustituir por el logotipo oficial cuando esté
 * disponible en SVG.
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
