/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProdutosDoPerfil() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (!id) {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:3001/usuario/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Todos os meus produtos
      </h1>

      {user.lojas?.length === 0 && (
        <p className="text-lg text-center text-gray-500">
          Você ainda não possui lojas cadastradas.
        </p>
      )}

      {/* --- AGRUPAMENTO POR LOJA --- */}
      {user.lojas?.map((loja: any) => (
        <div key={loja.id} className="mb-12">
          {/* Título da Loja */}
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <img
              src={loja.logo_url || "/images/default-shop.png"}
              className="w-10 h-10 rounded-full object-cover border"
            />
            {loja.nome}
            <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
              {loja.produtos.length} produto(s)
            </span>
          </h2>

          {/* Lista de Produtos */}
          {loja.produtos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {loja.produtos.map((prod: any) => {
                const imgSrc =
                  prod.imagens?.find((img: any) => img.url_imagem)
                    ?.url_imagem || null;

                return (
                  <div
                    key={prod.id}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="h-32 bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-400">Sem imagem</p>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-800 truncate">
                      {prod.nome}
                    </h3>

                    <p className="text-[#5E3C9E] font-bold mt-1">
                      R$ {Number(prod.preco).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 ml-1">Nenhum produto nesta loja.</p>
          )}
        </div>
      ))}
    </div>
  );
}
