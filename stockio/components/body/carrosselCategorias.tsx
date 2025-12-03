"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from "@/utils/api";


interface CategoriaDB {
  id: number;
  nome: string;
}

const simplificarNome = (texto: string) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const Categoria = () => {
    const [categorias, setCategorias] = useState<CategoriaDB[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCategorias() {
            try {

                const response = await api.get("/categoria");
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategorias();
    }, []);

    return (
        <section className="w-full">
            <h2 className="text-3xl md:text-5xl font-semibold text-black mb-4">
                Categorias
            </h2>

            {isLoading ? (
                <div className="flex gap-4 overflow-hidden py-4">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="shrink-0 w-24 h-24 md:w-28 md:h-[115px] bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="flex overflow-x-auto space-x-4 w-full h-[180px] items-center sem-barra">
                    {categorias.map((category) => {
                        const iconPath = `/images/icons/${simplificarNome(category.nome)}.svg`;
                        
                        return (
                            <Link 
                                key={category.id} 
                                href={`/categoria/${category.id}`} 
                                className="
                                    shrink-0 
                                    flex flex-col items-center justify-center 
                                    w-32 h-32 md:w-40 md:h-40
                                    bg-white rounded-lg shadow-md
                                    hover:shadow-lg hover:scale-105
                                    transition-all duration-200
                                "
                            >
                                <Image 
                                    src={iconPath}
                                    alt={category.nome}
                                    width={80}
                                    height={80}
                                    className="w-16 h-16 md:w-20 md:h-20"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/icons/default.svg"
                                    }}
                                />
                            </Link>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default Categoria;