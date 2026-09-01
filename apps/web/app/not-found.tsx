import Link from "next/link";
import { Container, Eyebrow, Section } from "@qebooh/ui";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-titulo">
          Esta página no existe
        </h1>
        <p className="mt-4 text-texto-tenue">
          El enlace puede estar mal escrito, o la propuesta se movió.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </Container>
    </Section>
  );
}
