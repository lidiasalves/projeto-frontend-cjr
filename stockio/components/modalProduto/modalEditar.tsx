/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, Plus, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ModalEditProduto({ isOpen, onClose }: any) {
  const [quantidade, setQuantidade] = useState(3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999">
      <div className="bg-[#EDEDED] w-[750px] max-h-[85vh] overflow-y-auto p-10 rounded-3xl relative shadow-xl">

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-600 hover:text-black"
        >
          <X size={32} />
        </button>

        <h1 className="text-center text-[38px] font-semibold mb-8">
          Editar Produto
        </h1>

        {/* ----------- ÁREA DAS FOTOS ----------- */}
        <div className="flex flex-col items-center gap-4 mb-8">

          {/* Foto principal */}
          <FotoUpload width="360px" height="180px" />

          {/* Linha das 3 fotos menores */}
          <div className="flex gap-6">
            {[...Array(3)].map((_, i) => (
              <FotoUpload key={i} width="110px" height="110px" />
            ))}
          </div>
        </div>

        {/* ----------- FORM ----------- */}
        <div className="flex flex-col gap-4">

          <input
            defaultValue="Brownie Meio Amargo"
            className="bg-white p-4 rounded-xl w-full"
          />

          <div className="relative">
            <select className="bg-white p-4 rounded-xl w-full appearance-none">
              <option selected>Doce</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <textarea
            defaultValue="Recheado com uma ganache de chocolate meio amargo bem cremosa..."
            className="bg-white p-4 rounded-xl w-full h-[110px]"
          />

          <input
            defaultValue="R$ 4,70"
            className="bg-white p-4 rounded-xl w-full"
          />
        </div>

        {/* ----------- BOTÃO DELETAR ----------- */}
        <button className="w-full bg-red-600 text-white py-3 rounded-full text-lg font-medium mt-6 hover:opacity-90 transition">
          DELETAR
        </button>

        {/* ----------- QUANTIDADE ----------- */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Minus size={28} />
          </button>

          <span className="text-[40px] font-medium text-purple-600">
            {quantidade}
          </span>

          <button
            onClick={() => setQuantidade((q) => q + 1)}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* ----------- BOTÃO SALVAR ----------- */}
        <button className="w-[260px] mx-auto mt-10 mb-4 block bg-purple-600 text-white py-3 rounded-full text-lg font-medium hover:opacity-90 transition">
          Salvar
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
        <Plus size={26} className="text-purple-500 mb-1" />
        <span className="text-purple-500 text-sm">Adicionar foto</span>
      </div>
    </div>
  );
}
