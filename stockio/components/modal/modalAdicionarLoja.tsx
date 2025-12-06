"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { categoriesData } from "@/mock/categoriasMock"; // Verifique se o caminho está certo
import axios from "axios"; // Importamos o Axios
import { toast } from "react-toastify"; // Importamos o Toast

// Componente visual da área de upload (Mantive igual pois estava ótimo)
const UploadArea = ({ 
  label, 
  icon, 
  id, 
  onChange, 
  fileName 
}: { 
  label: string; 
  icon: string; 
  id: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string | null;
}) => (
  <label 
    htmlFor={id} 
    className={`
      flex flex-col items-center justify-center 
      w-full h-40 
      border-2 border-dashed rounded-2xl 
      cursor-pointer transition-colors
      group border-purple-200
      ${fileName ? "bg-purple-50 border-purple-500" : "bg-gray-50/50 hover:bg-gray-100"}
    `}
  >
    <div className="p-3 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
       <Icon icon={icon} width="32" className={fileName ? "text-purple-600" : "text-gray-400 group-hover:text-[#5E3C9E]"} />
    </div>
    <p className="text-gray-500 font-medium text-sm text-center px-4">
      {fileName ? `Arquivo: ${fileName}` : label}
    </p>
    <input type="file" id={id} className="hidden" onChange={onChange} accept="image/*" />
  </label>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ModalAdicionarLoja: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados para os arquivos
  const [files, setFiles] = useState<{
    perfil: File | null;
    logo: File | null;
    banner: File | null;
  }>({ perfil: null, logo: null, banner: null });

  if (!isOpen) return null;

  // Função para capturar o arquivo quando o usuário seleciona
  const handleFileChange = (key: 'perfil' | 'logo' | 'banner') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [key]: file }));
    }
  };

  const handleAdicionar = async () => {
    // 1. Validação básica
    if (!nome || !categoria) {
      toast.error("Preencha o nome e a categoria!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Erro: Usuário não identificado. Faça login novamente.");
      return;
    }

    try {
      setLoading(true);

      // 2. A ESTRATÉGIA DO COLEGA: Usar FormData
      const fd = new FormData();
      fd.append("nome", nome);
      fd.append("categoria", categoria);
      fd.append("usuarioId", userId);

      // Anexamos os arquivos APENAS se eles existirem
      // NOTA: Verifique se no seu Backend os nomes esperados são 'foto_perfil', 'logo' e 'banner'
      if (files.perfil) fd.append("foto_perfil", files.perfil); 
      if (files.logo) fd.append("logo", files.logo);
      if (files.banner) fd.append("banner", files.banner);

      // 3. Envio usando AXIOS (igual ao modal de perfil)
      await axios.post("http://localhost:3001/loja", fd);

      toast.success("Loja criada com sucesso!");
      
      // Limpa tudo
      setNome("");
      setCategoria("");
      setFiles({ perfil: null, logo: null, banner: null });
      
      onSuccess(); // Atualiza a tela de perfil
      onClose();   // Fecha o modal

    } catch (error: any) {
      console.error(error);
      const msgErro = error.response?.data?.message || "Erro ao criar a loja.";
      toast.error(msgErro);
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
          w-full max-w-4xl max-h-[90vh] 
          rounded-[30px] shadow-2xl 
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
              className="w-full bg-white rounded-full h-16 px-8 text-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E3C9E] shadow-sm"
            />
          </div>

          {/* Select: Categoria */}
          <div className="relative w-full">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full bg-white rounded-full h-16 px-8 pr-12 text-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5E3C9E] shadow-sm appearance-none cursor-pointer capitalize placeholder:text-gray-400"
            >
              <option value="" disabled>Categoria</option>
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

          {/* Upload Areas */}
          <div className="space-y-4 border-2 border-dashed border-[#5E3C9E]/30 rounded-3xl p-4 md:p-6 mt-2">
            <UploadArea 
              id="add-perfil" 
              label="Anexe a foto de perfil de sua loja" 
              icon="ph:user-circle-light" 
              onChange={handleFileChange('perfil')}
              fileName={files.perfil?.name}
            />
            <UploadArea 
              id="add-logo" 
              label="Anexe a logo em SVG de sua loja" 
              icon="ph:image-square-light" 
              onChange={handleFileChange('logo')}
              fileName={files.logo?.name}
            />
            <UploadArea 
              id="add-banner" 
              label="Anexe o banner de sua loja" 
              icon="ph:monitor-light" 
              onChange={handleFileChange('banner')}
              fileName={files.banner?.name}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button 
              onClick={handleAdicionar}
              disabled={loading}
              className={`
                w-full md:w-2/3 h-14 rounded-full 
                text-white text-xl font-medium
                transition-all shadow-lg
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5E3C9E] hover:bg-[#4c2f85] hover:scale-[1.02]"}
              `}
            >
              {loading ? "Criando..." : "Adicionar"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarLoja;