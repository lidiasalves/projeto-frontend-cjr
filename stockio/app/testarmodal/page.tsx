"use client";
import React, { useState } from "react";

// IMPORTANTE: Verifique se os caminhos batem com onde você salvou os arquivos!
import ModalEditarLoja from "@/components/modal/modalEditarLoja"; 
import ModalEditarComentario from "@/components/modal/modalEditarComentario";
import ModalFazerAvaliacao from "@/components/modal/modalFazerAvaliacao";
import ModalEditarAvaliacao from "@/components/modal/modalEditarAvaliacao";

export default function PaginaTestarModais() {
  // --- ESTADOS PARA CONTROLAR CADA MODAL ---
  const [modalLojaAberto, setModalLojaAberto] = useState(false);
  const [modalComentarioAberto, setModalComentarioAberto] = useState(false);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  
  // 1. NOVO ESTADO para o 4º modal
  const [modalEditarAvaliacaoAberto, setModalEditarAvaliacaoAberto] = useState(false); 
  
  // --- DADOS MOCK ---
  const [dadosAvaliacao, setDadosAvaliacao] = useState({
    nota: 4,
    texto: "Gostei muito, mas demorou um pouco."
  });

  const [comentarioTeste, setComentarioTeste] = useState(
    "Este é um comentário teste. O produto chegou rápido mas a embalagem estava amassada."
  );

  // --- FUNÇÕES FAKE ---
  const handleSalvarComentario = async (novoTexto: string) => {
    console.log("Enviando para o servidor...", novoTexto);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setComentarioTeste(novoTexto); 
    console.log("Salvo com sucesso!");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 gap-10">
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-black">🧪 Laboratório de Modais</h1>
        <p className="text-gray-500">Use os botões abaixo para testar e visualizar os componentes.</p>
      </div>

      {/* --- GRADE DE BOTÕES DE TESTE --- */}
      {/* Mudei para md:grid-cols-2 lg:grid-cols-4 para caberem os 4 botões bonitinhos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        
        {/* 1. EDITAR LOJA */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Editar Loja</h3>
          <button 
            onClick={() => setModalLojaAberto(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all w-full"
          >
            Abrir
          </button>
        </div>

        {/* 2. EDITAR COMENTÁRIO */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Editar Comentário</h3>
          <button 
            onClick={() => setModalComentarioAberto(true)}
            className="px-6 py-3 bg-roxo text-white rounded-full font-semibold shadow hover:bg-[#4c2f85] transition-all w-full"
          >
            Abrir
          </button>
        </div>

        {/* 3. FAZER AVALIAÇÃO */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h3 className="font-semibold text-lg text-gray-700">Fazer Avaliação</h3>
          <button 
            onClick={() => setModalAvaliacaoAberto(true)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold shadow hover:bg-yellow-600 transition-all w-full"
          >
            Abrir
          </button>
        </div>

        {/* 4. EDITAR AVALIAÇÃO (Novo Botão) */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4 border-2 border-roxo/20">
          <h3 className="font-semibold text-lg text-gray-700">Editar Avaliação</h3>
          <p className="text-xs text-gray-400 text-center">Nota: {dadosAvaliacao.nota} | Texto: "{dadosAvaliacao.texto.slice(0,10)}..."</p>
          <button 
            onClick={() => setModalEditarAvaliacaoAberto(true)}
            className="px-6 py-3 bg-white text-roxo border-2 border-roxo rounded-full font-bold shadow hover:bg-roxo hover:text-white transition-all w-full"
          >
            Abrir
          </button>
        </div>

      </div>

      {/* ===================================================== */}
      {/* ÁREA ONDE OS MODAIS SÃO RENDERIZADOS (FICAM INVISÍVEIS) */}
      {/* ===================================================== */}

      <ModalEditarLoja 
        isOpen={modalLojaAberto}
        onClose={() => setModalLojaAberto(false)}
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
        // titulo="Avaliar Produto Teste" // (Se o seu modal aceitar título)
      />

      {/* 4. O NOVO MODAL CORRIGIDO */}
      <ModalEditarAvaliacao
        isOpen={modalEditarAvaliacaoAberto} // Usa o estado correto
        onClose={() => setModalEditarAvaliacaoAberto(false)} // Usa o set correto
        nomeDaLoja="Rare Beauty"
        
        // Passa os dados atuais
        avaliacaoAtual={dadosAvaliacao}
        
        // Ação de Salvar
        onSalvar={(novosDados) => {
          console.log("Atualizando avaliação:", novosDados);
          setDadosAvaliacao(novosDados); // Atualiza o card na tela
        }}
        
        // Ação de Deletar
        onDeletar={() => {
          console.log("Deletando avaliação...");
          alert("Avaliação deletada!");
        }}
      />

    </main>
  );
}