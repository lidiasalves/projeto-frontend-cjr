/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/header/navbar";
import BarraPesquisa from "@/components/body/barraPesquisa";
import CardProduto from "@/components/body/produtcs/cardProduto";
// 💡 Importar CardLojas para resultados de Loja
import CardLojas from "@/components/body/store/cardLojas"; 
import { api } from "@/services/api";

// -------------------------
// 💡 NOVAS INTERFACES
// -------------------------

interface ProdutoDB {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
    imagens: { url_imagem: string }[];
    loja: { sticker_url: string };
}

interface LojaDB {
    id: number;
    nome: string;
    sticker_url: string | null;
    categoria: { nome: string; }; // Assumindo que a loja também traz a categoria para exibição
}

interface ResultadoBusca {
    produtos: ProdutoDB[];
    lojas: LojaDB[];
}

// -------------------------
// 💡 COMPONENTE PRINCIPAL
// -------------------------

const ResultadosPesquisa = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    // 💡 Estado unificado para armazenar produtos e lojas
    const [resultados, setResultados] = useState<ResultadoBusca>({ produtos: [], lojas: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarTudo() {
            if (!query) return;

            try {
                setLoading(true);

                const response = await api.get(`/pesquisa?q=${query}`); 
                
                setResultados(response.data); 
                
            } catch (error) {
                console.error("Erro na busca unificada:", error);
            } finally {
                setLoading(false);
            }
        }

        buscarTudo();
    }, [query]);
    
    const totalResultados = resultados.produtos.length + resultados.lojas.length;
    const { produtos, lojas } = resultados;

    // Função de renderização para feedback de não encontrado
    const renderZeroResults = () => (
        <div className="col-span-full py-20 text-center">
            <p className="text-xl text-gray-400">Poxa, não encontramos nada com esse nome. 😕</p>
            <p className="text-sm text-gray-400 mt-2">Tente buscar por termos mais genéricos.</p>
        </div>
    );
    
    // Função de renderização para seção vazia
    const renderEmptySection = (tipo: string) => (
        <div className="py-8 text-center bg-gray-50 rounded-lg col-span-full">
             <p className="text-lg text-gray-400">Nenhuma {tipo} encontrada.</p>
        </div>
    );


    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pb-20">
            
            <h1 className="text-3xl font-bold text-black mb-2 mt-8">
                Resultados para: <span className="text-[#5E3C9E]">"{query}"</span>
            </h1>
            <p className="text-gray-500 mb-8">
                {loading ? "Buscando..." : `${totalResultados} resultados encontrados (${produtos.length} produtos, ${lojas.length} lojas)`}
            </p>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                    {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-200 rounded-lg"/>)}
                </div>
            ) : (
                <>
                    {/* --------------------------- */}
                    {/* ## 1. SEÇÃO LOJAS */}
                    {/* --------------------------- */}
                    <h2 className="text-2xl font-semibold text-black mb-4 mt-8">Lojas ({lojas.length})</h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                        {lojas.length > 0 ? (
                            lojas.map((loja) => (
                                <div key={loja.id} className="flex justify-center">
                                    <CardLojas
                                        id={loja.id}
                                        nome={loja.nome}
                                        stickerLoja={loja.sticker_url || "/images/placeholder.png"}
                                        categoria={loja.categoria?.nome || "Geral"}
                                    />
                                </div>
                            ))
                        ) : (
                            renderEmptySection("loja")
                        )}
                    </div>

                    {/* --------------------------- */}
                    {/* ## 2. SEÇÃO PRODUTOS */}
                    {/* --------------------------- */}
                    <h2 className="text-2xl font-semibold text-black mb-4">Produtos ({produtos.length})</h2>

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
                            renderEmptySection("produto")
                        )}
                    </div>
                    

                    {totalResultados === 0 && renderZeroResults()}
                </>
            )}
        </div>
    );
};


export default function PaginaPesquisa() {
    return (
    
        <div className="min-h-screen  bg-[#F6F3E4]">
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