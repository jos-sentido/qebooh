import { useId } from "react";
import { cn } from "@qebooh/ui";

type OndaProps = {
  /**
   * Amplitudes de cada pulso, en unidades del viewBox (alto 100, centro 50).
   * Alternan arriba y abajo, como la onda que forma la "q" del logotipo.
   */
  pulsos?: number[];
  /** Largo de la línea plana antes y después de los pulsos. */
  cola?: number;
  grosor?: number;
  animada?: boolean;
  /**
   * `linea` es el trazo del logotipo. `tubo` es la onda gruesa y translúcida
   * en lila de las presentaciones, para usar grande y de fondo.
   */
  variante?: "linea" | "tubo";
  className?: string;
};


/**
 * La onda / ecualizador del logotipo QEB, como trazo SVG. Es el elemento
 * gráfico de la marca (manual 2024, lámina de sistema de logo y patrón):
 * línea que entra plana, pulsa y vuelve a la calma — del caos al control.
 */
export function Onda({
  pulsos = [14, 22, 34, 44, 30, 18],
  cola = 60,
  grosor = 6,
  animada = false,
  variante = "linea",
  className,
}: OndaProps) {
  const id = useId().replace(/:/g, "");
  const centro = 50;
  // El radio de cada vuelta debe superar el grosor del trazo; si no, las
  // curvas se funden y el tubo se lee como una mancha.
  const RADIO = variante === "tubo" ? Math.max(7, grosor * 1.15) : 7;
  let x = cola;
  let d = `M 0 ${centro} H ${x}`;

  pulsos.forEach((amp, i) => {
    const arriba = i % 2 === 0;
    // El extremo del pulso es la cima del arco, no el final del segmento.
    const y = arriba
      ? Math.min(centro, centro - amp + RADIO)
      : Math.max(centro, centro + amp - RADIO);
    d += ` V ${y} A ${RADIO} ${RADIO} 0 0 ${arriba ? 1 : 0} ${x + RADIO * 2} ${y}`;
    x += RADIO * 2;
  });
  d += ` V ${centro} H ${x + cola}`;
  const ancho = x + cola;

  return (
    <svg
      viewBox={`${-grosor} 0 ${ancho + grosor * 2} 100`}
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
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#b8388f" />
            <stop offset="1" stopColor="#6f4bd0" />
          </linearGradient>
        )}
      </defs>
      <path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth={grosor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={variante === "tubo" ? 0.55 : 1}
        pathLength={2000}
        className={animada ? "onda-animada" : undefined}
      />
    </svg>
  );
}
