import Image from "next/image";
import { cn } from "@qebooh/ui";

/**
 * Logotipo oficial (versión blanca para fondo oscuro), tal cual viene del
 * manual: no se recolorea ni se deforma. Incluye el descriptor "OOH
 * Management" en menor tamaño; en texto corrido la marca es QEB a secas.
 */
export function LogoQeb({
  className,
  prioridad = false,
}: {
  className?: string;
  prioridad?: boolean;
}) {
  return (
    <Image
      src="/marca/logo-qeb-blanco.png"
      alt="QEB"
      width={438}
      height={187}
      priority={prioridad}
      className={cn("h-9 w-auto", className)}
    />
  );
}
