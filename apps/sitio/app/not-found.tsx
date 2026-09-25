import { Boton, Contenedor } from "@/components/bloques";
import { Onda } from "@/components/onda";

export default function NoEncontrada() {
  return (
    <Contenedor className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <Onda className="h-28 w-28" />
      <h1 className="mt-10 text-5xl font-bold text-white md:text-7xl">
        Esta cara está libre.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-texto-tenue">
        No encontramos la página que buscas. Puede que se haya movido al
        estrenar el sitio.
      </p>
      <Boton href="/" className="mt-10">
        Volver al inicio
      </Boton>
    </Contenedor>
  );
}
