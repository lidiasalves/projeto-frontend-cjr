import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Icon } from '@iconify/react';


const NavbarDeslogada = () => { 
    return (
        
        <nav className="w-screen h-auto md:h-[92px] bg-black text-white py-4 px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-0">
            <div className="flex items-center">
                <Link href="/homeDeslogada">    
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Stockio"
                        width={220}
                        height={42}
                        className='hover:scale-110'
                        priority
                        />
                </Link>    
            </div>
            <div className="flex flex-row-reverse gap-5">


                                
                
                <Link href="/cadastro" aria-label="Criar uma nova conta" className="font-semi-bold rounded-full bg-[#5E3C9E] py-2 px-4 hover:bg-gray-500 transition-colors">
                    Cadastre-se
                </Link>

                <Link href = "#" aria-label='Entrar na sua conta' className = "font-semi-bold rounded-full py-2 px-4 text-white hover:bg-[#C1A8E9] hover:text-black transition-colors">
                    Entrar
                </Link>

                <Link 
                    href="#"
                    aria-label="Lojas"
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    
                    <Icon icon="lsicon:store-filled" width="24" height="24" className="text-white " />
                </Link>
                    
                <Link 
                    href="#"
                    aria-label="Produtos"
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                        
                    <Icon icon="ion:bag-sharp" width="24" height="24" className="text-white" />
                </Link>                  
                         




           
            </div>  
        </nav>
    )

}



export default NavbarDeslogada;