import React from "react";
import { Icon } from "@iconify/react";

const BarraPesquisa = () => {
    return (
        <div className= "w-full px-4 mt-8">
            <div className="relative mx-auto max-w-[603px] w-full h-10 bg-white shadow-md rounded-lg"
                 >
                <input 
                    type="text"
                    placeholder= "Procurar por..."
                    className="w-full h-full pl-4 pr-10 bg-transparent rounded-lg focus:outline-none text-gray-500 text-base"
                />
                <Icon 
                    icon="ph:magnifying-glass-light" 
                    className = "absolute right-3"
                    width="22" height="22" 
                />

            </div>

        </div>


    )


}

export default BarraPesquisa;