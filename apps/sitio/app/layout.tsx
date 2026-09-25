import type { Metadata, Viewport } from "next";
import { Barlow, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Encabezado } from "@/components/encabezado";
import { Pie } from "@/components/pie";
import { DESCRIPCION, INDEXAR, SITIO_URL } from "@/lib/sitio";
import "./globals.css";

// Titulares: RF Dewi Extended (Russian Fonts), la tipografía de titulares
// del manual. Los .woff2 vienen de Brending/tipografias/font en Dropbox.
const display = localFont({
  src: [
    { path: "./fuentes/RFDewiExtended-Regular.woff2", weight: "400" },
    { path: "./fuentes/RFDewiExtended-Semibold.woff2", weight: "600" },
    { path: "./fuentes/RFDewiExtended-Bold.woff2", weight: "700" },
    { path: "./fuentes/RFDewiExtended-Ultrabold.woff2", weight: "800" },
    { path: "./fuentes/RFDewiExtended-Black.woff2", weight: "900" },
  ],
  variable: "--font-qeb-display",
  display: "swap",
});

// Cuerpo: Barlow, como en el manual y las presentaciones.
const sans = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    default: "QEB — Gestión de negocio para publicidad exterior (OOH)",
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
  themeColor: "#0d0814",
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
