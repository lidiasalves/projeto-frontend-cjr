/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, Plus, Minus, ChevronDown, Trash, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export default function ModalAddProduto({ isOpen, onClose, lojaId = 1 }: any) {
  const [quantidade, setQuantidade] = useState(1);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [categorias, setCategorias] = useState<any[]>([]);
  const [fotos, setFotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    
    fetch(`${API_BASE}/categoria`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch(() => toast.error("Erro ao carregar categorias."));
  }, []);

  // Só agora o retorno condicional
  if (!isOpen) return null;

  function adicionarFoto(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fotos.length >= 4) return toast.warning("Máximo de 4 imagens!");

    setFotos((prev) => [...prev, file]);
    setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
  }

  function alterarImagem(e: any, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    const nova = [...fotos];
    nova[index] = file;
    setFotos(nova);

    const prev = [...previews];
    prev[index] = URL.createObjectURL(file);
    setPreviews(prev);
  }

  function removerImagem(index: number) {
    const nova = [...fotos];
    nova.splice(index, 1);
    setFotos(nova);

    const prev = [...previews];
    prev.splice(index, 1);
    setPreviews(prev);
  }

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoriaId("");
    setQuantidade(1);
    setFotos([]);
    setPreviews([]);
  }

  async function handleSubmit() {
    if (!nome || !preco || !categoriaId || fotos.length === 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    formData.append("estoque", String(quantidade));
    formData.append("LojaId", String(lojaId));
    formData.append("CategoriaId", String(categoriaId));

    fotos.forEach((f) => formData.append("fotos", f));

    const res = await fetch(`${API_BASE}/produto`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Produto criado com sucesso!");
      limparFormulario();
      onClose();
    } else {
      toast.error(data.message || "Erro ao criar produto.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#EDEDED] text-black w-[750px] max-h-[85vh] overflow-y-auto p-10 rounded-3xl relative shadow-xl">

        <button onClick={onClose} className="absolute right-6 top-6 text-gray-600 hover:text-black">
          <X size={30} />
        </button>

        <h1 className="text-center text-[32px] font-semibold mb-8">Adicionar Produto</h1>

        {/* Imagens */}
        <div className="flex flex-col items-center gap-4 mb-8">

          {previews[0] && (
            <ImagemEditorNovo
              imagem={previews[0]}
              onChange={(e: any) => alterarImagem(e, 0)}
              onRemove={() => removerImagem(0)}
              width="360px"
              height="180px"
            />
          )}

          <div className="flex gap-6">
            {previews.slice(1).map((prev, i) => (
              <ImagemEditorNovo
                key={i + 1}
                imagem={prev}
                onChange={(e: any) => alterarImagem(e, i + 1)}
                onRemove={() => removerImagem(i + 1)}
                width="110px"
                height="110px"
              />
            ))}

            {previews.length < 4 && (
              <label className="border-2 border-dashed border-purple-400 rounded-xl w-[110px] h-[110px] flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition">
                <Plus className="text-purple-600" />
                <span className="text-purple-600 text-xs mt-1">Adicionar</span>
                <input type="file" className="hidden" onChange={adicionarFoto} />
              </label>
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            placeholder="Nome do produto"
            className="bg-white p-4 rounded-xl w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* SELECT */}
          <div className="relative">
            <select
              className="bg-white p-4 rounded-xl w-full appearance-none"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <option value="" disabled>Categoria</option>

              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <textarea
            placeholder="Descrição do produto"
            className="bg-white p-4 rounded-xl w-full h-[100px]"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            placeholder="Preço do produto"
            className="bg-white p-4 rounded-xl w-full"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>

        {/* Quantidade */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Minus size={26} />
          </button>

          <span className="text-[36px] font-medium text-purple-600">{quantidade}</span>

          <button
            onClick={() => setQuantidade((q) => q + 1)}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Plus size={26} />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-[220px] mx-auto mt-10 block bg-purple-600 text-white py-3 rounded-full text-lg font-medium hover:opacity-90 transition"
        >
          Adicionar
        </button>

      </div>
    </div>
  );
}

function ImagemEditorNovo({ imagem, onRemove, onChange, width, height }: any) {
  return (
    <div
      style={{ width, height }}
      className="border border-purple-400 rounded-xl relative overflow-hidden"
    >
      <img src={imagem} className="w-full h-full object-cover" />

      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
      >
        <Trash size={18} />
      </button>

      <label
        className="absolute bottom-2 right-2 bg-purple-600 text-white p-1 rounded-full cursor-pointer"
      >
        <Upload size={18} />
        <input type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
