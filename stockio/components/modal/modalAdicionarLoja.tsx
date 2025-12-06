"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Plus } from "lucide-react"; // Importando ícone Plus
import { categoriesData } from "@/mock/categoriasMock"; 
import { api } from "@/services/api"; 

// --- Componente FotoUpload Atualizado ---
interface FotoUploadProps {
  label?: string; // Texto opcional (ex: "Adicionar foto")
  id: string;
  preview: string | null; 
  onFileChange: (file: File) => void;
  width?: string | number;
  height?: string | number;
}

const FotoUpload = ({ label = "Adicionar foto", id, preview, onFileChange, width = "100%", height = "10rem" }: FotoUploadProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <label
      htmlFor={id}
      style={{ width, height }}
      className={`
        border-2 border-dashed border-purple-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition relative overflow-hidden
        ${preview ? 'border-purple-600' : ''}
      `}
    >
      {preview ? (
        <img 
          src={preview} 
          alt="Preview" 
          className="w-full h-full object-cover absolute inset-0" 
        />
      ) : (
        <div className="flex flex-col items-center z-10">
          <Plus size={24} className="text-purple-500 mb-1" />
          <span className="text-purple-500 text-xs text-center px-2">{label}</span>
        </div>
      )}

      {/* Input escondido */}
      <input 
        type="file" 
        id={id} 
        className="hidden" 
        accept="image/*" 
        onChange={handleChange}
      />

      {/* Botão de editar sobreposto (opcional) */}
      {preview && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
          <Plus size={32} className="text-white rotate-45" /> {/* Ícone de X ou Editar */}
        </div>
      )}
    </label>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ModalAdicionarLoja: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [nome, setNome] = useState("");
  const [categoriaNome, setCategoriaNome] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados Visuais (Previews)
  const [perfilPreview, setPerfilPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Estados dos Arquivos Reais (Bytes)
  const [perfilFile, setPerfilFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageSelect = (file: File, type: 'perfil' | 'logo' | 'banner') => {
    // Cria URL local para mostrar na tela instantaneamente
    const objectUrl = URL.createObjectURL(file);
    
    if (type === 'perfil') {
      setPerfilFile(file);
      setPerfilPreview(objectUrl);
    } else if (type === 'logo') {
      setLogoFile(file);
      setLogoPreview(objectUrl);
    } else if (type === 'banner') {
      setBannerFile(file);
      setBannerPreview(objectUrl);
    }
  };

  const handleAdicionar = async () => {
    if (!nome || !categoriaNome) {
      alert("Por favor, preencha o nome e escolha uma categoria.");
      return;
    }

    const categoriaSelecionada = categoriesData.find(c => c.name === categoriaNome);
    const categoriaId = categoriaSelecionada ? categoriaSelecionada.id : 1;

    try {
      setLoading(true);

      const formData = new FormData();
      
      formData.append('nome', nome);
      formData.append('UsuarioId', '1'); 
      formData.append('CategoriaId', String(categoriaId));

      if (perfilFile) formData.append('perfil', perfilFile);
      if (logoFile) formData.append('logo', logoFile);
      if (bannerFile) formData.append('banner', bannerFile);

      await api.post('/loja', formData);

      alert("Loja criada com sucesso!");
      
      // Limpeza
      setNome("");
      setCategoriaNome("");
      setPerfilFile(null); setPerfilPreview(null);
      setLogoFile(null); setLogoPreview(null);
      setBannerFile(null); setBannerPreview(null);
      
      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.error("Erro ao criar loja:", error);
      alert("Erro ao criar loja. Verifique o backend.");
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
          bg-[#EDEDED] w-full max-w-4xl max-h-[90vh] rounded-[30px] shadow-2xl 
          overflow-y-auto sem-barra flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-8 pb-4 relative">
          <h2 className="text-3xl md:text-4xl font-normal text-black w-full text-center">Adicionar loja</h2>
          <button onClick={onClose} className="absolute right-8 top-8 p-1 hover:bg-gray-200 rounded-full transition-colors">
            <Icon icon="ph:x-bold" width="32" className="text-black" />
          </button>
        </div>

        <div className="p-8 pt-2 flex flex-col gap-5">
          <div className="w-full">
            <input 
              type="text" 
              placeholder="Nome da loja"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
              className="w-full bg-white rounded-full h-16 px-8 text-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E3C9E] shadow-sm disabled:opacity-50"
            />
          </div>

          <div className="relative w-full">
            <select
              value={categoriaNome}
              onChange={(e) => setCategoriaNome(e.target.value)}
              disabled={loading}
              className="w-full bg-white rounded-full h-16 px-8 pr-12 text-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5E3C9E] shadow-sm appearance-none cursor-pointer capitalize placeholder:text-gray-400 disabled:opacity-50"
            >
              <option value="" disabled className="text-gray-400">Selecionar Categoria</option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.name} className="capitalize">{cat.name}</option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <Icon icon="ph:caret-down" width="24" />
            </div>
          </div>

          {/* Área de Uploads com o novo componente FotoUpload */}
          <div className="space-y-4 border-2 border-dashed border-[#5E3C9E]/30 rounded-3xl p-4 md:p-6 mt-2">
            
            <FotoUpload 
              id="add-perfil" 
              label="Foto de perfil" 
              preview={perfilPreview}
              onFileChange={(file) => handleImageSelect(file, 'perfil')}
            />
            
            <FotoUpload 
              id="add-logo" 
              label="Logo da loja" 
              preview={logoPreview}
              onFileChange={(file) => handleImageSelect(file, 'logo')}
            />
            
            <FotoUpload 
              id="add-banner" 
              label="Banner da loja" 
              preview={bannerPreview}
              onFileChange={(file) => handleImageSelect(file, 'banner')}
            />
          </div>

          <div className="flex justify-center mt-4 pb-4">
            <button 
              onClick={handleAdicionar}
              disabled={loading}
              className="w-full md:w-2/3 h-14 rounded-full bg-[#5E3C9E] hover:bg-[#4c2f85] text-white text-xl font-medium transition-all shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icon icon="eos-icons:loading" width={24} />
                  Enviando arquivos...
                </>
              ) : (
                "Adicionar Loja"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarLoja;