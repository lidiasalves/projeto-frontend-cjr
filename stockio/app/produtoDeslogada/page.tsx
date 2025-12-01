"use client";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import NavbarDeslogada from "@/components/header/navbardeslogada";
import CardProduto from "@/components/body/produtcs/cardProduto";
import { useState } from "react";

export default function ProdutoPage() {
  const imagens = [
    "/images/produto1.svg",
    "/images/variacao1produto.svg",
    "/images/variacao2produto.svg",
    "/images/variacao3produto.svg",
  ];

  const [imagemPrincipal, setImagemPrincipal] = useState(imagens[0]);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <NavbarDeslogada />

      <main className="max-w-[1200px] mx-auto mt-10 flex gap-10">
        <button className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300">
          <ChevronLeft size={24} />
        </button>

        {/* GALERIA DE IMAGENS */}
        <div className="flex gap-4">
          
          {/* Miniaturas */}
          <div className="flex flex-col gap-3">
            {imagens.map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer"
                onClick={() => setImagemPrincipal(img)}
              >
                {/* MINIATURA */}
                <Image
                  src={img}
                  width={80}
                  height={80}
                  alt="Thumb"
                  className={`
                    rounded-lg border transition 
                    ${imagemPrincipal === img ? "border-purple-600" : "border-gray-300"}
                  `}
                />

                {/* LOGO SOBREPOSTA */}
                <Image
                  src="/images/logo.png" // <-- Coloque sua logo aqui
                  width={28}
                  height={28}
                  alt="Logo"
                  className="absolute top-1 left-1 opacity-80"
                />
              </div>
            ))}
          </div>

          {/* Imagem principal */}
          <div className="bg-white rounded-2xl p-6 shadow-md relative">
            <Image
              src={imagemPrincipal}
              width={380}
              height={380}
              alt="Brownie principal"
              className="transition-all duration-200"
            />

            {/* LOGO SOBRE A IMAGEM PRINCIPAL */}
            <Image
              src="/images/logo.png"  // mesma logo
              width={60}
              height={60}
              alt="Logo grande"
              className="absolute top-4 left-4 opacity-80"
            />
          </div>
        </div>

        {/* DETALHES */}
        <div className="max-w-[450px]">
          <h2 className="text-2xl font-bold mb-2">Brownie Meio Amargo</h2>
          <p className="text-xl font-semibold mb-4">R$ 4.70</p>

          <h3 className="font-semibold mb-2">Descrição</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            BROWNIE MEIO AMARGO 80g...
          </p>
        </div>
      </main>

      <section className="max-w-[1200px] mx-auto mt-16">
        <h2 className="text-lg font-bold mb-6">Da mesma loja</h2>

        <div className="grid grid-cols-5 gap-6">
          <CardProduto id={0} nome={"Brownie M&M's"} preco={4.70} imagem={"/images/produto2.svg"} estoque={0} />
          <CardProduto id={0} nome={"Brownie Nozes"} preco={4.70} imagem={"/images/produto3.svg"} estoque={0} />
          <CardProduto id={0} nome={"Brownie Trad."} preco={4.70} imagem={"/images/produto4.svg"} estoque={0} />
          <CardProduto id={0} nome={"Brownie Cookies 'n Cream"} preco={4.70} imagem={"/images/produto5.svg"} estoque={0} />
          <CardProduto id={0} nome={"Brownie Doce L."} preco={4.70} imagem={"/images/produto6.svg"} estoque={0} />
        </div>
      </section>
    </div>
  );
}
