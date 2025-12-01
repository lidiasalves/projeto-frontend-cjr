"use client";
import React, { useState, useEffect } from "react";
import {api} from "@/services/api";
import NavbarLogada from "@/components/header/navbarlogada";
import BarraPesquisa from "@/components/body/barraPesquisa";
import FiltroCategorias from "@/components/filtros/filtroCategoria";
import CardLojas from "@/components/body/store/cardLojas";
import { lojasMock } from "@/mock/lojasMock";
import { categoriesData } from "@/mock/categoriasMock";
import HeaderCategorias from "@/components/header/headerCategoria";

interface LojaDB{
  id: number;
  nome: string;
  sticker_url: string;
  categoria: { nome: string };
}

export default function PaginaLojas() {

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [lojas, setLojas] = useState<LojaDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => { 
    async function buscarLojas() {
      try {
        setIsLoading(true);
        const response = await api.get("/lojas");
        setLojas(response.data);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        alert("Erro ao buscar lojas. Por favor, tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    }
    buscarLojas();
  }, []);

  const lojasFiltradas = 
      categoriasSelecionadas.length === 0
        ? lojas
        : lojas.filter((loja) => {
            const catLoja = loja.categoria?.nome?.toLowerCase() || ""; 
            
            const filtros = categoriasSelecionadas.map(c => c.toLowerCase());
            return filtros.includes(catLoja);
          });

  const handleFilterChange = (categoriaNome: string) => {
    setCategoriasSelecionadas((prev) => {
      if (prev.includes(categoriaNome)) {
        return prev.filter((cat) => cat !== categoriaNome);
      }
      return [...prev, categoriaNome];
    });
  };

return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <NavbarLogada />
      <HeaderCategorias 
        categoriasSelecionadas={categoriasSelecionadas}
        onToggleCategoria={handleFilterChange}
      />
      <main className="w-full px-4 sm:px-6 md:px-8 py-8 max-w-[1440px] mx-auto">
        
        <div className="mb-12"><BarraPesquisa /></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 w-full">
            <h1 className="text-3xl md:text-5xl font-semibold text-black">Lojas</h1>
            <div className="w-full md:w-auto min-w-[250px] z-20">
                <FiltroCategorias 
                    categorias={categoriesData}
                    categoriasSelecionadas={categoriasSelecionadas}
                    onChange={handleFilterChange}
                />
            </div>
        </div>

        {isLoading ? (
            // --- SKELETON LOADING (Opcional, mas profissional) ---

            <div className="text-center py-20 text-gray-500 text-xl">
                Carregando lojas...
                {/* Ou coloque ícones piscando aqui */}

            </div>
        ) : (
            // --- GRADE REAL ---

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 pb-20">
                {lojasFiltradas.length > 0 ? (
                    lojasFiltradas.map((loja) => (
                        <div key={loja.id} className="flex justify-center">
                            <CardLojas
                                id={loja.id}
                                nome={loja.nome}
                                stickerLoja={loja.sticker_url} 
                                categoria={loja.categoria.nome}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500 text-xl">
                        Nenhuma loja encontrada.
                    </div>
                )}
            </div>
        )}

      </main>
    </div>
  );
}