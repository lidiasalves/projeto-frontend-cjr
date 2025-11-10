import React from "react";
import { Icon } from "@iconify/react";

const BarraPesquisa = () => {
    return (
        <div className= "w-full -mt-4">
            <div className="relative ml-auto max-w-[603px] w-full h-10 bg-white shadow-md rounded-full"
                 >
                <input 
                    type="text"
                    placeholder= "Procurar por..."
                    className="w-full h-full pl-4 pr-10 bg-transparent rounded-full focus:outline-none text-[#5E3C9E] text-base placeholder:text-[#5E3C9E]"
                />
                <button type="submit" 
                    className = "absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-[#2A3D66]">
                    <Icon 
                        icon="ph:magnifying-glass-light" 
                        
                        width="22" height="22" 
                    />
                </button>
            </div>

        </div>


    )


}

export default BarraPesquisa;