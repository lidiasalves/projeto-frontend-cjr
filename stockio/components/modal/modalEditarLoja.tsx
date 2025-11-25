"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { lojasMock } from "@/mock/lojasMock"; 
import { categoriesData } from "@/mock/categoriasMock";

const UploadArea = ({ label, icon, id }: { label: string; icon: string; id: string }) => (
  <label 
    htmlFor={id} 
    className="
      flex flex-col items-center justify-center 
      w-full h-40 
      border-2 border-dashed border-gray-300 rounded-lg 
      bg-gray-50 hover:bg-gray-100 
      cursor-pointer transition-colors
      group
    "
  >
    <div className="p-3 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">

       <Icon icon={icon} width="32" className="text-gray-400 group-hover:text-roxo" />
    </div>
    <p className="text-gray-500 font-medium text-sm">{label}</p>
    <input type="file" id={id} className="hidden" />
  </label>
);


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditarLoja: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;


  const loja = lojasMock.find((l) => l.nome === "Rare Beauty");

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      

      <div className="
        bg-[#EDEDED] 
        w-full max-w-4xl 
        max-h-[90vh] 
        rounded-[30px] 
        shadow-2xl 
        overflow-y-auto sem-barra /* Scroll interno se a tela for pequena */
        flex flex-col
      ">
        

        <div className="flex justify-between items-center p-8 pb-4">
          <h2 className="text-4xl font-normal text-black">Editar loja</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >

            <Icon icon="ph:x-bold" width="32" className="text-gray-600" />
          </button>
        </div>


<div className="p-8 pt-0 flex flex-col gap-6">
          

          <div className="w-full">
            <input 
              type="text" 
              defaultValue={loja?.nome || "Nome da Loja"}
              placeholder="Nome da Loja"
              className="
                w-full 
                bg-white rounded-full 
                h-16 px-8 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-roxo
                shadow-sm
              "
            />
          </div>

          <div className="relative w-full">
            <select
              className="
                w-full 
                bg-white rounded-full 
                h-16 px-8 pr-12 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-roxo
                shadow-sm
                appearance-none 
                cursor-pointer
                capitalize  /* <-- Faz o texto selecionado ficar Capitalizado visualmente */
              "
              defaultValue="" 
            >
              <option value="" disabled>Selecione uma categoria</option>
              

              {categoriesData.map((category) => (
                <option key={category.id} value={category.name} className="capitalize">
                  {category.name}
                </option>
              ))}
              
            </select>
            

            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <Icon icon="ph:caret-down" width="24" />
            </div>
          </div>


          <UploadArea 
            id="upload-perfil" 
            label="Anexe a foto de perfil de sua loja" 
            icon="ph:user-circle-light"
          />


          <UploadArea 
            id="upload-logo" 
            label="Anexe a logo em SVG de sua loja" 
            icon="ph:image-square-light"
          />


          <UploadArea 
            id="upload-banner" 
            label="Anexe o banner de sua loja" 
            icon="ph:monitor-light"
          />


          <div className="flex flex-col md:flex-row gap-4 mt-8">
            

            <button className="
              w-full md:flex-1 
              h-16 rounded-full 
              bg-red-600 hover:bg-red-700 
              text-white text-xl font-medium
              transition-colors shadow-md
              flex items-center justify-center
            ">
              DELETAR
            </button>


            <button className="
              w-full md:w-auto 
              h-14 px-16 rounded-full 
              bg-[#5E3C9E] hover:bg-[#4c2f85] 
              text-white text-xl font-medium
              transition-colors shadow-md
              flex items-center justify-center
              self-center md:self-auto
            ">
              Salvar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalEditarLoja;