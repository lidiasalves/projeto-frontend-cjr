"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { api } from "@/services/api"; 
import { categoriesData } from "@/mock/categoriasMock"; 

const UploadArea = ({ label, icon, id }: { label: string; icon: string; id: string }) => (
  <label 
    htmlFor={id} 
    className="
      flex flex-col items-center justify-center 
      w-full h-40 
      border-2 border-dashed border-gray-300 rounded-2xl 
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

interface LojaData {
  id: number;
  nome: string;
  categoria: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loja: LojaData; // O dado do banco vem aqui
  onSucesso: () => void; 
}

const ModalEditarLoja: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  loja, 
  onSucesso 
}) => {
  
  // 1. INICIALIZAÇÃO: O estado começa com o nome que veio do banco
  const [nome, setNome] = useState(loja?.nome || "");
  const [categoria, setCategoria] = useState(loja?.categoria || "");
  const [loading, setLoading] = useState(false);

  // 2. SINCRONIZAÇÃO: Se a loja mudar (ex: abriu outra), atualiza os campos
  useEffect(() => {
    if (isOpen && loja) {
      setNome(loja.nome);
      setCategoria(loja.categoria);
    }
  }, [isOpen, loja]);

  if (!isOpen) return null;

  const handleSalvar = async () => {
    if (!nome || !categoria) return alert("Preencha nome e categoria!");

    try {
      setLoading(true);
      await api.put(`/loja/${loja.id}`, { nome, categoria });
      console.log("Loja atualizada!");
      onSucesso(); 
      onClose();   
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
      alert("Erro ao salvar alterações.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async () => {
    if (!confirm(`Tem certeza que deseja deletar a loja "${loja.nome}"?`)) return;

    try {
      setLoading(true);
      await api.delete(`/loja/${loja.id}`);
      console.log("Loja deletada!");
      onSucesso(); 
      onClose();   
    } catch (error) {
      console.error("Erro ao deletar loja:", error);
      alert("Erro ao deletar loja.");
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
          bg-[#EDEDED] 
          w-full max-w-4xl 
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
            Editar loja
          </h2>
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Icon icon="ph:x-bold" width="32" className="text-black" />
          </button>
        </div>

        <div className="p-8 pt-2 flex flex-col gap-6">
          
          {/* CAMPO DE NOME */}
          <div className="w-full">
            <input 
              type="text" 
              placeholder="Nome da Loja"
              // 3. VINCULAÇÃO: O input mostra o valor do estado 'nome'
              value={nome} 
              // 4. EDIÇÃO: Ao digitar, atualiza o estado (mas não o banco ainda)
              onChange={(e) => setNome(e.target.value)}
              className="
                w-full 
                bg-white rounded-full 
                h-16 px-8 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#5E3C9E]
                shadow-sm
              "
            />
          </div>

          <div className="relative w-full">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="
                w-full bg-white rounded-full h-16 px-8 pr-12 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#5E3C9E]
                shadow-sm appearance-none cursor-pointer capitalize
              "
            >
              <option value="" disabled>Selecione uma categoria</option>
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
            <UploadArea id="edit-perfil" label="Anexe a foto de perfil de sua loja" icon="ph:user-circle-light" />
            <UploadArea id="edit-logo" label="Anexe a logo em SVG de sua loja" icon="ph:image-square-light" />
            <UploadArea id="edit-banner" label="Anexe o banner de sua loja" icon="ph:monitor-light" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            
            <button 
              onClick={handleDeletar}
              disabled={loading}
              className="
                w-full md:flex-1 
                h-16 rounded-full 
                bg-red-600 hover:bg-red-700 
                text-white text-xl font-medium
                transition-colors shadow-md
                flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "..." : "DELETAR"}
            </button>

            <button 
              onClick={handleSalvar}
              disabled={loading}
              className="
                w-full md:w-auto px-16
                h-16 rounded-full 
                bg-[#5E3C9E] hover:bg-[#4c2f85] 
                text-white text-xl font-medium
                transition-colors shadow-md
                flex items-center justify-center
                self-center md:self-auto
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalEditarLoja;