"use client";
import { useState } from "react";

// Mantivemos sua interface
interface Categoria {
  id: number;
  name: string;
  icon: string;
  href?: string; // Adicionado opcional para evitar erro de TS se vier do mock
}

// 1. MUDANÇA NAS PROPS: Para casar com o que a 'PaginaLojas' envia
interface Props {
  categorias?: Categoria[];              // Antes era 'items'
  categoriasSelecionadas?: string[];     // Novo: Recebe do pai
  onChange?: (categoriaNome: string) => void; // Novo: Avisa o pai
  className?: string;
}

const FiltroCategoria = ({ 
  categorias = [], 
  categoriasSelecionadas = [], 
  onChange = () => {}, 
  className = "" 
}: Props) => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  // 2. REMOVIDO: const [selected, setSelected] = useState...
  // O estado agora vive na PaginaLojas (no pai).

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex justify-between items-center w-full py-3 px-6 rounded-full bg-white text-[#5E3C9E] font-medium shadow-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Usamos 'categoriasSelecionadas' que veio do pai */}
        <span className="capitalize">
            {categoriasSelecionadas.length ? `${categoriasSelecionadas.length} selecionado(s)` : "Filtros"}
        </span>
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl p-4 z-50
                     right-0 left-auto min-w-[220px] max-w-[420px]"
        >
          <h4 className="text-sm font-semibold text-[#5E3C9E] mb-3">Categorias</h4>

          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto sem-barra"> {/* Adicionei scroll por segurança */}
            {categorias.map((cat) => {
              // 3. LÓGICA ATUALIZADA: Verifica se está no array do pai
              const checked = categoriasSelecionadas.includes(cat.name);
              
              return (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 cursor-pointer select-none"
                  // 4. AÇÃO: Chama a função do pai
                  onClick={() => onChange(cat.name)}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition
                      ${checked ? "bg-[#5E3C9E] border-[#5E3C9E]" : "border-[#5E3C9E] bg-white"}`}
                  >
                    {checked ? <span className="w-2.5 h-2.5 bg-white rounded-full" /> : null}
                  </span>

                  <span className="flex-1 text-sm capitalize text-gray-700">{cat.name}</span>

                  <img src={cat.icon} alt={cat.name} className="w-5 h-5 opacity-80" />
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroCategoria;