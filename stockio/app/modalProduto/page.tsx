"use client";
import { useState } from 'react';
import NavbarLogada from '@/components/header/navbarlogada';
import ModalAddProduto from '@/components/modalProduto/modalAdicionar';
import ModalEditProduto from '@/components/modalProduto/modalEditar';



export default function ProdutoPage() {
  const [modalAberto, setModalAberto] = useState(true); // Começa aberto para testar

  return (
    <div className="p-10">
      <button onClick={() => setModalAberto(true)}>
        Abrir Modal
      </button>

      {/* O MODAL VIVE AQUI */}
      <ModalAddProduto 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
      />
    </div>
  );
}