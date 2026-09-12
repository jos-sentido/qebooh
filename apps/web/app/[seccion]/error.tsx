"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@qebooh/ui";

/**
 * Frontera de error para el índice y las publicaciones de una sección.
 *
 * Estas páginas consultan el estado en base de datos en cada visita (para no
 * revivir un enlace retirado). Si esa lectura falla —la base no responde, por
 * ejemplo— la página lanza. Sin esta frontera, Next devuelve un 500 en blanco.
 *
 * Aquí se falla cerrado: no se muestra el contenido que no se pudo verificar,
 * pero con una página con la identidad de QEB y un botón para reintentar. El
 * detalle del error queda en los logs del servidor, no en pantalla.
 */
export default function ErrorSeccion({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container>
        <Eyebrow>No disponible</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-titulo">
          Esto no cargó por el momento
        </h1>
        <p className="mt-4 max-w-2xl text-texto-tenue">
          Tuvimos un problema temporal para preparar esta página. No es un
          enlace roto: vuelve a intentarlo en unos segundos.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-md bg-marca-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-marca-400"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="text-sm font-medium underline underline-offset-4"
          >
            Volver al inicio
          </Link>
        </div>
      </Container>
    </Section>
  );
}
