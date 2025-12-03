"use client";
import React from "react";
import Image from "next/image";
import { useDragScroll } from "@/components/hooks/useDragScroll";
import { categoriesData } from "@/mock/categoriasMock"; 
interface HeaderCategoriasProps {
  categoriasSelecionadas: string[]; 
  onToggleCategoria: (cat: string) => void;
}

const HeaderCategorias: React.FC<HeaderCategoriasProps> = ({ 
  categoriasSelecionadas, 
  onToggleCategoria 
}) => {
  

  const { carrosselRef, ...dragHandlers } = useDragScroll();

  return (
    <div className="w-full bg-black text-white py-8">
      

      <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto">
        
        <h2 className="text-2xl font-semibold mb-6">Categoria</h2>


        <div 
          ref={carrosselRef}
          {...dragHandlers}
          className="flex gap-40 overflow-x-auto cursor-grab select-none sem-barra pb-2"
        >
          {categoriesData.map((category) => {
            
            const isSelected = categoriasSelecionadas.includes(category.name);

            return (
              <button
                key={category.id}
                onClick={() => onToggleCategoria(category.name)}
                className={`
                  shrink-0
                  flex flex-col items-center justify-center
                  w-24 h-24 rounded-[20px]
                  transition-all duration-200
                  group

                  
                  /* Estilo Condicional (Selecionado vs Não Selecionado) */
                  ${isSelected 
                    ? "bg-[#5E3C9E] text-white scale-105 shadow-lg shadow-purple-900/50" 
                    : "bg-white text-black hover:bg-gray-100"
                  }
                `}
              >

                <div className="w-10 h-10 relative mb-1">
                  <Image 
                    src={category.icon} 
                    alt={category.name}
                    fill
                    className={`object-contain ${isSelected ? "brightness-0 invert" : ""}`} 

                  />
                </div>


                <span className="text-xs font-semibold capitalize">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HeaderCategorias;