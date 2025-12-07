/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeft, Mail, Store, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function PerfilPublico() {
  const router = useRouter();
  const params = useParams();

  const { id } = params; // pega o ID da URL

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`http://localhost:3001/usuario/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      }
    }

    loadUser();
  }, [id]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F6F3E4] text-2xl font-light">
        Carregando perfil...
      </div>
    );
  }

  // TODOS OS PRODUTOS DO USUÁRIO
  const todosProdutos =
  user.lojas?.flatMap((loja: any) =>
    loja.produtos?.map((p: any) => ({ ...p, nomeLoja: loja.nome })) || []
  ) || [];

  const irParaLoja = (lojaId: number) => {
    router.push(`/loja/${lojaId}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F3E4]">
      {/* HEADER */}
      <div className="w-full h-[357px] bg-black relative">
        <button
          onClick={() => router.back()}
          className="absolute left-[5%] md:left-[115px] top-10 md:top-[250px]"
        >
          <ArrowLeft size={48} className="text-white" />
        </button>

        <img
          src={user.foto_perfil_url ?? "/images/default-profile.png"}
          className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] rounded-full absolute left-[5%] md:left-[180px] top-[180px] object-cover border-4 border-[#F6F3E4]"
        />
      </div>

      {/* INFO */}
      <div className="mt-[60px] md:mt-0 px-[5%] md:px-0">
        <h1 className="text-[32px] md:text-[52px] font-medium text-black md:absolute md:left-[180px] md:top-[512px]">
          {user.nome}
        </h1>

        <p className="text-[20px] md:text-[29px] font-light text-black md:absolute md:left-[180px] md:top-[570px]">
          @{user.username}
        </p>

        <div className="md:absolute md:left-[180px] md:top-[607px] flex items-center gap-2 mt-2 md:mt-0">
          <Mail size={24} />
          <p className="text-[20px] md:text-[29px]">{user.email}</p>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="mt-10 md:mt-[280px] px-[5%] md:ml-[115px] pb-20 max-w-[1400px]">
        
        {/* --- SEÇÃO PRODUTOS DO USUÁRIO (VISITANTE) --- */}
<section className="mb-12">
  <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6 flex items-center gap-2">
    Produtos
    <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
      {todosProdutos.length}
    </span>
  </h2>

  {todosProdutos.length > 0 ? (
    <div>
      {/* CARROSSEL LIMITADO A 8 PRODUTOS */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                {todosProdutos.slice(0, 8).map((prod: any) => {
                const imgSrc =
                    prod.imagens?.find((img: any) => img?.url_imagem)?.url_imagem || null;

                return (
                    <div
                    key={prod.id}
                    onClick={() => router.push(`/produto/${prod.id}`)}
                    className="min-w-[200px] w-[200px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 snap-center hover:shadow-md transition"
                    >
                    <div className="h-32 bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                        {imgSrc ? (
                        <img src={imgSrc} className="w-full h-full object-cover" />
                        ) : (
                        <ShoppingBag className="text-gray-300 w-10 h-10" />
                        )}

                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                        {prod.nomeLoja}
                        </span>
                    </div>

                    <h3 className="font-bold text-gray-800 truncate">{prod.nome}</h3>
                    <p className="text-[#5E3C9E] font-bold mt-1">
                        R$ {Number(prod.preco).toFixed(2)}
                    </p>
                    </div>
                );
                })}
            </div>

            {/* BOTÃO VER MAIS */}
            {todosProdutos.length > 8 && (
                <button
                onClick={() => router.push(`/perfil/produtos`)}
                className="mt-4 text-[#5E3C9E] font-semibold hover:underline text-lg"
                >
                Ver mais produtos ({todosProdutos.length - 8} restantes)
                </button>
            )}
            </div>
        ) : (
            <p className="text-lg text-gray-500">
            Este usuário ainda não possui produtos cadastrados.
            </p>
        )}
        </section>


        {/* LOJAS */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Lojas</h2>

          {user.lojas?.length > 0 ? (
            <div className="flex gap-8 overflow-x-auto pb-6">
              {user.lojas.map((loja: any) => (
                <div
                  key={loja.id}
                  onClick={() => irParaLoja(loja.id)}
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-24 h-24 rounded-full border p-1 bg-white overflow-hidden flex items-center justify-center">
                    {loja.logo_url ? (
                      <img
                        src={loja.logo_url}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Store className="text-gray-300 w-10 h-10" />
                    )}
                  </div>
                  <span className="text-center font-medium text-lg truncate max-w-[120px]">
                    {loja.nome}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">Nenhuma loja cadastrada.</p>
          )}
        </section>

      </div>
    </div>
  );
}
