/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, Plus, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ModalAddProduto({ isOpen, onClose }: any) {
  const [quantidade, setQuantidade] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#EDEDED] w-[750px] max-h-[85vh] overflow-y-auto p-10 rounded-3xl relative shadow-xl">


        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-600 hover:text-black"
        >
          <X size={30} />
        </button>

        <h1 className="text-center text-[32px] font-semibold mb-8">
          Adicionar Produto
        </h1>

        {/* ---------------- ÁREA DAS FOTOS ---------------- */}
        <div className="flex flex-col items-center gap-6 mb-10">

          {/* Foto grande central */}
          <FotoUpload width="360px" height="180px" />

          {/* Três menores em linha */}
          <div className="flex gap-6">
            {[...Array(3)].map((_, i) => (
              <FotoUpload key={i} width="110px" height="110px" />
            ))}
          </div>
        </div>

        {/* ---------------- FORM ---------------- */}
        <div className="flex flex-col gap-4">
          <input
            placeholder="Nome do produto"
            className="bg-white p-4 rounded-xl w-full"
          />

          <div className="relative">
            <select className="bg-white p-4 rounded-xl w-full appearance-none">
              <option disabled selected>Subcategoria</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <textarea
            placeholder="Descrição do produto"
            className="bg-white p-4 rounded-xl w-full h-[100px]"
          />

          <input
            placeholder="Preço do produto"
            className="bg-white p-4 rounded-xl w-full"
          />
        </div>

        {/* ---------------- QUANTIDADE ---------------- */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Minus size={26} />
          </button>

          <span className="text-[36px] font-medium text-purple-600">
            {quantidade}
          </span>

          <button
            onClick={() => setQuantidade((q) => q + 1)}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Plus size={26} />
          </button>
        </div>

        {/* ---------------- BOTÃO ADICIONAR ---------------- */}
        <button className="w-[220px] mx-auto mt-10 block bg-purple-600 text-white py-3 rounded-full text-lg font-medium hover:opacity-90 transition">
          Adicionar
        </button>
      </div>
    </div>
  );
}

function FotoUpload({ width, height }: any) {
  return (
    <div
      style={{ width, height }}
      className="border-2 border-dashed border-purple-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
    >
      <div className="flex flex-col items-center">
        <Plus size={24} className="text-purple-500 mb-1" />
        <span className="text-purple-500 text-xs">Adicionar foto</span>
      </div>
    </div>
  );
}
