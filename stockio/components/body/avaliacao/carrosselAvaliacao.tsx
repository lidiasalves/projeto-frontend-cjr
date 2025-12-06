"use client";

import { useDragScroll } from "@/components/hooks/useDragScroll";
import Comentario from "./cardAvaliacao";

interface Avaliacao {
  usuario: string;
  comentario: string;
  nota: number;
}

const CarrosselAvaliacoes = ({ avaliacoes }: { avaliacoes: Avaliacao[] }) => {
  const {
    carrosselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  return (
    <section className="w-full px-6 py-6 flex flex-col items-center">

      <div
        ref={carrosselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="
          flex gap-80 mt-7 w-full max-w-7xl
          overflow-x-auto overflow-y-hidden 
          cursor-grab select-none scroll-smooth sem-barra
        "
      >
        {avaliacoes.map((item, index) => (
          <div
            key={index}
            className="
              shrink-0
              w-[380px] md:w-[420px] lg:w-[460px] mx-2
            "
          >
            <Comentario
              usuario={item.usuario}
              comentario={item.comentario}
              nota={item.nota}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarrosselAvaliacoes;
