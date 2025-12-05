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
          flex gap-8 mt-7 w-full max-w-7xl
          overflow-x-auto overflow-y-hidden
          cursor-grab select-none scroll-smooth sem-barra
        "
      >
        {avaliacoes.map((item, index) => (
          <div
            key={index}
            className="min-w-[90%] md:min-w-[60%] lg:min-w-[45%] bg-white rounded-xl p-8 shadow-xl text-black"
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
