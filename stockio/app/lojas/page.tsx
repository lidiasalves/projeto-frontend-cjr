"use client";
import React, { useState } from "react";

import NavbarLogada from "@/components/header/navbarlogada";
import BarraPesquisa from "@/components/body/barraPesquisa";
import FiltroCategorias from "@/components/filtros/filtroCategoria";
import CardLojas from "@/components/body/store/cardLojas";


import { lojasMock } from "@/mock/lojasMock";
import { categoriesData } from "@/mock/categoriasMock"; 

export default function PaginaLojas() {

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);


  const lojasFiltradas = 
    categoriasSelecionadas.length === 0
      ? lojasMock
      : lojasMock.filter((loja) => {
          const catLoja = loja.categoria.toLowerCase();
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

      <main className="w-full px-4 sm:px-6 md:px-8 py-8 max-w-[1440px] mx-auto">
        

        <div className="mb-12">
            <BarraPesquisa />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 w-full">
            

            <h1 className="text-3xl md:text-5xl font-semibold text-black">
                Lojas
            </h1>


            <div className="w-full md:w-auto min-w-[250px] z-20">
                <FiltroCategorias 
                    categorias={categoriesData}
                    categoriasSelecionadas={categoriasSelecionadas}
                    onChange={handleFilterChange}
                />
            </div>
        </div>


        <div className="
            grid 
            grid-cols-2       /* Celular: 2 colunas */
            sm:grid-cols-3    /* Tablet Pequeno: 3 colunas */
            md:grid-cols-4    /* Tablet/Laptop: 4 colunas */
            lg:grid-cols-5    /* Monitor Grande: 5 colunas (como na imagem) */
            gap-x-6 gap-y-10  /* Espaçamento entre os cards */
            pb-20             /* Espaço no final da página */
        ">
            
            {lojasFiltradas.length > 0 ? (
                lojasFiltradas.map((loja) => (
                    <div key={loja.id} className="flex justify-center">
                        <CardLojas
                            id={loja.id}
                            nome={loja.nome}
                            stickerLoja={loja.stickerLoja}
                            categoria={loja.categoria}
                        />
                    </div>
                ))
            ) : (

                <div className="col-span-full text-center py-20 text-gray-500 text-xl">
                    Nenhuma loja encontrada nesta categoria. 😔
                </div>
            )}

        </div>

      </main>
    </div>
  );
}