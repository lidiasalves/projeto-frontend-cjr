"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface ModalFazerAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  nomeDaLoja?: string; 
}

const ModalFazerAvaliacao: React.FC<ModalFazerAvaliacaoProps> = ({ 
  isOpen, 
  onClose,
  nomeDaLoja = "Rare Beauty" 
}) => {
  
  const [rating, setRating] = useState(0);      
  const [hover, setHover] = useState(0);        
  const [comentario, setComentario] = useState(""); 

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ nota: rating, texto: comentario });
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
                  
                  style={!isActive ? { color: '#5E3C9E' } : {}} 
                />
              </button>
            );
          })}
        </div>


        <div className="w-full relative">
            <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Avaliação da loja"
            className="
                w-full h-64 
                bg-white rounded-[10px] p-6 
                text-lg text-gray-700 placeholder:text-gray-400 font-light
                resize-none 
                border-2 border-transparent
                focus:outline-none focus:border-blue-400 /* Borda azulada do Figma */
                shadow-sm
            "
            />
        </div>


        <button
            onClick={handleSubmit}
            disabled={rating === 0} 
            className={`
              w-full max-w-2xl py-3.5 rounded-full 
              text-white text-xl font-medium 
              shadow-[0_4px_10px_rgba(106,56,243,0.4)]
              bg-[#5E3C9E]

              ${rating === 0 
                ? "bg-gray-300 cursor-not-allowed" 
                : "hover:scale-105"        
              }
            `}
        >
            Avaliar
        </button>
      </div>
    </div>
  );
};

export default ModalFazerAvaliacao;