"use client";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import CardProduto from "./cardProduto";
import { useDragScroll } from "@/components/hooks/useDragScroll";

interface ProdutoDB {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens: { url_imagem: string }[];
  loja: { sticker_url: string };
}

interface Props {
    titulo?: string;
    subtitulo?: string;
    categoriaFiltro?: string;
}

const CarrosselProdutos = ({ titulo = "Produtos", subtitulo = "", categoriaFiltro }: Props) => { 
  const [produtos, setProdutos] = useState<ProdutoDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { carrosselRef, ...dragHandlers } = useDragScroll();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setIsLoading(true);
        // Monta a URL com filtro se ele existir
        const url = categoriaFiltro ? `/produto?categoria=${categoriaFiltro}` : "/produto";
        const response = await api.get(url);
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProdutos();
  }, [categoriaFiltro]);

  return (
    <section className="w-full px-6 py-8">
        <div className="flex items-center justify-between px-4 mt-6">
            <h2 className="text-3xl font-semibold md:text-5xl text-black mb-4">
                {titulo}
                {subtitulo && <span className="ml-2 text-sm font-normal text-[#5E3C9E]">{subtitulo}</span>}
            </h2> 
        </div> 

        {isLoading ? (
             <div className="flex gap-8 mt-4 overflow-hidden">
                {[1,2,3,4].map(i => <div key={i} className="shrink-0 w-56 h-80 bg-gray-200 rounded-lg animate-pulse" />)}
             </div>
        ) : (
            <div 
                ref={carrosselRef}
                {...dragHandlers}
                className="flex gap-8 overflow-x-auto overflow-y-hidden cursor-grab select-none scroll-smooth sem-barra"
            >
                {produtos.length > 0 ? produtos.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        preco={Number(produto.preco)}
                        estoque={produto.estoque}
                        imagem={produto.imagens?.[0]?.url_imagem || "/images/placeholder-product.png"}
                        stickerLoja={produto.loja?.sticker_url}
                    />
                )) : (
                    <p className="text-gray-500 px-4">Nenhum produto encontrado.</p>
                )}
            </div>
        )}
    </section>
  );
}

export default CarrosselProdutos;