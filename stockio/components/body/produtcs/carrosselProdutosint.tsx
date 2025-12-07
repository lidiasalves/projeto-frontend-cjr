// components/body/produtcs/CarrosseisProdutosIntegrado.tsx
"use client";
import React, { useState, useEffect } from "react";
import { api } from "@/services/api";
import CarrosselProdutos from "./carrosselProdutos"; // Seu componente de carrossel

interface Categoria {
    id: number;
    nome: string;
    // Assumimos que a API /categoria não traz a contagem de produtos
}

const CATEGORIAS_FIXAS_DEMO = ["moda", "eletronicos", "beleza"]; 
export default function CarrosseisProdutosIntegrado() {
    const [categoriasParaExibir, setCategoriasParaExibir] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 💡 NOTA: Idealmente, esta chamada API deveria nos dar a contagem de produtos por categoria.
        // Como o backend não faz isso, usaremos as categorias fixas como solução integrada.
        
        async function fetchCategorias() {
            try {

                setCategoriasParaExibir(CATEGORIAS_FIXAS_DEMO);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategorias();
    }, []);

    if (isLoading) {
        // Placeholder de carregamento
        return (
            <div className="space-y-12 py-8">
                {[1, 2, 3].map(i => (
                    <section key={i} className="w-full px-6 py-8 animate-pulse">
                         <div className="h-8 w-64 mb-4 bg-gray-300 rounded"></div>
                         <div className="flex gap-8 mt-4 overflow-hidden">
                             {[1,2,3,4].map(j => <div key={j} className="shrink-0 w-56 h-80 bg-gray-200 rounded-lg" />)}
                         </div>
                    </section>
                ))}
            </div>
        );
    }
    
    if (categoriasParaExibir.length === 0) {
        return <p className="text-center py-10 text-gray-500">Nenhuma categoria para destaque.</p>;
    }

    // Renderiza um CarrosselProdutos para cada categoria destacada
    return (
        <div className="space-y-12">
            {categoriasParaExibir.map((nomeCategoria) => (
                <CarrosselProdutos
                    key={nomeCategoria}
                    subtitulo={nomeCategoria}
                    categoriaFiltro={nomeCategoria.toLowerCase()} // 🛑 Isso aciona a busca de produtos para esta categoria
                />
            ))}
        </div>
    );
}