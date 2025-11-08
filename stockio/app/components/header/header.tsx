import React from 'react';
import NavbarLogada from './navbarlogada';
import Image from "next/image";

const HeaderLogada = () => {
    return(
        <>
            <NavbarLogada />       
            <header className="w-screen h-[447px] bg-black text-white py-6 px-8  flex justify-between items-center overflow-y-hidden">
                <div className = "w-max-lg mt-20 mb-10">
                    <h1 className="text-6xl font-bold leading-tight text-right -translate-y-20 translate-x-20">
                        Do CAOS à organização,
                        <br /> em alguns cliques
                    </h1>
                </div>
                <div className="flex justify-center items-center h-full translate-y-35">
                    <Image
                        src="/images/stockinha.png"
                        alt="Mascote do Stockio"
                        width={572}
                        height={700}
                        className="max-h-[700px] object-contain"
                    />                    
                </div>
            </header>
        
        </>
    );
}


export default HeaderLogada;
