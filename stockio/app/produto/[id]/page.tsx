"use client";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/services/api";
import CardProduto from "@/components/body/produtcs/cardProduto";
import Navbar from "@/components/header/navbar"; // Navbar genérica (logada/deslogada)

// ------------------------------------
// I. INTERFACES DE DADOS
// ------------------------------------

interface ImagemDB {
    url_imagem: string;
    ordem_exibicao: number;
}

interface ProdutoDB {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    imagens: ImagemDB[];
    // 🛑 Acesso Seguro: Garante que a loja está incluída no fetch do backend (getById)
    loja: { 
        id: number;
        nome: string;
        sticker_url: string;
    };
}

interface ProdutoRelacionado {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
    imagens: { url_imagem: string }[];
    loja: { sticker_url: string };
}

// ------------------------------------
// II. COMPONENTE PRINCIPAL
// ------------------------------------

export default function ProdutoPage() {
    const router = useRouter();
    // Extrai o ID do produto da URL. Ex: '/produto/123' -> '123'
    const productId = usePathname().split('/').pop(); 

    const [produto, setProduto] = useState<ProdutoDB | null>(null);
    const [relacionados, setRelacionados] = useState<ProdutoRelacionado[]>([]);
    const [imagemPrincipal, setImagemPrincipal] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const numericProductId = Number(productId);

        if (!productId || isNaN(numericProductId) || numericProductId === 0) {
            setIsLoading(false);
            console.error("ID de Produto Inválido na URL:", productId);
            return;
        }

        async function fetchData() {
            try {
                setIsLoading(true);
                
                // 1. Busca do Produto Principal
                const produtoResponse = await api.get<ProdutoDB>(`/produto/${productId}`);
                const produtoData = produtoResponse.data;
                produtoData.preco = Number(produtoData.preco)
                // 🛑 Tratamento de Erro (o problema que estava causando "reading 'id'")
                if (!produtoData || !produtoData.loja || !produtoData.loja.id) {
                    setProduto(null); // Define como nulo para renderizar o "Produto não encontrado"
                    setIsLoading(false);
                    return;
                }

                setProduto(produtoData);
                
                // Define a imagem principal
                const primeiraImagem = produtoData.imagens.sort((a, b) => a.ordem_exibicao - b.ordem_exibicao)[0]?.url_imagem;
                setImagemPrincipal(primeiraImagem || "/images/placeholder-product.png");

                // 2. Busca de Produtos Relacionados (Da mesma loja)
                const relacionadosResponse = await api.get<ProdutoRelacionado[]>(
                    `/produto?lojaId=${produtoData.loja.id}`
                );
                
                // Filtra para remover o próprio produto e limita a 5
                const listaFiltrada = relacionadosResponse.data
                    .filter(p => p.id !== produtoData.id)
                    .slice(0, 5); 
                
                setRelacionados(listaFiltrada);

            } catch (error) {
                console.error("Erro fatal ao buscar detalhes do produto:", error);
                setProduto(null); // Define como nulo em caso de falha 404/500
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [productId]);

    // Lógica de Renderização (Loading, NotFound)
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F7F4EC]">
                <Navbar />
                <div className="max-w-[1200px] mx-auto mt-20 p-4 text-center text-xl text-gray-500">
                    Carregando detalhes do produto...
                </div>
            </div>
        );
    }
    
    if (!produto) {
        return (
            <div className="min-h-screen bg-[#F7F4EC]">
                <Navbar />
                <div className="max-w-[1200px] mx-auto mt-20 p-4 text-center text-3xl text-red-500">
                    ❌ Produto não encontrado ou ID inválido.
                </div>
            </div>
        );
    }

    // Dados para renderização
    const precoFormatado = produto.preco.toFixed(2).replace('.', ',');
    const imagensOrdenadas = produto.imagens.sort((a, b) => a.ordem_exibicao - b.ordem_exibicao);


    return (
        <div className="min-h-screen bg-[#F7F4EC]">
            <Navbar /> 

            <main className="max-w-[1200px] mx-auto mt-10 flex gap-10">
                <button onClick={() => router.back()} className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300">
                    <ChevronLeft size={24} />
                </button>

                {/* GALERIA DE IMAGENS */}
                <div className="flex gap-4">
                              
                    {/* Miniaturas */}
                    <div className="flex flex-col gap-3">
                        {imagensOrdenadas.map((img, i) => (
                            <div
                                key={i}
                                className="relative cursor-pointer"
                                onClick={() => setImagemPrincipal(img.url_imagem)}
                            >
                                <img
                                    src={img.url_imagem}
                                    width={80}
                                    height={80}
                                    alt={`Miniatura ${i + 1}`}
                                    className={`
                                        rounded-lg border transition 
                                        ${imagemPrincipal === img.url_imagem ? "border-purple-600" : "border-gray-300"}
                                    `}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Imagem principal */}
                    <div className="bg-white rounded-2xl p-6 shadow-md relative">
                        {/* Imagem Principal */}
                        <img
                            src={imagemPrincipal || "/images/placeholder-product.png"}
                            width={380}
                            height={380}
                            alt={produto.nome}
                            className="transition-all duration-200"
                        />

                        {/* LOGO SOBRE A IMAGEM PRINCIPAL */}
                        {produto.loja.sticker_url && (
                            <img
                                src={produto.loja.sticker_url}
                                width={60}
                                height={60}
                                alt={produto.loja.nome}
                                className="absolute top-4 left-4 opacity-90 rounded-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* DETALHES */}
                <div className="max-w-[450px]">
                    <h2 className="text-3xl font-bold mb-2">{produto.nome}</h2>
                    <p className="text-2xl font-semibold mb-4 text-[#5E3C9E]">R$ {precoFormatado}</p>

                    <h3 className="font-semibold mb-2 mt-8">Descrição</h3>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {produto.descricao || "Descrição não fornecida."}
                    </p>
                    
                    {/* Aqui entraria a lógica de Estoque, Adicionar ao Carrinho, etc. */}
                </div>
            </main>

            {/* SEÇÃO PRODUTOS DA MESMA LOJA */}
            <section className="max-w-[1200px] mx-auto mt-16">
                <h2 className="text-xl font-bold mb-6">Mais da loja {produto.loja.nome}</h2>

                <div className="grid grid-cols-5 gap-6">
                    {relacionados.length > 0 ? (
                        relacionados.map((p) => (
                            <CardProduto
                                key={p.id}
                                id={p.id}
                                nome={p.nome}
                                preco={Number(p.preco)}
                                imagem={p.imagens?.[0]?.url_imagem || "/images/placeholder-product.png"}
                                estoque={p.estoque}
                                stickerLoja={p.loja.sticker_url}
                            />
                        ))
                    ) : (
                        <p className="col-span-5 text-gray-500">Nenhum outro produto encontrado nesta loja.</p>
                    )}
                </div>
            </section>
        </div>
    );
}