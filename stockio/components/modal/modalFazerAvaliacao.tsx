"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";

interface ModalFazerAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Para recarregar a tela após avaliar
  nomeDaLoja?: string; 
  lojaId: number; // <--- OBRIGATÓRIO: Precisamos saber qual loja é
}

const ModalFazerAvaliacao: React.FC<ModalFazerAvaliacaoProps> = ({ 
  isOpen, 
  onClose,
  onSuccess,
  nomeDaLoja = "Loja",
  lojaId
}) => {
  
  const [rating, setRating] = useState(0);      
  const [hover, setHover] = useState(0);        
  const [comentario, setComentario] = useState(""); 
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // 1. Validações
    if (rating === 0) {
      toast.warning("Escolha uma nota de 1 a 5 estrelas!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Você precisa estar logado para avaliar.");
      return;
    }

    try {
      setLoading(true);

      // 2. Monta o Payload igual ao DTO do Back-end (create-avaliacaoloja.dto.ts)
      const payload = {
        nota: rating,
        comentario: comentario,
        LojaId: Number(lojaId),
        UsuarioId: Number(userId)
      };

      // 3. Envia para o Back (Assumindo a rota /avaliacao/loja)
      await axios.post("http://localhost:3001/avaliacao/loja", payload);

      toast.success("Avaliação enviada com sucesso!");
      
      // Limpa os campos
      setRating(0);
      setComentario("");
      
      if (onSuccess) onSuccess(); // Atualiza a página de trás
      onClose();

    } catch (error: any) {
      console.error("Erro ao avaliar:", error);
      const msg = error.response?.data?.message || "Erro ao enviar avaliação.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose} 
    >
      
      <div 
        className="
          relative w-full max-w-3xl 
          bg-[#ECECEC] rounded-[30px] shadow-2xl 
          p-8 md:p-12
          flex flex-col items-center gap-8
        "
        onClick={(e) => e.stopPropagation()} 
      >
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:text-gray-600 transition-colors"
        >
          <Icon icon="ph:x-bold" width="32" />
        </button>
      
        <h2 className="text-2xl md:text-3xl font-extralight text-center text-black">
          Você está avaliando <span className="font-medium">{nomeDaLoja}</span>
        </h2>

        {/* Estrelas */}
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = star <= (hover || rating);
            
            return (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Icon 
                  icon={isActive ? "ph:star-fill" : "ph:star-light"} 
                  width="56" 
                  className={`
                    transition-colors duration-200
                    ${isActive ? "text-[#5E3C9E]" : "text-gray-400"} 
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Área de Texto */}
        <div className="w-full relative">
            <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Conte sua experiência com esta loja..."
            className="
                w-full h-64 
                bg-white rounded-[10px] p-6 
                text-lg text-gray-700 placeholder:text-gray-400 font-light
                resize-none 
                border-2 border-transparent
                focus:outline-none focus:border-[#5E3C9E]
                shadow-sm
            "
            />
        </div>

        {/* Botão Enviar */}
        <button
            onClick={handleSubmit}
            disabled={loading || rating === 0} 
            className={`
              w-full max-w-2xl py-3.5 rounded-full 
              text-white text-xl font-medium 
              shadow-[0_4px_10px_rgba(106,56,243,0.4)]
              transition-all
              ${(loading || rating === 0)
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[#5E3C9E] hover:scale-105"        
              }
            `}
        >
            {loading ? "Enviando..." : "Avaliar"}
        </button>
      </div>
    </div>
  );
};

export default ModalFazerAvaliacao;