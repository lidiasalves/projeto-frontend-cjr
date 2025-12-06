"use client";

import Navbar from "@/components/header/navbar"; // Usando a Navbar inteligente
import ModalFazerAvaliacao from "@/components/modal/modalFazerAvaliacao";
import Comentario from "@/components/body/avaliacao/cardAvaliacao";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function AvaliacoesLoja() {
  const params = useParams();
  const lojaId = params.lojaId; // Pegando o ID da pasta [lojaId]

  const [abrirModalComent, setAbrirModalComent] = useState(false);
  const [loja, setLoja] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados da loja e avaliações
  const fetchLoja = useCallback(async () => {
    try {
      if (!lojaId) return;
      // Busca a loja com o include de avaliacoes (que fizemos no service)
      const res = await axios.get(`http://localhost:3001/loja/${lojaId}`);
      setLoja(res.data);
    } catch (error) {
      console.error("Erro ao buscar loja:", error);
      toast.error("Erro ao carregar avaliações.");
    } finally {
      setLoading(false);
    }
  }, [lojaId]);

  useEffect(() => {
    fetchLoja();
  }, [fetchLoja]);

  if (loading) return <div className="min-h-screen bg-[#1a1a1a]" />;
  if (!loja) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loja não encontrada.</div>;

  // Calculando média real
  const totalAvaliacoes = loja.avaliacoes?.length || 0;
  const somaNotas = loja.avaliacoes?.reduce((acc: any, curr: any) => acc + curr.nota, 0) || 0;
  const media = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : "N/A";
  const estrelasCheias = totalAvaliacoes > 0 ? Math.round(somaNotas / totalAvaliacoes) : 0;

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white font-sans">
      <Navbar />

      {/* BANNER DINÂMICO */}
      <section className="relative w-full h-[500px] overflow-hidden">
        {loja.banner_url ? (
            <img
            src={loja.banner_url}
            className="w-full h-full object-cover scale-100"
            alt="Banner"
            />
        ) : (
            <div className="w-full h-full bg-linear-to-r from-purple-900 to-black" />
        )}

        <div className="absolute inset-0 bg-linear-to-b from-black/90 to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col text-left">
            <h1 className="text-7xl font-semibold leading-none" style={{ fontFamily: "League Spartan, sans-serif" }}>
                {loja.nome}
            </h1>
            <span className="text-2xl opacity-80 mt-1 ml-1" style={{ fontFamily: "League Spartan, sans-serif" }}>
                {loja.categoria?.nome}
            </span>
          </div>
        </div>
      </section>

      {/* HEADER AVALIAÇÕES (MÉDIA REAL) */}
      <section className="text-2xl bg-black py-7 text-center">
        <h1>Avaliações</h1>

        <p className="text-4xl font-bold mb-3">{media}</p>
        
        <div className="text-yellow-400 text-3xl mb-6 tracking-widest">
            {"★".repeat(estrelasCheias)}
            {"☆".repeat(5 - estrelasCheias)}
        </div>

        <button
          onClick={() => setAbrirModalComent(true)}
          className="text-sm text-purple-300 hover:text-purple-200 underline"
        >
          adicionar review
        </button>
      </section>

      {/* LISTA DE AVALIAÇÕES (DADOS REAIS) */}
      <div className="w-full bg-black py-16 flex flex-col items-center gap-10 px-6">
        {loja.avaliacoes && loja.avaliacoes.length > 0 ? (
            loja.avaliacoes.map((avaliacao: any) => (
            <Comentario
                key={avaliacao.id}
                id={String(avaliacao.id)}
                // O backend manda um objeto usuario, pegamos o nome dele
                usuario={avaliacao.usuario?.nome || "Anônimo"}
                comentario={avaliacao.comentario}
                nota={avaliacao.nota}
                // Passamos a foto do perfil do usuário
                foto={avaliacao.usuario?.foto_perfil_url}
            />
            ))
        ) : (
            <div className="text-gray-500 text-xl">Seja o primeiro a avaliar!</div>
        )}
      </div>

      {/* MODAL INTEGRADO */}
      <ModalFazerAvaliacao
        isOpen={abrirModalComent}
        onClose={() => setAbrirModalComent(false)}
        lojaId={loja.id}             // Passando ID
        nomeDaLoja={loja.nome}       // Passando Nome
        onSuccess={() => {
            fetchLoja();             // Recarrega a lista após comentar
            setAbrirModalComent(false);
        }}
      />
    </div>
  );
}