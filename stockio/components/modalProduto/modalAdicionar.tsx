/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, Plus, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export default function ModalAddProduto({ isOpen, onClose, lojaId = 1 }: any) {
  const [quantidade, setQuantidade] = useState(1);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  // 4 slots fixos
  const [fotos, setFotos] = useState<(File | null)[]>([null, null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);

  if (!isOpen) return null;

  function handleFotoChange(e: any, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    const novaLista = [...fotos];
    const novosPreviews = [...previews];

    novaLista[index] = file;
    novosPreviews[index] = URL.createObjectURL(file);

    setFotos(novaLista);
    setPreviews(novosPreviews);
  }

  function removerFoto(index: number) {
    const novaLista = [...fotos];
    const novosPreviews = [...previews];

    novaLista[index] = null;
    novosPreviews[index] = null;

    setFotos(novaLista);
    setPreviews(novosPreviews);
  }

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoriaId("");
    setQuantidade(1);
    setFotos([null, null, null, null]);
    setPreviews([null, null, null, null]);
  }

  async function handleSubmit() {
    const fotosValidas = fotos.filter((f) => f !== null);

    if (!nome || !preco || !categoriaId || fotosValidas.length === 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao || "");
    formData.append("preco", preco);
    formData.append("estoque", String(quantidade));
    formData.append("LojaId", String(lojaId));
    formData.append("CategoriaId", String(categoriaId));

    fotosValidas.forEach((f) => formData.append("fotos", f!));

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
      console.error(data);
      toast.error(data.message || "Erro ao criar produto.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#EDEDED] w-[750px] max-h-[85vh] overflow-y-auto p-10 rounded-3xl relative shadow-xl">

        <button onClick={onClose} className="absolute right-6 top-6 text-gray-600 hover:text-black">
          <X size={30} />
        </button>

        <h1 className="text-center text-[32px] font-semibold mb-8">Adicionar Produto</h1>

        {/* Imagens */}
        <div className="flex flex-col items-center gap-6 mb-10">

          {/* FOTO GRANDE (index 0) */}
          <SlotFoto
            width="360px"
            height="180px"
            preview={previews[0]}
            onChange={(e: any) => handleFotoChange(e, 0)}
            onRemove={() => removerFoto(0)}
          />

          {/* OUTRAS 3 FOTOS (1, 2, 3) */}
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <SlotFoto
                key={i}
                width="110px"
                height="110px"
                preview={previews[i]}
                onChange={(e: any) => handleFotoChange(e, i)}
                onRemove={() => removerFoto(i)}
              />
            ))}
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

          <div className="relative">
            <select
              className="bg-white p-4 rounded-xl w-full appearance-none"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <option value="" disabled>Categoria</option>
              <option value="1">Roupas</option>
              <option value="2">Calçados</option>
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

function SlotFoto({ width, height, preview, onChange, onRemove }: any) {
  return (
    <div
      style={{ width, height }}
      className="relative border-2 border-dashed border-purple-400 rounded-xl flex items-center justify-center bg-white"
    >
      {preview ? (
        <>
          <img src={preview} className="w-full h-full object-cover rounded-xl" />

          {/* botão X */}
          <button
            onClick={onRemove}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition w-full h-full">
          <input type="file" accept="image/*" className="hidden" onChange={onChange} />
          <Plus size={24} className="text-purple-500 mb-1" />
          <span className="text-purple-500 text-xs">Adicionar foto</span>
        </label>
      )}
    </div>
  );
}
