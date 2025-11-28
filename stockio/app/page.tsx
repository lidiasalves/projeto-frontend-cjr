// Exemplo de uso em uma página:
"use client";
import { useState } from "react";
import ModalEditarLoja from "@/components/modal/modalEditarLoja"; // Ajuste o import

export default function MinhaPagina() {
  const [modalAberto, setModalAberto] = useState(true); // Começa aberto para testar

  return (
    <div className="p-10">
      <button onClick={() => setModalAberto(true)}>
        Abrir Modal
      </button>

      {/* O MODAL VIVE AQUI */}
      <ModalEditarLoja 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
      />
    </div>
  );
}