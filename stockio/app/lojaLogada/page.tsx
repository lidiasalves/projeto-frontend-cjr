"use client";

import NavbarLogada from "@/components/header/navbarlogada";
import ModalEditarLoja from "@/components/modal/modalEditarLoja";
import ModalAddProduto from "@/components/modal/modalAdicionar";
import ModalFazerAvaliacao from "@/components/modal/modalFazerAvaliacao";
import CarrosselProdutos from "@/components/body/produtcs/carrosselProdutos";
import CarrosselAvaliacoes from "@/components/body/avaliacao/carrosselAvaliacao";
import CardProduto from "@/components/body/produtcs/cardProduto";
import Comentario from "@/components/body/avaliacao/cardAvaliacao";
import Link from "next/link";
import { useState } from "react";

export default function LojaLogada() {

  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalAdd, setAbrirModalAdd] = useState(false);
  const [abrirModalComent, setAbrirModalComent] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white font-sans">
      <NavbarLogada/>

      {/* BANNER */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <img
          src="/images/bannerloja.svg"
          className="w-full h-full object-cover scale-100"
          alt="Banner"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/90 to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col text-left">
            <h1 className="text-7xl font-semibold leading-none">Rare Beauty</h1>
            <span className="text-2xl opacity-80 mt-1 ml-1">beleza</span>
          </div>
        </div>

        {/* botões */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <button 
            onClick={() => setAbrirModal(true)}
            className="flex flex-col items-center p-3 rounded-full bg-[#5E3C9E] shadow-md text-white"
          >
            <img src="/images/icons/botaoeditar.svg" className="w-4 h-4 mb-1" />
          </button>

          <button 
            onClick={() => setAbrirModalAdd(true)}
            className="flex flex-col items-center p-3 rounded-full bg-[#5E3C9E] shadow-md text-white"
          >
            <img src="/images/icons/botaoadd.svg" className="w-4 h-4 mb-1" />
          </button>
        </div>
      </section>

      {/* reviews */}
      <section className="text-2xl bg-black py-7 text-center"> 
          <h1>Reviews e Comentários</h1>

        <p className="text-4xl font-bold mb-3">4.75</p> 
        <div className="text-yellow-400 text-3xl mb-6">★★★★★</div>

        <a href="/lojaLogada/avaliacoes" className="text-sm text-purple-300 hover:text-purple-200 underline">
          ver mais
        </a>
      </section>

      {/* modal editar loja */}
      <ModalEditarLoja 
        isOpen={abrirModal}
        onClose={() => setAbrirModal(false)}
      />

      {/* modal adicionar */}
      <ModalAddProduto
        isOpen={abrirModalAdd}
        onClose={() => setAbrirModalAdd(false)}
      />

      {/* comentarios/avaliacoes */}
      <div className="w-full bg-black py-16 flex flex-col items-center gap-2">

      {/* botao adicionar comentario */}
      <div className="w-full flex justify-center mt-4 mx-auto px-1">
          <button
            onClick={() => setAbrirModalComent(true)}
            className="flex items-center gap-7 bg-[#5E3C9E] hover:bg-[#4d2f86] text-white font-semibold px-50 py-2 rounded-full shadow-md transition-all"
          >
            <span className="text-xl font-bold">+</span>
            Adicionar Review
          </button>
        </div>

       <CarrosselAvaliacoes
        avaliacoes={[
          {
            usuario: "Sofia Figueiredo",
            comentario: "Produto excelente, entrega rápida e qualidade impecável!",
            nota: 5,
          },
          {
            usuario: "Ana Ribeiro",
            comentario: "Amei! Vou comprar mais vezes com certeza.",
            nota: 5,
          },
          {
            usuario: "Lucas Mendes",
            comentario: "Muito bom, mas o envio demorou um pouco.",
            nota: 4,
          },
        ]}
      />


      </div>

      <ModalFazerAvaliacao
        isOpen={abrirModalComent}
        onClose={() => setAbrirModalComent(false)}
      />
     
     {/* carrosel de produtos */}
      <section className="max-[1200px] mx-auto bg-white w-full py-10">
          <div className = "flex items-center justify-between px-4 mt-6">
            <h2 className="text-3xl font-semibold md:text-5xl  text-black mb-4">
                Produtos
                <span className = "ml-2 text-sm font-normal text-[#5E3C9E]">Rare Beauty</span>  
            </h2> 
          </div> 

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 justify-items-center">
          <CardProduto id={0} nome={"Perfume Rare"} preco={599.90} imagem={"/images/produtorare1.svg"} estoque={10} />
          <CardProduto id={0} nome={"Iluminador"} preco={249.90} imagem={"/images/produtorare2.svg"} estoque={10} />
          <CardProduto id={0} nome={"Mini Blush"} preco={99.90} imagem={"/images/produtorare3.svg"} estoque={0} />
          <CardProduto id={0} nome={"Lapis Labial"} preco={139.90} imagem={"/images/produtorare4.svg"} estoque={10} />
        </div>
      </section>

    </div>
    
  );
}
