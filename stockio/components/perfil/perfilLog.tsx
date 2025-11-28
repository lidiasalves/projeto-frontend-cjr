/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeft, Mail, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import EditProfileModal from "@/components/perfil/modalPerfil";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const id = localStorage.getItem("user_id");

        if (!id) {
          console.log("Nenhum ID encontrado no localStorage.");
          return;
        }

        const res = await fetch(`http://localhost:3001/usuario/${id}`);
        const data = await res.json();
        setUser(data);

      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      }
    }

    loadUser();
  }, []);

  if (!user) {
    return <p className="text-black p-10 text-2xl">Carregando...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#F6F3E4]">

      {/* Faixa preta */}
      <div className="w-full h-[357px] bg-black relative">

        {/* Seta voltar */}
        <button className="absolute left-[115px] top-[250px] cursor-pointer">
          <ArrowLeft size={48} className="text-white" />
        </button>

        {/* FOTO DO PERFIL DO BANCO */}
        <img
          src={user.foto_perfil_url ?? "/images/default-profile.png"}
          alt="Foto de perfil"
          className="w-[230px] h-[230px] rounded-full absolute left-[180px] top-[180px] object-cover"
        />
      </div>

      {/* Nome */}
      <h1
        className="text-[52.56px] font-medium text-black absolute left-[180px] top-[512px] leading-none max-w-[600px]"
        style={{ fontFamily: "League Spartan" }}
      >
        {user.nome}
      </h1>

      {/* Username REAL DO BANCO */}
      <p
        className="text-[29.15px] font-light text-black absolute left-[180px] top-[570px] leading-none max-w-[500px]"
        style={{ fontFamily: "League Spartan" }}
      >
        @{user.username}
      </p>

      {/* Email */}
      <div className="absolute left-[180px] top-[607px] flex items-center gap-2">
        <Mail size={24} className="text-black" />
        <p
          className="text-[29.15px] font-light text-black"
          style={{ fontFamily: "League Spartan" }}
        >
          {user.email}
        </p>
      </div>

      {/* Botão editar */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute left-[1300px] top-[469px] w-[324px] h-[43.32px] bg-[#6a38f3] text-white rounded-full text-lg cursor-pointer hover:opacity-90 transition"
      >
        Editar Perfil
      </button>

      {/* MODAL */}
      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        user={user}
      />

      <div className="mt-[280px] ml-[115px] pb-20">

        {/* Produtos */}
        <section className="mb-12">
          <h2 className="text-4xl font-semibold text-black mb-6">Produtos</h2>
          <p className="text-lg text-gray-500">
            O usuário ainda não possui produtos cadastrados.
          </p>
        </section>

        {/* Lojas */}
        <section className="mb-12">
          <div className="flex items-center justify-between w-full pr-[115px]">
            <h2 className="text-4xl font-semibold text-black mb-6">Lojas</h2>

            <button className="w-[60px] h-[60px] bg-[#7621FF] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:opacity-90 transition">
              <Plus className="text-white w-6 h-6" strokeWidth={3} />
            </button>
          </div>

          <p className="text-lg text-gray-500 ml-0.5">
            O usuário ainda não possui lojas cadastradas.
          </p>
        </section>

        {/* Avaliações */}
        <section className="mb-12">
          <h2 className="text-4xl font-semibold text-black mb-6">Avaliações</h2>
          <p className="text-lg text-gray-500">
            O usuário ainda não fez avaliações no momento.
          </p>
        </section>
      </div>
    </div>
  );
}
