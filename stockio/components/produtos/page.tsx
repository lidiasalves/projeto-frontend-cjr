"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import CardProduto from "@/components/body/produtcs/cardProduto";
import { useParams } from "next/navigation";

interface ProdutoDB {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens: { url_imagem: string }[];
  loja: { sticker_url: string };
}

export default function PaginaCategoria() {
  const { slug } = useParams();
  const [produtos, setProdutos] = useState<ProdutoDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await api.get(`/produto?categoria=${slug}`);
        setProdutos(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold mb-6 capitalize">
        {slug}
      </h1>

      {loading ? (
        <p>Carregando...</p>
      ) : produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {produtos.map((p) => (
            <CardProduto
              key={p.id}
              id={p.id}
              nome={p.nome}
              preco={Number(p.preco)}
              estoque={p.estoque}
              imagem={p.imagens?.[0]?.url_imagem || "/images/placeholder-product.png"}
              stickerLoja={p.loja?.sticker_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}