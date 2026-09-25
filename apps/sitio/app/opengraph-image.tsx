import { ImageResponse } from "next/og";

export const alt = "QEB — Gestión de negocio para publicidad exterior";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Imagen() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, #632a94 0%, transparent 45%), radial-gradient(circle at 60% 110%, #87286b 0%, transparent 50%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>qeb</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            Todo tu negocio OOH,
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2, color: "#e59ad3" }}>
            en un solo lugar.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#b9b3c9" }}>
            QEB Operación + QEB Inteligencia, conectados en tiempo real.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
