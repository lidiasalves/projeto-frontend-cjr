"use client"; // 1. Define que roda no navegador
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { on } from "events";


interface ModalEditarComentarioProps {
  isOpen: boolean;                       
  onClose: () => void;                   
  comentarioAtual: string;               
  onSalvar: (novoTexto: string) => void; 
}

const ModalEditarComentario: React.FC<ModalEditarComentarioProps> = ({
  isOpen,
  onClose,
  comentarioAtual,
  onSalvar,
}) => {
  

  const [texto, setTexto] = useState(comentarioAtual);

  useEffect(() => {
    setTexto(comentarioAtual);
  }, [isOpen, comentarioAtual]);


  if (!isOpen) return null;

  const handleSalvar = () => {
    if (texto.trim() === "") return; 
    onSalvar(texto); 
    onClose(); 
  };


  return (
    //overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    onClick = {onClose}>

      
      <div className="relative w-full max-w-3xl bg-[#EDEDED] rounded-4xl shadow-2xl p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}>
        
        <div className = "flex justify-end items-end mb-4">
          <button onClick={onClose} className="text-black p-1">
            <Icon icon="ph:x-bold" width="32" />
          </button>
        </div>
        
      <textarea
        
        onChange={(e) => setTexto(e.target.value)}
        className="w-full h-64 bg-white rounded-3xl p-6 text-medium text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-roxo shadow-sm"
        placeholder="Comentário"
      />
        
        <div className="flex justify-center mt-2 pb-2">
          <button
            onClick={handleSalvar}
            disabled={texto.trim().length === 0}
            className={`
              w-full max-w-2xl py-3.5 rounded-full 
              text-white text-xl font-medium 
              shadow-[0_4px_10px_rgba(106,56,243,0.4)]
              bg-[#5E3C9E]

              ${texto.trim().length === 0 
                ? "bg-gray-400 cursor-not-allowed opacity-70" 
                : "bg-roxo hover:bg-[#4c2f85] hover:shadow-lg hover:-translate-y-0.5"
              }
            `}
          >
            Avaliar
          </button>
      </div>
      </div>
    </div>

  )
};

export default ModalEditarComentario;