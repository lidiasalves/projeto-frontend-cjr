"use client";

import NavbarLogada from "@/components/header/navbar";
import ModalFazerAvaliacao from "@/components/modal/modalFazerAvaliacao";
import Comentario from "@/components/body/avaliacao/cardAvaliacao";
import { useState } from "react";

export default function AvaliacoesLoja() {

  const [abrirModalComent, setAbrirModalComent] = useState(false);

  const avaliacoesMock = [
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
    {
      usuario: "Fernanda Lopes",
      comentario: "Ótima qualidade, mas achei o preço meio alto.",
      nota: 4,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white font-sans">
      <NavbarLogada />

      {/* BANNER */}
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
      </section>

      {/* HEADER AVALIAÇÕES */}
      <section className="text-2xl bg-black py-7 text-center">
        <h1>Avaliações</h1>

        <p className="text-4xl font-bold mb-3">4.75</p>
        <div className="text-yellow-400 text-3xl mb-6">★★★★★</div>

        <button
          onClick={() => setAbrirModalComent(true)}
          className="text-sm text-purple-300 hover:text-purple-200 underline"
        >
          adicionar review
        </button>
      </section>

      {/* LISTA DE AVALIAÇÕES */}
      <div className="w-full bg-black py-16 flex flex-col items-center gap-10 px-6">
        {avaliacoesMock.map((avaliacao, index) => (
          <Comentario
            key={index}
            usuario={avaliacao.usuario}
            comentario={avaliacao.comentario}
            nota={avaliacao.nota}
          />
        ))}
      </div>

      {/* MODAL */}
      <ModalFazerAvaliacao
        isOpen={abrirModalComent}
        onClose={() => setAbrirModalComent(false)}
      />
    </div>
  );
}
