import React from 'react';
import Image from "next/image";
import { Icon } from '@iconify/react';
import Link from 'next/link';

const NavbarLogada = () => {
    return (
        <>
        <nav className="w-screen h-[92px] bg-black text-white py-4 px-8 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
                <Link href="/">    
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Stockio"
                        width={220}
                        height={42}
                        className="h-[42px] w-[220px]"
                        />
                </Link>    
            </div>
            <div className = "flex flex-row-reverse gap-5">
                    

                    <button 
                        type="button" 
                        aria-label="Sair da conta"
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                        
                        <Icon icon="fluent:arrow-exit-28-filled" width="24" height="24" className="text-white" />
                    </button>
                    
                    <Link 
                        href="#"
                        aria-label="Meu Perfil"
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                        <Icon icon="ion:person" width="24" height="24" className="text-white" />
                    </Link>
                    <Link 
                        href="#"
                        aria-label="Lojas"
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    
                        <Icon icon="lsicon:store-filled" width="24" height="24" className="text-white" />
                    </Link>

                    <Link 
                        href="#"
                        aria-label="Meu carrinho"
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                        
                        <Icon icon="ion:bag-sharp" width="24" height="24" className="text-white" />
                    </Link>
                </div>
        </nav>
        </>
    )
}


export default NavbarLogada;