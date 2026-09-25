import type { Metadata, Viewport } from "next";
import { Archivo, Barlow, IBM_Plex_Mono } from "next/font/google";
import { Encabezado } from "@/components/encabezado";
import { Pie } from "@/components/pie";
import { DESCRIPCION, INDEXAR, SITIO_URL } from "@/lib/sitio";
import "./globals.css";

// Titulares: el manual usa RF Dewi Extended (Rostype). Mientras no esté
// disponible como webfont en el repo, Archivo en su ancho expandido (eje
// wdth 125) reproduce la misma familia de formas: extendida y pesada.
// Para cambiar a RF Dewi: next/font/local con los .woff2 de la carpeta
// Brending/tipografias/font y la misma variable --font-qeb-display.
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
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
