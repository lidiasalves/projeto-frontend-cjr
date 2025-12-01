import React from 'react';
import Image from "next/image";

const Header = () => {
    return(
        
            <header className="w-full h-auto md:h-[447px] bg-black text-white py-12 md:py-6 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center overflow-hidden gap-8 md:gap-4">
                <div className = "md:w-1/2">
                    <h1 className="text-4xl md:text-6xl  font-bold leading-tight text-center md:text-right translate-y-0 translate-x-0 md:-translate-y-20 md:translate-x-20">
                        Do CAOS à organização,
                        <br /> em alguns cliques
                    </h1>
                </div>
                <div className="flex justify-center items-center h-full translate-y-0 md:translate-y-35 md:w-1/2">
                    <Image
                        src="/images/stockinha.png"
                        alt="Mascote do Stockio"
                        width={572}
                        height={700}
                        priority 
                        className="w-[300px] h-auto md:w-[572px] md:max-h-[700px] object-contain"
                    />                    
                </div>
            </header>
        
        
    );
}


export default Header;
