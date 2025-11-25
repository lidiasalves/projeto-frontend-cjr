"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

interface ModalEditarAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  nomeDaLoja: string;
  
  // Dados atuais para preencher o modal
  avaliacaoAtual: {
    nota: number;
    texto: string;
  };

  // Funções de ação
  onSalvar: (dados: { nota: number; texto: string }) => void;
  onDeletar: () => void;
}

const ModalEditarAvaliacao: React.FC<ModalEditarAvaliacaoProps> = ({ 
  isOpen, 
  onClose,
  nomeDaLoja,
  avaliacaoAtual,
  onSalvar,
  onDeletar
}) => {
  
  // Estados locais inicializados com os dados atuais
  const [rating, setRating] = useState(avaliacaoAtual.nota);      
  const [hover, setHover] = useState(0);        
  const [comentario, setComentario] = useState(avaliacaoAtual.texto); 

  // EFEITO DE EDIÇÃO:
  // Sempre que o modal abre ou os dados mudam, atualiza os estados locais.
  useEffect(() => {
    if (isOpen) {
      setRating(avaliacaoAtual.nota);
      setComentario(avaliacaoAtual.texto);
    }
  }, [isOpen, avaliacaoAtual]);

  if (!isOpen) return null;

  const handleSalvar = () => {
    onSalvar({ nota: rating, texto: comentario });
    onClose();
  };

  const handleDeletar = () => {
    // Talvez você queira um "confirm('Tem certeza?')" aqui antes
    onDeletar();
    onClose();
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
          flex flex-col items-center gap-6
          max-h-[90vh] overflow-y-auto sem-barra /* Responsividade */
        "
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* BOTÃO FECHAR */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:text-gray-600 transition-colors"
        >
          <Icon icon="ph:x-bold" width="32" />
        </button>

        {/* TÍTULO */}
        <h2 className="text-2xl md:text-3xl font-light text-center text-black">
          Você está avaliando <span className="font-bold">{nomeDaLoja}</span>
        </h2>

        {/* ESTRELAS (Preenchidas com Roxo) */}
        <div className="flex justify-center gap-4 mb-2">
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
                  className={`transition-colors duration-200 ${isActive ? "text-[#5E3C9E]" : "text-gray-300"}`}
                />
              </button>
            );
          })}
        </div>

        {/* TEXTAREA */}
        <div className="w-full relative">
            <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Avaliação da loja"
            className="
                w-full h-56 
                bg-white rounded-[10px] p-6 
                text-lg text-gray-700 placeholder:text-gray-400 font-light
                resize-none 
                border-2 border-transparent
                focus:outline-none focus:border-blue-400
                shadow-sm
            "
            />
        </div>

        {/* --- ÁREA DOS BOTÕES (Stack Vertical) --- */}
        <div className="w-full max-w-2xl flex flex-col gap-4 mt-2">
            
            {/* 1. BOTÃO DELETAR (Vermelho) */}
            <button
                onClick={handleDeletar}
                className="
                  w-full py-3.5 rounded-full 
                  bg-[#FF0000] hover:bg-red-700
                  text-white text-xl font-bold uppercase tracking-wide
                  shadow-md transition-all hover:scale-[1.02]
                "
            >
                Deletar
            </button>

            {/* 2. BOTÃO SALVAR (Roxo) */}
            <button
                onClick={handleSalvar}
                disabled={rating === 0} 
                className={`
              w-full max-w-2xl py-3.5 rounded-full 
              text-white text-xl font-medium 
              shadow-[0_4px_10px_rgba(106,56,243,0.4)]
              bg-[#5E3C9E]
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[#5E3C9E]"
                  }
                `}
            >
                Salvar
            </button>
        </div>

      </div>
    </div>
  );
};

export default ModalEditarAvaliacao;