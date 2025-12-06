"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // 1. Importar usePathname
import { Icon } from "@iconify/react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // 2. Pegar a rota atual
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    setIsLogged(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    router.push("/login"); 
  };

  // 3. Função auxiliar para decidir a cor
  // Ela verifica se você está exatamente na página OU dentro de uma subpágina (ex: /produtos/123)
  const getIconColor = (path: string) => {
    // Caso especial para a Home (senão ela fica verde em todas as páginas)
    if (path === "/") {
      return pathname === "/" ? "text-[#75E6DA]" : "text-white";
    }
    // Para as outras rotas, verifica se começa com o caminho (ex: /lojas ativa em /lojas e /lojas/detalhes)
    return pathname.startsWith(path) ? "text-[#75E6DA]" : "text-white";
  };

  return (
    <nav className="w-screen h-auto md:h-[92px] bg-black text-white py-4 px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-0 border-b border-neutral-900">
      
      {/* --- LOGO --- */}
      <div className="flex items-center">
        <Link href="/"> 
          <Image
            src="/images/logo.svg"
            alt="Logo Stockio"
            width={220}
            height={42}
            className="hover:scale-110 transition-transform"
            priority
          />
        </Link>
      </div>

      {/* --- MENU DA DIREITA --- */}
      <div className="flex flex-row-reverse gap-5 items-center">

        {isLogged ? (
          // 🟢 LOGADO
          <>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sair da conta"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors group"
            >
              {/* Adicionei group-hover para ficar vermelho ao passar o mouse pra sair */}
              <Icon icon="fluent:arrow-exit-28-filled" width="24" height="24" className="text-white group-hover:text-red-500 transition-colors" />
            </button>

            <Link
              href="/perfil"
              aria-label="Meu Perfil"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {/* Aplica a função de cor */}
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
          // 🔴 DESLOGADO
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

            {/* Ícones Deslogados (Geralmente não ficam ativos, mas se quiser pode usar a mesma função) */}
            <Link href="/lojas" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Icon icon="lsicon:store-filled" width="24" height="24" className={`${getIconColor("/lojas")} transition-colors`} />
            </Link>

            <Link href="/produtos" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Icon icon="ion:bag-sharp" width="24" height="24" className={`${getIconColor("/produtos")} transition-colors`} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;