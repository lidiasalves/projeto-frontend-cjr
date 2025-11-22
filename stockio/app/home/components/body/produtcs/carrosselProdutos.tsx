"use client";
import { useRef, useState } from "react";
import CardProduto from "./cardProduto";
import { produtosMock } from "@/mock/produtosMock";
import { useDragScroll } from "../../hooks/useDragScroll";
const CarrosselProdutos = () => { 

    const {
    carrosselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
        } = useDragScroll();

    return (
        <section className="w-full px-6 py-8">
            <div className = "flex items-center justify-between px-4 mt-6">
            <h2 className="text-3xl font-semibold md:text-5xl  text-black mb-4">
                Produtos
                <span className = "ml-2 text-sm font-normal text-[#5E3C9E]">em tecnologia</span>  
            </h2> 
            </div> 

            <div ref={carrosselRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-8 overflow-x-auto cursor-grab select-none scroll-smooth sem-barra">
                {produtosMock.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        preco={produto.preco}
                        imagem={produto.imagem}
                        estoque={produto.estoque}
                        stickerLoja={ produto.sticker}
                    />
                    
                ))}
                </div>

    
    
        </section>
    
    
    )
}



export default CarrosselProdutos;