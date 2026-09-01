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
    default: "QEB OOH",
    template: "%s · QEB OOH",
  },
  description:
    "Publicidad exterior: circuitos, propuestas a cliente y herramientas internas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <header className="border-b border-ink-900/10">
          <Container
            width="wide"
            className="flex h-16 items-center justify-between"
          >
            <Link href="/" aria-label="QEB OOH — inicio">
              <Logo />
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/propuestas"
                className="text-ink-700 transition-colors hover:text-ink-900"
              >
                Propuestas
              </Link>
            </nav>
          </Container>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-ink-900/10 py-10">
          <Container
            width="wide"
            className="flex flex-col gap-2 text-sm text-ink-500 md:flex-row md:items-center md:justify-between"
          >
            <Logo className="text-ink-900" />
            <p>© {new Date().getFullYear()} QEB OOH</p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
