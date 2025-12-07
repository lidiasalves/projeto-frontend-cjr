/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import Navbar from "@/components/header/navbar";
import CardProduto from "@/components/body/produtcs/cardProduto";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/services/api";
import ModalEditProduto from "@/components/modalProduto/modalEditar"; // ajuste o path se necessário

interface ImagemDB {
  url_imagem: string;
  ordem_exibicao: number;
}

interface LojaResumo {
  id: number;
  nome: string;
  sticker_url?: string;
  UsuarioId?: number; // caso venha
  usuario?: { id?: number }; // fallback
}

interface ProdutoDB {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  imagens: ImagemDB[];
  loja: LojaResumo;
}

interface ProdutoRelacionado {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens: { url_imagem: string }[];
  loja: { id: number; nome: string; sticker_url?: string; UsuarioId?: number };
}

export default function ProdutoPage() {
  const router = useRouter();
  const productId = usePathname().split("/").pop();

  const [produto, setProduto] = useState<ProdutoDB | null>(null);
  const [relacionados, setRelacionados] = useState<ProdutoRelacionado[]>([]);
  const [imagemPrincipal, setImagemPrincipal] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // Modal editar produto
  const [editarOpen, setEditarOpen] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<any>(null);

  // Dono da loja (user logado)
  const [userIdLogado, setUserIdLogado] = useState<number | null>(null);

  // carregar userId do localStorage (se existir)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      if (id) setUserIdLogado(Number(id));
    }
  }, []);

  const fetchData = useCallback(async () => {
    const numericProductId = Number(productId);
    if (!productId || isNaN(numericProductId) || numericProductId === 0) {
      setIsLoading(false);
      console.error("ID de Produto Inválido na URL:", productId);
      return;
    }

    try {
      setIsLoading(true);

      // 1) busca produto com loja incluida (o backend deve retornar loja com id/nome e idealmente UsuarioId)
      const produtoResp = await api.get<ProdutoDB>(`/produto/${productId}`);
      const produtoData = produtoResp.data;

      // Segurança: se backend não retornar loja completa, tratamos como not found
      if (!produtoData || !produtoData.loja || !produtoData.loja.id) {
        setProduto(null);
        setIsLoading(false);
        return;
      }

      // força number no preço
      produtoData.preco = Number(produtoData.preco);

      setProduto(produtoData);

      // escolher imagem principal (ordem_exibicao)
      const imgs = (produtoData.imagens || []).slice();
      imgs.sort((a, b) => (a.ordem_exibicao || 0) - (b.ordem_exibicao || 0));
      setImagemPrincipal(imgs[0]?.url_imagem || "/images/placeholder-product.png");

      // 2) buscar relacionados da mesma loja (limit 8)
      const lojaId = produtoData.loja.id;
      const relResp = await api.get<ProdutoRelacionado[]>(`/produto?lojaId=${lojaId}`);
      const listaFiltrada = (relResp.data || []).filter((p) => p.id !== produtoData.id).slice(0, 8);
      setRelacionados(listaFiltrada);
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      setProduto(null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // abre modal editar para o produto atual (ou para um produto específico)
  function abrirModalEditar(prod?: any) {
    setProdutoParaEditar(prod || produto);
    setEditarOpen(true);
  }

  function fecharModal() {
    setEditarOpen(false);
    setProdutoParaEditar(null);
    // Recarrega info (após editar)
    fetchData();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F4EC]">
        <Navbar />
        <div className="max-w-[1200px] mx-auto mt-20 p-4 text-center text-xl text-gray-500">Carregando detalhes do produto...</div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#F7F4EC]">
        <Navbar />
        <div className="max-w-[1200px] mx-auto mt-20 p-4 text-center text-3xl text-red-500">❌ Produto não encontrado ou ID inválido.</div>
      </div>
    );
  }

  const precoFormatado = Number(produto.preco).toFixed(2).replace(".", ",");
  const imagensOrdenadas = (produto.imagens || []).slice().sort((a, b) => (a.ordem_exibicao || 0) - (b.ordem_exibicao || 0));

  // determina se o usuário logado é dono da loja (vários formatos possíveis conforme backend)
  const lojaOwnerId =
    (produto.loja as any).UsuarioId ||
    (produto.loja as any).Usuario?.id ||
    (produto.loja as any).usuario?.id ||
    null;

  const isOwner = userIdLogado && lojaOwnerId && Number(userIdLogado) === Number(lojaOwnerId);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <Navbar />

      <main className="max-w-[1200px] mx-auto mt-10 flex gap-6 px-4">
        <button onClick={() => router.back()} className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300">
          <ChevronLeft size={24} />
        </button>

        {/* GALERIA */}
        <div className="flex gap-4">
          {/* miniaturas */}
          <div className="flex flex-col gap-3">
            {imagensOrdenadas.map((img, i) => (
              <div key={i} className="relative cursor-pointer" onClick={() => setImagemPrincipal(img.url_imagem)}>
                <img
                  src={img.url_imagem}
                  width={80}
                  height={80}
                  alt={`Miniatura ${i + 1}`}
                  className={`rounded-lg border transition ${imagemPrincipal === img.url_imagem ? "border-purple-600" : "border-gray-300"}`}
                />
              </div>
            ))}
          </div>

          {/* imagem principal */}
          <div className="bg-white rounded-2xl p-6 shadow-md relative">
            <img src={imagemPrincipal || "/images/placeholder-product.png"} width={380} height={380} alt={produto.nome} className="transition-all duration-200" />
            {produto.loja.sticker_url && (
              <img src={produto.loja.sticker_url} width={60} height={60} alt={produto.loja.nome} className="absolute top-4 left-4 opacity-90 rounded-full object-cover" />
            )}
          </div>
        </div>

        {/* DETALHES E BOTÃO EDITAR */}
        <div className="max-w-[520px] flex-1">
          <div className="flex items-start gap-4">
            <h2 className="text-3xl font-bold mb-2">{produto.nome}</h2>

            {/* botão editar ao lado do nome (visível apenas para owner) */}
            {isOwner && (
              <button
                onClick={() => abrirModalEditar(produto)}
                className="ml-2 mt-1 p-2 rounded-full bg-[#5E3C9E] hover:bg-[#4d2f86] text-white shadow-sm flex items-center justify-center"
                title="Editar produto"
              >
                <img src="/images/icons/botaoeditar.svg" className="w-5 h-5" alt="Editar" />
              </button>
            )}
          </div>

          <p className="text-2xl font-semibold mb-4 text-[#5E3C9E]">R$ {precoFormatado}</p>

          <h3 className="font-semibold mb-2 mt-4">Descrição</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{produto.descricao || "Descrição não fornecida."}</p>

          {/* info loja */}
          <div className="mt-6 flex items-center gap-3">
            {produto.loja.sticker_url ? (
              <img src={produto.loja.sticker_url} width={44} height={44} alt={produto.loja.nome} className="rounded-full object-cover" />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gray-200" />
            )}
            <button onClick={() => router.push(`/loja/${produto.loja.id}`)} className="text-sm text-gray-700 hover:underline">
              {produto.loja.nome}
            </button>
          </div>
        </div>
      </main>

      {/* SEÇÃO: MAIS DA LOJA - CARROSSEL HORIZONTAL (sem scrollbar visível) */}
      <section className="max-w-[1200px] mx-auto mt-16 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Mais da loja {produto.loja.nome}</h2>
          {/* se owner, mostrar quantos relacionados */}
          <span className="text-sm text-gray-500">{relacionados.length} encontrados</span>
        </div>

        {relacionados.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {relacionados.map((p) => (
              <div key={p.id} className="shrink-0 snap-center">
                {/* CardProduto usado como no resto do app */}
                <div className="relative">
                  <CardProduto
                    id={p.id}
                    nome={p.nome}
                    preco={Number(p.preco)}
                    imagem={p.imagens?.[0]?.url_imagem || "/images/placeholder-product.png"}
                    estoque={p.estoque}
                    stickerLoja={p.loja.sticker_url}
                  />

                  {/* Se for owner da loja, também permito editar produtos relacionados com um pequeno botão no canto do card */}
                  {isOwner && (
                    <button
                      onClick={() => abrirModalEditar(p)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-[#5E3C9E] hover:bg-[#4d2f86] text-white shadow"
                      title="Editar este produto"
                    >
                      <img src="/images/icons/botaoeditar.svg" className="w-4 h-4" alt="Editar" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum outro produto encontrado nesta loja.</p>
        )}
      </section>

      {/* MODAL DE EDITAR (reutiliza o modal existente) */}
      {editarOpen && produtoParaEditar && (
        <ModalEditProduto isOpen={editarOpen} onClose={fecharModal} produto={produtoParaEditar} />
      )}
    </div>
  );
}
