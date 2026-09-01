import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { Container, Logo } from "@qebooh/ui";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-qeb-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-qeb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QEB",
    template: "%s · QEB",
  },
  description:
    "Plataforma de gestión de publicidad exterior: propuestas a cliente y herramientas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Barra de marca: la franja morada de la identidad QEB. */}
        <div aria-hidden className="h-1 bg-marca-500" />

        <header className="border-b border-borde">
          <Container
            width="wide"
            className="flex h-16 items-center justify-between"
          >
            <Link href="/" aria-label="QEB — inicio">
              <Logo />
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/propuestas"
                className="text-texto-tenue transition-colors hover:text-texto"
              >
                Propuestas
              </Link>
            </nav>
          </Container>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-borde py-10">
          <Container
            width="wide"
            className="flex flex-col gap-2 text-sm text-texto-tenue md:flex-row md:items-center md:justify-between"
          >
            <Logo className="text-texto" />
            <p>© {new Date().getFullYear()} QEB</p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
