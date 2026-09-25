import { useId } from "react";
import { cn } from "@qebooh/ui";

/**
 * La onda del imagotipo QEB, trazada en vector a partir del archivo oficial
 * (Brending/logo/imagotipo.png, 1080 × 1080, fondo transparente). Las
 * coordenadas son las del PNG: línea de entrada, cinco vueltas de radio 33,
 * curvas de 55 y 75 en los extremos, trazo de 37 px. No se deforma: sólo se
 * escala, y opcionalmente se alargan las colas horizontales.
 *
 * Sin fondo detrás: es un trazo, nunca una imagen con fondo sólido.
 */

const Y = 595.5; // línea base
const GROSOR = 37;

function trazo(cola: number) {
  const inicio = 217 - cola;
  const fin = 864 + cola;
  return [
    `M ${inicio} ${Y} H 276.5`,
    "A 55 55 0 0 0 331.5 540.5",
    "V 518.5 A 33 33 0 0 1 397.5 518.5",
    "V 678.5 A 33 33 0 0 0 463.5 678.5",
    "V 391.5 A 33 33 0 0 1 529.5 391.5",
    "V 821.5 A 33 33 0 0 0 595.5 821.5",
    "V 257.5 A 33 33 0 0 1 661.5 257.5",
    "V 520 A 75.5 75.5 0 0 0 737 595.5",
    `H ${fin}`,
  ].join(" ");
}

type OndaProps = {
  /**
   * `linea` es la onda con el degradado del logotipo. `tubo` es la misma onda
   * en lila translúcido, como en las presentaciones, para usar grande y de
   * fondo.
   */
  variante?: "linea" | "tubo";
  /** Alarga las colas horizontales (en px del original), p. ej. para que la
   *  onda salga del borde como en las portadas de las presentaciones. */
  cola?: number;
  animada?: boolean;
  className?: string;
};

export function Onda({
  variante = "linea",
  cola = 0,
  animada = false,
  className,
}: OndaProps) {
  const id = useId().replace(/:/g, "");
  const m = GROSOR / 2;
  const x0 = 217 - cola - m;
  const ancho = 864 + cola + m - x0;
  const y0 = 205;
  const alto = 875 - y0;

  return (
    <svg
      viewBox={`${x0} ${y0} ${ancho} ${alto}`}
      className={cn("overflow-visible", className)}
      aria-hidden
      fill="none"
    >
      <defs>
        {variante === "tubo" ? (
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e7c4f7" />
            <stop offset="0.5" stopColor="#c9a6f5" />
            <stop offset="1" stopColor="#a996f2" />
          </linearGradient>
        ) : (
          // Degradado medido en el imagotipo oficial.
          <linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            x1={217}
            x2={864}
            y1={0}
            y2={0}
          >
            <stop offset="0" stopColor="#a5358a" />
            <stop offset="0.5" stopColor="#8a3f92" />
            <stop offset="1" stopColor="#6a4c9a" />
          </linearGradient>
        )}
      </defs>
      <path
        d={trazo(cola)}
        stroke={`url(#${id})`}
        strokeWidth={GROSOR}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={variante === "tubo" ? 0.55 : 1}
        pathLength={2000}
        className={animada ? "onda-animada" : undefined}
      />
    </svg>
  );
}
