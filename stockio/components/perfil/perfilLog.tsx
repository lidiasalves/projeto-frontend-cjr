/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeft, Mail, Plus, Store, ShoppingBag, Star, MapPin } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Imports dos Modais
import EditProfileModal from "@/components/perfil/modalPerfil";
import ChangePasswordModal from "@/components/perfil/modalSenha";
import ModalAdicionarLoja from "@/components/modal/modalAdicionarLoja";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  // Estados dos Modais
  const [editOpen, setEditOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [addLojaOpen, setAddLojaOpen] = useState(false);

  const router = useRouter();

  const loadUser = useCallback(async () => {
    try {
      if (typeof window === "undefined") return;

      const id = localStorage.getItem("userId");

      if (!id) {
        router.push("/login");
        return;
      }

      const res = await fetch(`http://localhost:3001/usuario/${id}`);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!user) {
    return <div className="flex h-screen items-center justify-center bg-[#F6F3E4] text-2xl font-light">Carregando perfil...</div>;
  }

  // --- LÓGICA DE INTEGRAÇÃO ---
  
  // 1. Extrair todos os produtos de todas as lojas do usuário
  const todosProdutos = user.lojas?.flatMap((loja: any) => 
    loja.produtos?.map((prod: any) => ({ ...prod, nomeLoja: loja.nome })) || []
  ) || [];

  // 2. Extrair avaliações
  const minhasAvaliacoes = user.avaliacoesFeitas || [];

  // 3. Função para ir para a tela de loja estática/dinâmica
  const irParaLoja = (lojaId: number) => {
    router.push(`/loja/${lojaId}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F3E4]">

      {/* --- HEADER --- */}
      <div className="w-full h-[357px] bg-black relative">
        <button
          onClick={() => router.back()}
          className="absolute left-[5%] md:left-[115px] top-10 md:top-[250px] cursor-pointer z-10"
        >
          <ArrowLeft size={48} className="text-white" />
        </button>

        <img
          src={user.foto_perfil_url ?? "/images/default-profile.png"}
          alt="Foto de perfil"
          className="w-[150px] h-[150px] md:w-[230px] md:h-[230px] rounded-full absolute left-[5%] md:left-[180px] top-[180px] object-cover border-4 border-[#F6F3E4] shadow-lg"
        />
      </div>

      {/* --- INFO USUÁRIO --- */}
      <div className="mt-[60px] md:mt-0 px-[5%] md:px-0">
        <h1
            className="text-[32px] md:text-[52.56px] font-medium text-black md:absolute md:left-[180px] md:top-[512px] leading-none"
            style={{ fontFamily: "League Spartan" }}
        >
            {user.nome}
        </h1>

        <p
            className="text-[20px] md:text-[29.15px] font-light text-black md:absolute md:left-[180px] md:top-[570px]"
            style={{ fontFamily: "League Spartan" }}
        >
            @{user.username || "usuario"}
        </p>

        <div className="md:absolute md:left-[180px] md:top-[607px] flex items-center gap-2 mt-2 md:mt-0">
            <Mail size={24} className="text-black" />
            <p className="text-[20px] md:text-[29.15px] font-light text-black">
            {user.email}
            </p>
        </div>

        <button
            onClick={() => setEditOpen(true)}
            className="md:absolute md:right-[115px] md:top-[469px] mt-4 md:mt-0 w-full md:w-[324px] h-[43.32px] bg-[#5E3C9E] text-white rounded-full text-lg cursor-pointer hover:opacity-90 transition shadow-md"
        >
            Editar Perfil
        </button>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="mt-10 md:mt-[280px] px-[5%] md:ml-[115px] pb-20 max-w-[1400px]">

        {/* 1. SEÇÃO PRODUTOS (Carrossel) */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6 flex items-center gap-2">
            Meus Produtos
            <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-md">{todosProdutos.length}</span>
          </h2>
          
          {todosProdutos.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
              {todosProdutos.map((prod: any) => (
                <div key={prod.id} className="min-w-[200px] w-[200px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 snap-center hover:shadow-md transition">
                    <div className="h-32 bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                        {prod.imagemUrl ? (
                            <img src={prod.imagemUrl} className="w-full h-full object-cover" />
                        ) : (
                            <ShoppingBag className="text-gray-300 w-10 h-10" />
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                            {prod.nomeLoja}
                        </span>
                    </div>
                    <h3 className="font-bold text-gray-800 truncate">{prod.nome}</h3>
                    <p className="text-[#5E3C9E] font-bold mt-1">R$ {Number(prod.preco).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">
              Você ainda não tem produtos cadastrados em suas lojas.
            </p>
          )}
        </section>

        {/* 2. SEÇÃO LOJAS (Carrossel) */}
        <section className="mb-12">
          <div className="flex items-center justify-between w-full pr-[5%] md:pr-[115px] mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-black flex items-center gap-2">
                Minhas Lojas
                <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-md">{user.lojas?.length || 0}</span>
            </h2>

            <button 
              onClick={() => setAddLojaOpen(true)} 
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#5E3C9E] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#4a2e7c] transition hover:scale-110 active:scale-95"
            >
              <Plus className="text-white w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
            </button>
          </div>

          {user.lojas && user.lojas.length > 0 ? (
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
              {user.lojas.map((loja: any) => (
                <div 
                    key={loja.id} 
                    onClick={() => irParaLoja(loja.id)}
                    className="min-w-[280px] w-[280px] bg-white p-0 rounded-3xl shadow-md border border-gray-100 snap-center cursor-pointer group hover:scale-[1.02] transition-transform overflow-hidden"
                >
                   {/* Banner da Loja Card */}
                   <div className="h-24 bg-linear-to-r from-purple-500 to-indigo-600 relative">
                        {loja.banner_url && <img src={loja.banner_url} className="w-full h-full object-cover opacity-80" />}
                   </div>
                   
                   <div className="p-5 pt-0 relative">
                        {/* Logo sobreposto */}
                        <div className="w-16 h-16 bg-white rounded-2xl border-4 border-white shadow-md absolute -top-8 left-4 flex items-center justify-center overflow-hidden">
                            {loja.logo_url ? (
                                <img src={loja.logo_url} className="w-full h-full object-cover" />
                            ) : (
                                <Store className="text-purple-300 w-8 h-8" />
                            )}
                        </div>

                        <div className="mt-10">
                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5E3C9E] transition-colors">{loja.nome}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <MapPin size={14} /> 
                                {loja.endereco || "Online"}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 p-2 rounded-lg">
                                <ShoppingBag size={14} /> {loja.produtos?.length || 0} produtos
                            </div>
                        </div>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl bg-white/50 text-center">
                <p className="text-lg text-gray-500 mb-4">Você ainda não criou nenhuma loja.</p>
                <button onClick={() => setAddLojaOpen(true)} className="text-[#5E3C9E] font-bold hover:underline">
                    Criar minha primeira loja agora
                </button>
            </div>
          )}
        </section>

        {/* 3. SEÇÃO AVALIAÇÕES FEITAS (Carrossel) */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">Minhas Avaliações</h2>
          
          {minhasAvaliacoes.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                {minhasAvaliacoes.map((aval: any) => (
                    <div key={aval.id} className="min-w-[300px] w-[300px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 snap-center">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-800">{aval.loja?.nome || "Loja Excluída"}</h4>
                            <span className="text-xs text-gray-400">{new Date(aval.criadoEm).toLocaleDateString()}</span>
                        </div>
                        <div className="flex text-amber-400 mb-3">
                            {[1,2,3,4,5].map(s => (
                                <Star key={s} size={14} fill={s <= aval.nota ? "currentColor" : "none"} className={s <= aval.nota ? "" : "text-gray-200"} />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm italic line-clamp-3">"{aval.comentario}"</p>
                    </div>
                ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">
              Você ainda não avaliou nenhuma loja.
            </p>
          )}
        </section>
      </div>

      {/* --- MODAIS --- */}
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        onUpdate={(updatedUser) => setUser(updatedUser)}
        onChangePassword={() => {
          setEditOpen(false);
          setChangePasswordOpen(true);
        }}
      />

      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        userId={user.id}
        onBack={() => {
          setChangePasswordOpen(false);
          setEditOpen(true);
        }}
      />

      <ModalAdicionarLoja 
        isOpen={addLojaOpen}
        onClose={() => setAddLojaOpen(false)}
        onSuccess={() => loadUser()}
      />

    </div>
  );
}