"use client";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import CardLojas from "./cardLojas";
import { useDragScroll } from "@/components/hooks/useDragScroll";
import FiltroCategoria from "@/components/filtros/filtroCategoria";
import { categoriesData } from "@/mock/categoriasMock";

interface LojaDB {
  id: number;
  nome: string;
  sticker_url: string;
  categoria: { nome: string };
}

const CarrosselLojas = () => {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [lojas, setLojas] = useState<LojaDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLojas() {
      try {
        setIsLoading(true);
        const response = await api.get("/loja");
        setLojas(response.data);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLojas();
  }, []);

  const lojasFiltradas =
    categoriasSelecionadas.length > 0
      ? lojas.filter((loja) => {
          const catLoja = loja.categoria?.nome?.toLowerCase() || "";
          const filtros = categoriasSelecionadas.map(c => c.toLowerCase());
          return filtros.includes(catLoja);
        })
      : lojas;

  const handleFilterChange = (categoriaNome: string) => {
    setCategoriasSelecionadas((prev) => {
      if (prev.includes(categoriaNome)) return prev.filter((cat) => cat !== categoriaNome);
      return [...prev, categoriaNome];
    });
  };

  const { carrosselRef, ...dragHandlers } = useDragScroll();

  return (
    <section className="w-full px-6 py-8">
      <div className="relative w-full mb-4 z-20">
        <h2 className="text-3xl font-semibold md:text-5xl text-black">Lojas</h2>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-[500px]">
          <FiltroCategoria
            categorias={categoriesData}
            categoriasSelecionadas={categoriasSelecionadas}
            onChange={handleFilterChange}
            className="w-auto"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-8 mt-6 overflow-hidden">
           {[1,2,3,4].map(i => <div key={i} className="shrink-0 w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full animate-pulse" />)}
        </div>
      ) : (
        <div
            ref={carrosselRef}
            {...dragHandlers}
            className="flex gap-8 overflow-x-auto cursor-grab select-none scroll-smooth sem-barra mt-6"
        >
            {lojasFiltradas.length > 0 ? (
                lojasFiltradas.map((loja) => (
                    <CardLojas 
                        key={loja.id} 
                        id={loja.id} 
                        nome={loja.nome} 
                        stickerLoja={loja.sticker_url || "/images/placeholder.png"} 
                        categoria={loja.categoria?.nome || "Geral"} 
                    />
                ))
            ) : (
                <p className="text-gray-500 py-10">Nenhuma loja encontrada.</p>
            )}
        </div>
      )}
    </section>
  );
};

export default CarrosselLojas;