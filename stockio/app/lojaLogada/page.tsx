"use client";

import NavbarLogada from "@/components/header/navbarlogada";
import ModalEditarLoja from "@/components/modal/modalEditarLoja";
import ModalAddProduto from "@/components/modal/modalAdicionar";
import Link from "next/link";
import { useState } from "react";

export default function LojaLogada() {

  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalAdd, setAbrirModalAdd] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white font-sans">
      <NavbarLogada/>

      <section className="relative w-full h-[500px] overflow-hidden">

        <img
          src="/images/bannerloja.svg"
          className="w-full h-full object-cover scale-100"
          alt="Banner"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col text-left">
            <h1 className="text-7xl font-semibold leading-none">Rare Beauty</h1>
            <span className="text-2xl opacity-80 mt-1 ml-1">beleza</span>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">

          {/* botao editar loja */}
          <button 
            onClick={() => setAbrirModal(true)}
            className="flex flex-col items-center p-3 rounded-full bg-[#5E3C9E] shadow-md text-white"
          >
            <img src="/images/icons/botaoeditar.svg" className="w-4 h-4 mb-1" />
            <i className="ri-edit-line"></i>
          </button>

          {/* botao adicionar */}
          <button 
          onClick={() => setAbrirModalAdd(true)}
            className="flex flex-col items-center p-3 rounded-full bg-[#5E3C9E] shadow-md text-white"
          >
            <img src="/images/icons/botaoadd.svg" className="w-4 h-4 mb-1" />
            <i className="ri-add-line"></i>
          </button>

        </div>
      </section>
      <section className="bg-black py-14 text-center"> 
        <h2 className="text-4xl font-medium mb-4">Reviews e Comentários</h2> 
        <p className="text-4xl font-bold mb-3">4.75</p> 
        <div className="text-yellow-400 text-3xl mb-6">★★★★★</div> <a href="#" 
        className="text-sm text-purple-300 hover:text-purple-200 underline"> ver mais </a> 
        </section>

      {/* modal editar loja*/}
      <ModalEditarLoja 
        isOpen={abrirModal}
        onClose={() => setAbrirModal(false)}
      />

      {/*modal adicionar*/}
      <ModalAddProduto
        isOpen = {abrirModalAdd}
        onClose = {() => setAbrirModalAdd(false)}
        />
      
    </div>
  );
}
