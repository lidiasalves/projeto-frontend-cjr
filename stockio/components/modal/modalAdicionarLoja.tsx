"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { categoriesData } from "@/mock/categoriasMock"; 

const UploadArea = ({ label, icon, id }: { label: string; icon: string; id: string }) => (
  <label 
    htmlFor={id} 
    className="
      flex flex-col items-center justify-center 
      w-full h-40 
      border-2 border-dashed rounded-2xl 
      bg-gray-50/50 hover:bg-gray-100 
      cursor-pointer transition-colors
      group border-purple-200
    "
  >
    <div className="p-3 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
       <Icon icon={icon} width="32" className="text-gray-400 group-hover:text-[#5E3C9E]" />
    </div>
    <p className="text-gray-500 font-medium text-sm text-center px-4">{label}</p>
    <input type="file" id={id} className="hidden" />
  </label>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAdicionarLoja: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");

  if (!isOpen) return null;

  const handleAdicionar = () => {
    console.log("Criando loja:", { nome, categoria });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      
      <div 
        className="
          bg-[#EDEDED] 
          w-full 
          max-w-4xl 
          max-h-[90vh] 
          rounded-[30px] 
          shadow-2xl 
          overflow-y-auto sem-barra
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex justify-between items-center p-8 pb-4 relative">
          <h2 className="text-3xl md:text-4xl font-normal text-black w-full text-center">
            Adicionar loja
          </h2>
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Icon icon="ph:x-bold" width="32" className="text-black" />
          </button>
        </div>

        <div className="p-8 pt-2 flex flex-col gap-5">
          
          {/* Input: Nome */}
          <div className="w-full">
            <input 
              type="text" 
              placeholder="Nome da loja"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="
                w-full 
                bg-white rounded-full 
                h-16 
                px-8 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#5E3C9E]
                shadow-sm
              "
            />
          </div>

          {/* Select: Categoria */}
          <div className="relative w-full">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="
                w-full 
                bg-white rounded-full 
                h-16 /* Ajustei para h-16 para ficar igual ao Editar */
                px-8 pr-12 
                text-xl text-black 
                focus:outline-none focus:ring-2 focus:ring-[#5E3C9E]
                shadow-sm
                appearance-none cursor-pointer
                capitalize
                placeholder:text-gray-400
              "
            >
              <option value="" disabled className="text-gray-400">Categoria</option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.name} className="capitalize">
                  {cat.name}
                </option>
              ))}
            </select>
            
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <Icon icon="ph:caret-down" width="24" />
            </div>
          </div>

          <div className="space-y-4 border-2 border-dashed border-[#5E3C9E]/30 rounded-3xl p-4 md:p-6 mt-2">
            <UploadArea id="add-perfil" label="Anexe a foto de perfil de sua loja" icon="ph:user-circle-light" />
            <UploadArea id="add-logo" label="Anexe a logo em SVG de sua loja" icon="ph:image-square-light" />
            <UploadArea id="add-banner" label="Anexe o banner de sua loja" icon="ph:monitor-light" />
          </div>

          <div className="flex justify-center mt-4">
            <button 
              onClick={handleAdicionar}
              className="
                w-full md:w-2/3
                h-14 rounded-full 
                bg-[#5E3C9E] hover:bg-[#4c2f85] 
                text-white text-xl font-medium
                transition-all shadow-lg hover:scale-[1.02]
              "
            >
              Adicionar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarLoja;