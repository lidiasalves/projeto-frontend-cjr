"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

import NavbarLogada from "@/components/header/navbar";
import HeaderCategorias from "@/components/header/headerCategoria";
import FiltroCategorias from "@/components/filtros/filtroCategoria";
import BarraPesquisa from "@/components/body/barraPesquisa";
import CardProduto from "@/components/body/produtcs/cardProduto";

import { categoriesData } from "@/mock/categoriasMock";

interface ProdutoDB {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens: { url_imagem: string }[];
  loja: { sticker_url: string };
  categoria: { nome: string };
}

export default function PaginaProdutos() {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [produtos, setProdutos] = useState<ProdutoDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await api.get("/produto");
        setProdutos(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const produtosFiltrados =
    categoriasSelecionadas.length === 0
      ? produtos
      : produtos.filter((p) => {
          const categoriaProduto = p.categoria?.nome?.toLowerCase() || "";
          const filtros = categoriasSelecionadas.map((c) => c.toLowerCase());
          return filtros.includes(categoriaProduto);
        });

  const handleFilterChange = (categoriaNome: string) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoriaNome)
        ? prev.filter((c) => c !== categoriaNome)
        : [...prev, categoriaNome]
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <NavbarLogada />
      <HeaderCategorias
        categoriasSelecionadas={categoriasSelecionadas}
        onToggleCategoria={handleFilterChange}
      />

      <main className="w-full px-4 sm:px-6 md:px-8 py-8 max-w-[1440px] mx-auto">
        
        <div className="mb-12">
          <BarraPesquisa />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 w-full">
          <h1 className="text-3xl md:text-5xl font-semibold text-black">Produtos</h1>

          <div className="w-full md:w-auto min-w-[250px] z-20">
            <FiltroCategorias
              categorias={categoriesData}
              categoriasSelecionadas={categoriasSelecionadas}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            Carregando produtos...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 pb-20">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((p) => (
                <CardProduto
                  key={p.id}
                  id={p.id}
                  nome={p.nome}
                  preco={Number(p.preco)}
                  estoque={p.estoque}
                  imagem={p.imagens?.[0]?.url_imagem || "/images/placeholder-product.png"}
                  stickerLoja={p.loja?.sticker_url}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 text-xl">
                Nenhum produto encontrado.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
