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
  className?: string;
};

const RADIO = 7;

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
  className,
}: OndaProps) {
  const id = useId().replace(/:/g, "");
  const centro = 50;
  let x = cola;
  let d = `M 0 ${centro} H ${x}`;

  pulsos.forEach((amp, i) => {
    const arriba = i % 2 === 0;
    // El extremo del pulso es la cima del arco, no el final del segmento.
    const y = arriba ? centro - amp + RADIO : centro + amp - RADIO;
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
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b8388f" />
          <stop offset="1" stopColor="#6f4bd0" />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth={grosor}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={2000}
        className={animada ? "onda-animada" : undefined}
      />
    </svg>
  );
}
