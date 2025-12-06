"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Send, Pencil } from "lucide-react";
import NavbarLogada from "@/components/header/navbar";
import { toast } from "react-toastify";

// Se tiver o modal de editar comentário pronto, importe aqui
// import ModalEditarComentario from "@/components/modal/modalEditarComentario";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();

  // IDs da URL
  const lojaId = params.lojaId;
  const avaliacaoId = params.id;

  // Estados
  const [review, setReview] = useState<any>(null);
  const [respostas, setRespostas] = useState<any[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [loading, setLoading] = useState(true);
  const [myUserId, setMyUserId] = useState<number | null>(null);

  // Estados de Modal
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [comentarioParaEditar, setComentarioParaEditar] = useState<any>(null);

  // 1. Busca quem sou eu (para saber se posso editar)
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setMyUserId(Number(id));
  }, []);

  // 2. Busca a Avaliação Principal + Respostas
  const fetchReview = useCallback(async () => {
    try {
      if (!avaliacaoId) return;

      // Chama endpoint específico (ajuste se seu back for diferente)
      // Como o controller é 'avaliacao/loja/:id', usamos essa rota
      const res = await axios.get(`http://localhost:3001/avaliacao/loja/${avaliacaoId}`);

      setReview(res.data);
      // O endpoint pode retornar as respostas dentro do objeto (ex: res.data.comentarios)
      if (res.data.comentarios) {
        setRespostas(res.data.comentarios);
      }
    } catch (error) {
      console.error("Erro ao buscar review:", error);
      toast.error("Erro ao carregar avaliação.");
    } finally {
      setLoading(false);
    }
  }, [avaliacaoId]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  // 3. Função para Enviar Resposta (Comentário na Avaliação)
  const handleEnviarResposta = async () => {
    if (!novoComentario.trim()) return;
    if (!myUserId) {
      toast.error("Faça login para comentar.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/avaliacao/comentario", {
        conteudo: novoComentario,
        UsuarioId: myUserId,
        AvaliacaoId: Number(avaliacaoId) // Vincula a esta review
      });

      toast.success("Resposta enviada!");
      setNovoComentario("");
      fetchReview(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar resposta.");
    }
  };

  // Função para abrir o modal de edição
  const handleEditar = (comentario: any) => {
    setComentarioParaEditar(comentario);
    setModalEditarOpen(true);
    // Aqui você integraria com o seu modal real
    console.log("Abrindo modal editar para:", comentario);
    toast.info("Modal de editar abriria aqui!");
  };

  if (loading) return <div className="min-h-screen bg-black" />;
  if (!review) return <div className="min-h-screen bg-black text-white flex justify-center items-center">Avaliação não encontrada.</div>;

  return (
    <main className="min-h-screen w-full bg-black text-white font-league flex flex-col">

      {/* 🔵 NAVBAR */}
      <NavbarLogada />

      {/* ======================= */}
      {/* 🔹 SEÇÃO SUPERIOR (DARK) - AVALIAÇÃO PRINCIPAL */}
      {/* ======================= */}
      <section className="bg-black text-white px-6 lg:px-20 pt-8 lg:pt-16 pb-20">

        {/* Header */}
        <div className="flex items-center justify-between max-w-[1500px] mx-auto">

          <div className="flex items-center gap-6 lg:gap-10">
            <button
              onClick={() => router.back()}
              className="hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>

            {/* Avatar Reviewer */}
            <div className="relative">
                <img
                src={review.usuario?.foto_perfil_url || "/images/default-user.png"}
                width={90}
                height={90}
                alt={review.usuario?.nome || "User"}
                className="rounded-full object-cover w-[90px] h-[90px] lg:w-[120px] lg:h-[120px]"
                />
            </div>

            {/* Nome + tempo (data) */}
            <div className="flex flex-col">
              <p className="text-2xl lg:text-4xl font-semibold">{review.usuario?.nome}</p>
              <span className="text-lg lg:text-xl opacity-70">
                {new Date(review.criado_em).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="text-yellow-400 text-3xl lg:text-5xl tracking-widest">
            {"★".repeat(review.nota)}
            <span className="text-gray-600">{"★".repeat(5 - review.nota)}</span>
          </div>
        </div>

        {/* Texto da Review */}
        <p className="text-xl lg:text-3xl mt-12 opacity-90 leading-relaxed max-w-[1500px] mx-auto font-light">
          {review.comentario}
        </p>
      </section>

      {/* ==================================== */}
      {/* 🔸 THREAD DE RESPOSTAS (LIGHT MODE) */}
      {/* ==================================== */}
      <section className="relative flex-1 bg-[#EFEFEF] text-black px-8 lg:px-36 py-16 pb-28">

        <div className="relative max-w-[1400px] mx-auto">

          {/* Linha Vertical */}
          <div className="absolute left-[27.5px] lg:left-[35px] top-0 bottom-24 w-0.5 bg-neutral-300 transform -translate-x-1/2" />

          {respostas.map((resposta: any) => {
            const isMe = myUserId === resposta.UsuarioId;
            // 💡 NOVA LÓGICA: Verifica se o autor da resposta é o proprietário da loja
            // Assumindo que o ID do proprietário da loja está em review.loja?.UsuarioId
            const isStoreOwner = resposta.UsuarioId === review.loja?.UsuarioId;

            return (
              <div
                key={resposta.id}
                className="flex gap-6 lg:gap-10 mb-16 relative items-start group"
              >
                {/* Avatar Resposta */}
                <div className="relative z-10 shrink-0">
                    <img
                    src={resposta.usuario?.foto_perfil_url || "/images/default-user.png"}
                    width={55}
                    height={55}
                    alt={resposta.usuario?.nome}
                    className="rounded-full object-cover bg-[#EFEFEF] border-4 border-[#EFEFEF] lg:w-[70px] lg:h-[70px]"
                    />
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col mt-1 w-full">

                    <div className="flex items-center gap-2">
                        {/* Nome */}
                        <p className="font-semibold text-lg lg:text-xl">
                            {resposta.usuario?.nome}
                        </p>
                        
                        {/* 🎯 BADGE DONO DA LOJA */}
                        {isStoreOwner && (
                            <span className="text-xs font-bold text-[#5E3C9E] bg-[#5E3C9E]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Store Owner
                            </span>
                        )}

                        {/* ÍCONE DE EDITAR (Só aparece se for meu comentário) */}
                        {isMe && (
                            <button
                                onClick={() => handleEditar(resposta)}
                                className="ml-2 text-[#5E3C9E] hover:bg-purple-100 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                title="Editar meu comentário"
                            >
                                <Pencil size={18} />
                            </button>
                        )}
                    </div>

                    {/* Texto */}
                    <p className="text-base lg:text-lg text-neutral-700 mt-3 max-w-3xl leading-relaxed lg:leading-[1.8]">
                        {resposta.conteudo}
                    </p>
                </div>
              </div>
            );
          })}

          {/* =============================== */}
          {/* 🔻 INPUT DE RESPOSTA */}
          {/* =============================== */}
          <div className="relative z-20 w-full bg-white rounded-full px-6 lg:px-10 py-4 lg:py-5 shadow-md flex items-center justify-between mt-6 lg:mt-12">
            <input
              type="text"
              placeholder="Responder comentário..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              // ✅ Comentário Automático no ENTER
              onKeyDown={(e) => e.key === "Enter" && handleEnviarResposta()}
              className="flex-1 outline-none text-black text-base lg:text-xl"
            />

            <button 
                onClick={handleEnviarResposta}
                disabled={!novoComentario.trim()} // Desabilita se vazio
            >
              <Send className={`w-6 h-6 lg:w-8 lg:h-8 transition-transform ${
                novoComentario.trim() 
                ? "text-[#5E3C9E] hover:scale-110" 
                : "text-neutral-400 cursor-not-allowed"
              }`} />
            </button>
          </div>

        </div>
      </section>

      {/* MODAL EDITAR (FUTURO) */}
      {/* <ModalEditarComentario 
            isOpen={modalEditarOpen} 
            onClose={() => setModalEditarOpen(false)}
            comentario={comentarioParaEditar}
        /> 
      */}

    </main>
  );
}