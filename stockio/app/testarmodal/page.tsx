"use client";
import React, { useState } from "react";

// Imports dos Modais
import ModalEditarLoja from "@/components/modal/modalEditarLoja"; 
import ModalAdicionarLoja from "@/components/modal/modalAdicionarLoja"; // <-- 1. NOVO IMPORT
import ModalEditarComentario from "@/components/modal/modalEditarComentario";
import ModalFazerAvaliacao from "@/components/modal/modalFazerAvaliacao";
import ModalEditarAvaliacao from "@/components/modal/modalEditarAvaliacao";

export default function PaginaTestarModais() {
  // --- ESTADOS ---
  const [modalLojaAberto, setModalLojaAberto] = useState(false);
  const [modalAdicionarLojaAberto, setModalAdicionarLojaAberto] = useState(false); // <-- 2. NOVO ESTADO
  const [modalComentarioAberto, setModalComentarioAberto] = useState(false);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [modalEditarAvaliacaoAberto, setModalEditarAvaliacaoAberto] = useState(false); 
  
  // --- DADOS MOCK ---
  const [dadosAvaliacao, setDadosAvaliacao] = useState({
    nota: 4,
    texto: "Gostei muito, mas demorou um pouco."
  });

  const [comentarioTeste, setComentarioTeste] = useState(
    "Este é um comentário teste. O produto chegou rápido mas a embalagem estava amassada."
  );

  // Função Fake
  const handleSalvarComentario = async (novoTexto: string) => {
    console.log("Salvando...", novoTexto);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setComentarioTeste(novoTexto); 
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 gap-10">
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-black">🧪 Laboratório de Modais</h1>
        <p className="text-gray-500">Playground para testar componentes UI.</p>
      </div>

      {/* GRADE DE BOTÕES (Ajustei o grid para acomodar mais itens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl">
        
        {/* 1. ADICIONAR LOJA (NOVO) */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4 border-2 border-purple-100">
          <h3 className="font-semibold text-lg text-gray-700">Adicionar Loja</h3>
          <p className="text-sm text-gray-400 text-center">Modal limpo para criação.</p>
          <button 
            onClick={() => setModalAdicionarLojaAberto(true)}
            className="px-6 py-3 bg-[#5E3C9E] text-white rounded-full font-semibold shadow hover:bg-[#4c2f85] transition-all w-full"
          >
            + Criar
          </button>
        </div>

        {/* 2. EDITAR LOJA */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Editar Loja</h3>
          <p className="text-sm text-gray-400 text-center">Pré-preenchido com dados.</p>
          <button 
            onClick={() => setModalLojaAberto(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all w-full"
          >
            Editar
          </button>
        </div>

        {/* 3. EDITAR COMENTÁRIO */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Editar Comentário</h3>
          <p className="text-sm text-gray-400 text-center">Testa input de texto.</p>
          <button 
            onClick={() => setModalComentarioAberto(true)}
            className="px-6 py-3 bg-roxo text-white rounded-full font-semibold shadow hover:bg-[#4c2f85] transition-all w-full"
          >
            Editar
          </button>
        </div>

        {/* 4. FAZER AVALIAÇÃO */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Fazer Avaliação</h3>
          <p className="text-sm text-gray-400 text-center">Testa estrelinhas.</p>
          <button 
            onClick={() => setModalAvaliacaoAberto(true)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold shadow hover:bg-yellow-600 transition-all w-full"
          >
            Avaliar
          </button>
        </div>

        {/* 5. EDITAR AVALIAÇÃO */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Editar Avaliação</h3>
          <p className="text-sm text-gray-400 text-center">Estrelas pré-fixadas.</p>
          <button 
            onClick={() => setModalEditarAvaliacaoAberto(true)}
            className="px-6 py-3 bg-white text-roxo border-2 border-roxo rounded-full font-bold shadow hover:bg-roxo hover:text-white transition-all w-full"
          >
            Editar
          </button>
        </div>

      </div>

      {/* ===================================================== */}
      {/* ÁREA DOS MODAIS */}
      {/* ===================================================== */}

      <ModalAdicionarLoja 
        isOpen={modalAdicionarLojaAberto}
        onClose={() => setModalAdicionarLojaAberto(false)}
      />

<ModalEditarLoja 
  isOpen={modalLojaAberto}
  onClose={() => setModalLojaAberto(false)}
  onSucesso={() => console.log("Sucesso! Recarregar lista...")} // <--- ADICIONE ISSO
/>

      <ModalEditarComentario 
        isOpen={modalComentarioAberto}
        onClose={() => setModalComentarioAberto(false)}
        comentarioAtual={comentarioTeste}
        onSalvar={handleSalvarComentario} 
      />

      <ModalFazerAvaliacao
        isOpen={modalAvaliacaoAberto}
        onClose={() => setModalAvaliacaoAberto(false)}

      />

      <ModalEditarAvaliacao
        isOpen={modalEditarAvaliacaoAberto}
        onClose={() => setModalEditarAvaliacaoAberto(false)}
        nomeDaLoja="Rare Beauty"
        avaliacaoAtual={dadosAvaliacao}
        onSalvar={(d) => setDadosAvaliacao(d)}
        onDeletar={() => alert("Deletado!")}
      />

    </main>
  );
}