"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const BarraPesquisa = () => {
    const [termo, setTermo] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (termo.trim()) {
            router.push(`/pesquisa?q=${encodeURIComponent(termo)}`);
        }
    };

    return (
        <div className="w-full -mt-4">
            <form 
                onSubmit={handleSearch}
                className="relative ml-auto max-w-[603px] w-full h-10 bg-white shadow-md rounded-full"
            >
                <input 
                    type="text"
                    placeholder="Procurar por..."
                    value={termo}
                    onChange={(e) => setTermo(e.target.value)}
                    className="w-full h-full pl-4 pr-12 bg-transparent rounded-full focus:outline-none text-[#5E3C9E] text-base placeholder:text-[#5E3C9E]/70"
                />
                
                <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5E3C9E] hover:text-[#2A3D66] transition-colors"
                    aria-label="Buscar"
                >
                    <Icon icon="ph:magnifying-glass-light" width="22" height="22" />
                </button>
            </form>
        </div>
    )
}

export default BarraPesquisa;