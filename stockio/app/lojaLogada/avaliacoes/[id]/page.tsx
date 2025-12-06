"use client";

import NavbarLogada from "@/components/header/navbarlogada";
import { ArrowLeft, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();

  // 🔹 MOCK DA REVIEW PRINCIPAL
  const review = {
    usuario: {
      nome: "Sofia Figueiredo",
      foto: "/images/default-user.png",
    },
    texto:
      "A experiência foi maravilhosa! O produto chegou no prazo e a qualidade superou minhas expectativas. Vou comprar novamente com toda certeza!",
    nota: 5,
    tempo: "1h",
  };

  // 🔹 MOCK DAS RESPOSTAS
  const respostas = [
    {
      id: "1",
      usuario: {
        nome: "Maria Santos",
        foto: "/images/default-user.png",
      },
      texto: "Concordo totalmente! Também tive uma experiência incrível.",
    },
    {
      id: "2",
      usuario: {
        nome: "Selena Gomez",
        foto: "/images/default-user.png",
        cargo: "store owner",
      },
      texto:
        "Muito obrigada pelo carinho, Sofia! Estamos sempre trabalhando para melhorar ainda mais 💜",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-black text-white font-league flex flex-col">

      {/* 🔵 NAVBAR */}
      <NavbarLogada />

      {/* ======================= */}
      {/* 🔹 SEÇÃO SUPERIOR (DARK) */}
      {/* ======================= */}
      <section className="bg-black text-white px-6 lg:px-20 pt-8 lg:pt-16 pb-20">

        {/* Header */}
        <div className="flex items-center justify-between max-w-[1500px] mx-auto">

          <div className="flex items-center gap-6 lg:gap-10">
            <button 
              onClick={() => router.back()} 
              className="hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>

            {/* Avatar */}
            <div className="relative">
                <Image
                src={review.usuario.foto}
                width={90}
                height={90}
                alt={review.usuario.nome}
                className="rounded-full object-cover w-[90px] h-[90px] lg:w-[120px] lg:h-[120px]"
                />
            </div>

            {/* Nome + tempo */}
            <div className="flex flex-col">
              <p className="text-2xl lg:text-4xl font-semibold">{review.usuario.nome}</p>
              <span className="text-lg lg:text-xl opacity-70">{review.tempo}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="text-yellow-400 text-3xl lg:text-5xl tracking-widest">
            {"★".repeat(review.nota)}
            <span className="text-gray-600">{"★".repeat(5 - review.nota)}</span>
          </div>
        </div>

        {/* Texto da Review */}
        <p className="text-xl lg:text-3xl mt-12 opacity-90 leading-relaxed max-w-[1500px] mx-auto font-light">
          {review.texto}
        </p>
      </section>

      {/* ==================================== */}
      {/* 🔸 THREAD DE RESPOSTAS (LIGHT MODE) */}
      {/* ==================================== */}
{/* ==================================== */}
      {/* 🔸 THREAD DE RESPOSTAS (LIGHT MODE) */}
      {/* ==================================== */}
      <section className="relative flex-1 bg-[#EFEFEF] text-black px-8 lg:px-36 py-16 pb-28">

        <div className="relative max-w-[1400px] mx-auto">

          {/* 📍 LINHA VERTICAL (Timeline) AJUSTADA
              - left-[27.5px] (metade de 55px) no mobile
              - lg:left-[35px] (metade de 70px) no desktop 
          */}
          <div className="absolute left-[27.5px] lg:left-[35px] top-0 bottom-24 w-0.5 bg-neutral-300 transform -translate-x-1/2" />

          {respostas.map((resposta) => (
            <div
              key={resposta.id}
              className="flex gap-6 lg:gap-10 mb-16 relative items-start"
            >
              {/* Avatar Wrapper */}
              <div className="relative z-10 flex-shrink-0">
                <Image
                  src={resposta.usuario.foto}
                  width={55}
                  height={55}
                  alt={resposta.usuario.nome}
                  // TRUQUE: Borda da cor do fundo (#EFEFEF) para o acabamento da linha
                  className="rounded-full object-cover bg-[#EFEFEF] border-4 border-[#EFEFEF] lg:w-[70px] lg:h-[70px]"
                />
              </div>

              {/* Conteúdo do comentário */}
              <div className="flex flex-col mt-1 w-full">

                {/* Nome */}
                <p className="font-semibold text-lg lg:text-xl">
                  {resposta.usuario.nome}
                </p>

                {/* Store Owner badge - REVERTIDO PARA O SEU ESTILO ORIGINAL */}
                {resposta.usuario.cargo && (
                  <span className="text-[11px] lg:text-xs text-[#5E3C9E] w-fit px-2 py-[3px] rounded mt-0.5">
                    {resposta.usuario.cargo}
                  </span>
                )}

                {/* Texto */}
                <p className="text-base lg:text-lg text-neutral-700 mt-3 max-w-3xl leading-relaxed lg:leading-[1.8]">
                  {resposta.texto}
                </p>
              </div>
            </div>
          ))}

          {/* =============================== */}
          {/* 🔻 INPUT */}
          {/* =============================== */}
          <div className="relative z-20 w-full bg-white rounded-full px-6 lg:px-10 py-4 lg:py-5 shadow-md flex items-center justify-between mt-6 lg:mt-12">
            <input
              type="text"
              placeholder="Responder comentário..."
              className="flex-1 outline-none text-black text-base lg:text-xl"
            />

            <button>
              <Send className="w-6 h-6 lg:w-8 lg:h-8 text-[#5E3C9E]" />
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}