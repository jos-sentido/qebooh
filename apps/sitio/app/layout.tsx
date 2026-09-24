import type { Metadata, Viewport } from "next";
import { Barlow, IBM_Plex_Mono, Mulish } from "next/font/google";
import { Encabezado } from "@/components/encabezado";
import { Pie } from "@/components/pie";
import { DESCRIPCION, INDEXAR, SITIO_URL } from "@/lib/sitio";
import "./globals.css";

// Manual 2024: Barlow en titulares y Brandon Text en cuerpo. Brandon es de
// pago; Mulish es la alternativa libre más cercana en proporciones.
const display = Barlow({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-qeb-display",
  display: "swap",
});

const sans = Mulish({
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
  metadataBase: new URL(SITIO_URL),
  title: {
    default: "QEB — Software de gestión de publicidad exterior (OOH)",
    template: "%s · QEB",
  },
  description: DESCRIPCION,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "QEB",
  },
  alternates: { canonical: "/" },
  robots: INDEXAR ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-MX"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-negro"
        >
          Saltar al contenido
        </a>
        <Encabezado />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Pie />
      </body>
    </html>
  );
}
