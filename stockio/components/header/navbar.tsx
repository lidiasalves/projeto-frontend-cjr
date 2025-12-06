"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; 
import { Icon } from "@iconify/react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const [isLogged, setIsLogged] = useState(false);

  // 1. VERIFICAÇÃO DE LOGIN (Robusta)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    // Debug opcional
    // console.log("Navbar verificando login...", { token, userId }); 

    setIsLogged(!!token || !!userId);
  }, [pathname]); 

  // 2. A FUNÇÃO QUE FALTAVA (Correção do erro handleLogout is not defined)
  const handleLogout = () => {
    localStorage.clear(); // Limpa token e userId
    setIsLogged(false);
    router.push("/login"); 
  };

  // 3. Lógica de Cor (Verde Água se ativo)
  const getIconColor = (path: string) => {
    if (path === "/") {
      return pathname === "/" ? "text-[#75E6DA]" : "text-white";
    }
    return pathname.startsWith(path) ? "text-[#75E6DA]" : "text-white";
  };

  return (
    <nav className="w-screen h-auto md:h-[92px] bg-black text-white py-4 px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-0 border-b border-neutral-900 z-50 relative">
      
      {/* --- LOGO --- */}
      <div className="flex items-center">
        <Link href="/"> 
          <Image
            src="/images/logo.svg"
            alt="Logo Stockio"
            width={220}
            height={42}
            className="hover:scale-110 transition-transform cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* --- MENU DA DIREITA --- */}
      <div className="flex flex-row-reverse gap-5 items-center">

        {isLogged ? (
          // ==============================
          // 🟢 LOGADO
          // ==============================
          <>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sair da conta"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors group"
            >
              <Icon icon="fluent:arrow-exit-28-filled" width="24" height="24" className="text-white group-hover:text-red-500 transition-colors" />
            </button>

            <Link
              href="/perfil"
              aria-label="Meu Perfil"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Icon icon="ion:person" width="24" height="24" className={`${getIconColor("/perfil")} transition-colors`} />
            </Link>

            <Link
              href="/lojas"
              aria-label="Lojas"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Icon icon="lsicon:store-filled" width="24" height="24" className={`${getIconColor("/lojas")} transition-colors`} />
            </Link>

            <Link
              href="/produtos"
              aria-label="Produtos"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Icon icon="ion:bag-sharp" width="24" height="24" className={`${getIconColor("/produtos")} transition-colors`} />
            </Link>
          </>
        ) : (
          // ==============================
          // 🔴 DESLOGADO
          // ==============================
          <>
            <Link
              href="/cadastro"
              className="font-semibold rounded-full bg-[#5E3C9E] py-2 px-4 hover:bg-gray-500 transition-colors"
            >
              Cadastre-se
            </Link>

            <Link
              href="/login"
              className="font-semibold rounded-full py-2 px-4 text-white hover:bg-[#C1A8E9] hover:text-black transition-colors"
            >
              Entrar
            </Link>

            {/* Ícones Deslogados FUNCIONAIS e com COR ATIVA */}
            <Link 
              href="/lojas" 
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Icon icon="lsicon:store-filled" width="24" height="24" className={`${getIconColor("/lojas")} transition-colors`} />
            </Link>

            <Link 
              href="/produtos" 
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Icon icon="ion:bag-sharp" width="24" height="24" className={`${getIconColor("/produtos")} transition-colors`} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;