"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Plus } from "lucide-react";
import { api } from "@/services/api"; 
import { categoriesData } from "@/mock/categoriasMock"; 

// --- Componente FotoUpload Reutilizável ---
interface FotoUploadProps {
  label?: string;
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

      <input 
        type="file" 
        id={id} 
        className="hidden" 
        accept="image/*" 
        onChange={handleChange}
      />

      {preview && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
          <Plus size={32} className="text-white rotate-45" />
        </div>
      )}
    </label>
  );
};

interface LojaData {
  id: number;
  nome: string;
  categoria: string;
  // Opcional: Se o backend já retornar as URLs das imagens, podemos usar aqui para mostrar o preview inicial
  sticker_url?: string;
  logo_url?: string;
  banner_url?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  loja: LojaData;
  onSucesso: () => void; 
}

const ModalEditarLoja: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  loja, 
  onSucesso 
}) => {
  
  // 1. Estados de Texto
  const [nome, setNome] = useState(loja?.nome || "");
  const [categoria, setCategoria] = useState(loja?.categoria || "");
  const [loading, setLoading] = useState(false);

  // 2. Estados de Arquivos (Files)
  const [perfilFile, setPerfilFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  // 3. Estados de Preview (URLs)
  const [perfilPreview, setPerfilPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // 4. SINCRONIZAÇÃO: Atualiza campos quando a loja muda ou modal abre
  useEffect(() => {
    if (isOpen && loja) {
      setNome(loja.nome);
      setCategoria(loja.categoria);
      
      // Se a loja já tiver imagens vindas do banco, definimos o preview inicial aqui
      // Exemplo: setPerfilPreview(loja.sticker_url || null);
      setPerfilPreview(loja.sticker_url || null);
      setLogoPreview(loja.logo_url || null);
      setBannerPreview(loja.banner_url || null);

      // Limpa os arquivos selecionados anteriormente
      setPerfilFile(null);
      setLogoFile(null);
      setBannerFile(null);
    }
  }, [isOpen, loja]);

  if (!isOpen) return null;

  // Função auxiliar para criar URL local de preview
  const handleImageSelect = (file: File, type: 'perfil' | 'logo' | 'banner') => {
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

  const handleSalvar = async () => {
    if (!nome || !categoria) return alert("Preencha nome e categoria!");

    // Buscar ID da categoria pelo nome
    const categoriaSelecionada = categoriesData.find(c => c.name === categoria);
    const categoriaId = categoriaSelecionada ? categoriaSelecionada.id : 1;

    try {
      setLoading(true);

      // Usando FormData para enviar texto + arquivos
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('CategoriaId', String(categoriaId));
      
      // Só anexa o arquivo se o usuário tiver selecionado um novo
      if (perfilFile) formData.append('perfil', perfilFile);
      if (logoFile) formData.append('logo', logoFile);
      if (bannerFile) formData.append('banner', bannerFile);

      // Nota: O backend precisa suportar PUT com multipart/form-data
      await api.put(`/loja/${loja.id}`, formData);
      
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
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
              className="
                w-full 
                bg-white rounded-full 
                h-16 px-8 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#5E3C9E]
                shadow-sm
                disabled:opacity-50
              "
            />
          </div>

          <div className="relative w-full">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              disabled={loading}
              className="
                w-full bg-white rounded-full h-16 px-8 pr-12 
                text-xl text-black placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#5E3C9E]
                shadow-sm appearance-none cursor-pointer capitalize
                disabled:opacity-50
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

          {/* Área de Uploads com FotoUpload */}
          <div className="space-y-4 border-2 border-dashed border-[#5E3C9E]/30 rounded-3xl p-4 md:p-6 mt-2">
            
            <FotoUpload 
              id="edit-perfil" 
              label="Foto de perfil" 
              preview={perfilPreview}
              onFileChange={(file) => handleImageSelect(file, 'perfil')}
            />
            
            <FotoUpload 
              id="edit-logo" 
              label="Logo da loja" 
              preview={logoPreview}
              onFileChange={(file) => handleImageSelect(file, 'logo')}
            />
            
            <FotoUpload 
              id="edit-banner" 
              label="Banner da loja" 
              preview={bannerPreview}
              onFileChange={(file) => handleImageSelect(file, 'banner')}
            />
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