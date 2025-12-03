"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/header/navbardeslogada";
import BarraPesquisa from "@/components/body/barraPesquisa";
import CardProduto from "@/components/body/produtcs/cardProduto";
import { api } from "@/utils/api";

interface ProdutoDB {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens: { url_imagem: string }[];
  loja: { sticker_url: string };
}

const ResultadosPesquisa = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [produtos, setProdutos] = useState<ProdutoDB[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarProdutos() {
            if (!query) return;

            try {
                setLoading(true);
                const response = await api.get(`/produto?nome=${query}`); 
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro na busca:", error);
            } finally {
                setLoading(false);
            }
        }

        buscarProdutos();
    }, [query]);

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pb-20">
            
            <h1 className="text-3xl font-bold text-black mb-2 mt-8">
                Resultados para: <span className="text-[#5E3C9E]">"{query}"</span>
            </h1>
            <p className="text-gray-500 mb-8">
                {loading ? "Buscando..." : `${produtos.length} produtos encontrados`}
            </p>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                    {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-200 rounded-lg"/>)}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <CardProduto
                                key={produto.id}
                                id={produto.id}
                                nome={produto.nome}
                                preco={Number(produto.preco)}
                                estoque={produto.estoque}
                                imagem={produto.imagens?.[0]?.url_imagem || "/images/placeholder.png"}
                                stickerLoja={produto.loja?.sticker_url}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-xl text-gray-400">Poxa, não encontramos nada com esse nome. 😕</p>
                            <p className="text-sm text-gray-400 mt-2">Tente buscar por termos mais genéricos.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function PaginaPesquisa() {
    return (
        <div className="min-h-screen bg-[#F6F3E4]">
            <Navbar />
            <div className="pt-8 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto">
                <BarraPesquisa />
            </div>
            
            <Suspense fallback={<div className="p-10 text-center">Carregando busca...</div>}>
                <ResultadosPesquisa />
            </Suspense>
        </div>
    );
}