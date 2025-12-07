/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Navbar from "@/components/header/navbar";
import ModalEditarLoja from "@/components/modal/modalEditarLoja";
import ModalAddProduto from "@/components/modalProduto/modalAdicionar";
import ModalFazerAvaliacao from "@/components/modal/modalFazerAvaliacao";
import CarrosselAvaliacoes from "@/components/body/avaliacao/carrosselAvaliacao";
import CardProduto from "@/components/body/produtcs/cardProduto";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Store, Star } from "lucide-react";
import Link from "next/link"; // <--- IMPORTANTE

export default function LojaDinamica() {
  const params = useParams();
  
  // Garantindo que pegamos o ID certo da pasta [lojaId]
  const idLoja = params.lojaId;

  const [loja, setLoja] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // Modais
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalAdd, setAbrirModalAdd] = useState(false);
  const [abrirModalComent, setAbrirModalComent] = useState(false);

  const fetchLoja = useCallback(async () => {
    try {
      if (!idLoja) return;
      const res = await axios.get(`http://localhost:3001/loja/${idLoja}`);
      setLoja(res.data);

      const userId = localStorage.getItem("userId");
      if (userId && Number(userId) === res.data.UsuarioId) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error("Erro ao buscar loja:", error);
    } finally {
      setLoading(false);
    }
  }, [idLoja]);

  useEffect(() => {
    fetchLoja();
  }, [fetchLoja]);

  if (loading) return <div className="min-h-screen bg-[#1a1a1a]" />;
  if (!loja) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loja não encontrada.</div>;

  // Calculando média
  const totalAvaliacoes = loja.avaliacoes?.length || 0;
  const somaNotas = loja.avaliacoes?.reduce((acc: any, curr: any) => acc + curr.nota, 0) || 0;
  const media = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "N/A";

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white font-sans">
      <Navbar />

      {/* --- BANNER --- */}
      <section className="relative w-full h-[500px] overflow-hidden group">
        {loja.banner_url ? (
           <img
           src={loja.banner_url}
           className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
           alt="Banner"
         />
        ) : (
            <div className="w-full h-full bg-linear-to-r from-purple-900 to-black" />
        )}

        <div className="absolute inset-0 bg-linear-to-b from-black/90 to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col text-center">
            <h1 
                className="text-7xl font-semibold leading-none drop-shadow-lg"
                style={{ fontFamily: "League Spartan, sans-serif" }}
            >
                {loja.nome}
            </h1>
            <span className="text-2xl opacity-80 mt-1" style={{ fontFamily: "League Spartan, sans-serif" }}>
                {loja.categoria?.nome}
            </span>
          </div>
        </div>

        <div className="absolute left-10 bottom-10">
            <p className="text-lg text-white/80 font-light italic">
                by {loja.usuario?.nome || "Desconhecido"}
            </p>
        </div>

        {isOwner && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                <button 
                    onClick={() => setAbrirModal(true)}
                    className="flex flex-col items-center p-3 rounded-full bg-[#5E3C9E] shadow-md text-white hover:bg-[#4d2f86] transition-transform hover:scale-110"
                >
                    <img src="/images/icons/botaoeditar.svg" className="w-5 h-5" alt="Editar" />
                </button>

                <button 
                    onClick={() => setAbrirModalAdd(true)}
                    className="flex flex-col items-center p-3 rounded-full bg-[#5E3C9E] shadow-md text-white hover:bg-[#4d2f86] transition-transform hover:scale-110"
                >
                    <img src="/images/icons/botaoadd.svg" className="w-5 h-5" alt="Add" />
                </button>
            </div>
        )}
      </section>

      {/* --- REVIEWS (RESUMO + LINK VER MAIS) --- */}
      <section className="text-2xl bg-black py-7 text-center border-b border-gray-800 flex flex-col items-center"> 
          <h1>Reviews e Comentários</h1>
        
        <p className="text-4xl font-bold mb-2 mt-2">{media}</p> 
        
        <div className="text-yellow-400 text-3xl mb-2 flex justify-center gap-1">
            <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" className={totalAvaliacoes > 0 ? "" : "text-gray-600"} />
        </div>

        {/* --- O LINK QUE FALTAVA --- */}
        <Link 
            href={`/loja/${idLoja}/avaliacoes`}
            className="text-sm text-[#5E3C9E] hover:text-[#7d5bc2] underline transition-colors mt-2"
        >
            ver mais
        </Link>
      </section>

      {/* --- CARROSSEL DE AVALIAÇÕES --- */}
      <div className="w-full bg-black py-10 flex flex-col items-center gap-2">
        <div className="w-full flex justify-center mt-4 mx-auto px-1">
          <button
            onClick={() => setAbrirModalComent(true)}
            className="flex items-center gap-2 bg-[#5E3C9E] hover:bg-[#4d2f86] text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all"
          >
            <span className="text-xl font-bold">+</span>
            Adicionar Review
          </button>
        </div>

       <CarrosselAvaliacoes avaliacoes={loja.avaliacoes || []} />
      </div>

      {/* --- SEÇÃO DE PRODUTOS --- */}
      <section className="max-[1200px] mx-auto bg-white w-full py-10 px-4 md:px-10 rounded-t-3xl md:rounded-none">
          <div className="flex items-center justify-between mt-6 border-b pb-4 border-gray-200">
            <h2 className="text-3xl font-semibold md:text-5xl text-black">
                Produtos
                <span className="ml-2 text-xl font-normal text-[#5E3C9E]">{loja.nome}</span>  
            </h2> 
          </div> 

        {loja.produtos && loja.produtos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 justify-items-center">
                {loja.produtos.map((prod: any) => {
                  const imagem = prod.imagens?.find((img: any) => img?.url_imagem)?.url_imagem;
                  return (
                      <CardProduto
                          key={prod.id}
                          id={prod.id}
                          nome={prod.nome}
                          preco={Number(prod.preco)}
                          imagem={imagem}
                          estoque={prod.estoque}
                      />
                  );
              })}
            </div>
        ) : (
            <div className="mt-10 text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <Store size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-500">Nenhum produto cadastrado nesta loja.</p>
            </div>
        )}
      </section>

      {/* Modais */}
      {isOwner && (
        <ModalEditarLoja 
            isOpen={abrirModal}
            onClose={() => setAbrirModal(false)} 
            loja={loja}
            onSucesso={() => { fetchLoja(); setAbrirModal(false); }}      
        />
      )}

      {isOwner && (
        <ModalAddProduto
            isOpen={abrirModalAdd}
            onClose={() => setAbrirModalAdd(false)}
            lojaId={idLoja}
        />
      )}

      <ModalFazerAvaliacao
        isOpen={abrirModalComent}
        onClose={() => setAbrirModalComent(false)}
        lojaId={loja.id}
        nomeDaLoja={loja.nome}
        onSuccess={() => {
            fetchLoja();
            setAbrirModalComent(false);
        }}
      />
    </div>
  );
}