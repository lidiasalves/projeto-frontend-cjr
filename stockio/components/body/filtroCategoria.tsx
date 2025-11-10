"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const filtroIcons = [
    { name: 'Mercado', icon: 'fluent-emoji-high-contrast:shopping-cart' },
    { name: 'Farmácia', icon: 'healthicons:pharmacy-outline' },
    { name: 'Beleza', icon: 'streamline-ultimate:make-up-lipstick' },
    { name: 'Moda', icon: 'icon-park-outline:clothes-crew-neck' },
    { name: 'Eletrônicos', icon: 'ph:laptop-light' },
    { name: 'Jogos', icon: 'ph:game-controller-light' },
    { name: 'Brinquedos', icon: 'ph:teddy-bear-light' },
    { name: 'Casa', icon: 'ph:house-light' },
];

const FiltroCategoria = () => { 
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full max-w-sm">
            <button onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-3 px-5 rounded-full bg-white text-[#5E3C9E] font-light text-lg shadow-md">
                <span>filtros</span>
                {isOpen ? (
                    <Icon icon="ph:caret-up-bold" width="20" />
                ) : (
                    <Icon icon="ph:caret-down-bold" width="20" />)}
            </button>

            {isOpen && (
                <div className="absolute top-full w-full bg-white rounded-lg shadow-xl mt-2 p-6 z-30">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-[#5E3C9E]">filtros</h3>
                        <button onClick={() => setIsOpen(false)} className="text-[#5E3C9E]">
                            <Icon icon="ph:caret-up-bold" width="20"/>
                        </button>
                    </div>
                    <div className="space-y-4">
                        {filtroIcons.map((icones) => (
                            <label key={icones.name} className="flex items-center text-lg text-[#5E3C9E] cursor-pointer">
                                <input type="checkbox" className="w-6 h-6 rounded-full border-gray-50 text-[#5E3C9E] focus:ring-[#2A3D66]" />
                                <span className="ml-3">{icones.name}</span>
                                <Icon icon={icones.icon} className="ml-2 text-[#5E3C9E]"/>
                            </label>
                        ))}
                    </div>    
                </div>
            )}
        </div>
    )
}

export default FiltroCategoria;