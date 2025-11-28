"use client";
import { useState } from "react";
import CardLojas from "./cardLojas";
import { lojasMock } from "@/mock/lojasMock";
import { useDragScroll } from "@/components/hooks/useDragScroll";
import FiltroCategoria from "@/components/filtros/filtroCategoria";
import { categoriesData } from "@/mock/categoriasMock";

const CarrosselLojas = () => {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);

  const lojasFiltradas =
    categoriasSelecionadas.length > 0
      ? lojasMock.filter((loja) => categoriasSelecionadas.includes(loja.categoria.toLowerCase()))
      : lojasMock;

  const {
    carrosselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  return (
    <section className="w-full px-6 py-8">

      <div className="relative w-full mb-4 z-20">
        <h2 className="text-3xl font-semibold md:text-5xl text-black">Lojas</h2>


        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <FiltroCategoria
            items={categoriesData}
            onFilterChange={setCategoriasSelecionadas}
            className="md:w-80"
          />
        </div>
      </div>

      {/* Carrossel */}
      <div
        ref={carrosselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-8 overflow-x-scroll overflow-y-visible cursor-grab select-none scroll-smooth sem-barra mt-6"
      >
        {lojasFiltradas.length > 0 ? (
          lojasFiltradas.map((loja) => (
            <CardLojas key={loja.id} id={loja.id} nome={loja.nome} stickerLoja={loja.stickerLoja} categoria={loja.categoria} />
          ))
        ) : (
          <p className="text-gray-500">Nenhuma loja nessa categoria.</p>
        )}
      </div>
    </section>
  );
};

export default CarrosselLojas;
