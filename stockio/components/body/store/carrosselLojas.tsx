"use client";
import { useRef, useState } from "react";
import CardLojas from "./cardLojas";
import { lojasMock } from "@/mock/lojasMock";
import { categoriesData } from "@/mock/categoriasMock";
import { useDragScroll } from "@/components/hooks/useDragScroll";




const CarrosselLojas = () => { 

  const {
    carrosselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    } = useDragScroll();

    return (
        <section className="w-full px-6 py-8">
            <div>
                <h2 className="text-3xl font-semibold md:text-5xl  text-black mb-4">
                Lojas
                </h2>
            </div> 
            

            <div ref={carrosselRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-8 overflow-x-auto cursor-grab select-none scroll-smooth sem-barra">
                {lojasMock.map((loja) => (
                    <CardLojas
                        key={loja.id}
                        id={loja.id}
                        nome={loja.nome}
                        stickerLoja={loja.stickerLoja}
                        categoria={loja.categoria}
                    />
                    
                ))}
                </div>

    
    
        </section>
    
    
    )
}



export default CarrosselLojas;