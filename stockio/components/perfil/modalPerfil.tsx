/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
/* eslint-disable @next/next/no-img-element */
import { X, Camera } from "lucide-react";
import { useEffect, useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`
        fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999
        transition-opacity duration-200
        ${isOpen ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        className={`
          bg-white rounded-2xl w-[600px] p-8 relative shadow-xl
          transition-all duration-200
          ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}
        `}
        style={{ fontFamily: "League Spartan" }}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-600 hover:text-black cursor-pointer"
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-semibold mb-6">Editar Perfil</h2>

        {/* Foto */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="/images/default-profile.png"
              alt="Foto atual"
              className="w-full h-full object-cover"
            />
          </div>

          <button className="w-[50px] h-[50px] rounded-full bg-white shadow-md flex justify-center items-center hover:underline cursor-pointer">
            <Camera size={30} />
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full bg-gray-100 p-3 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full bg-gray-100 p-3 rounded-xl outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-100 p-3 rounded-xl outline-none"
          />
        </div>

        {/* Botões extras */}
        <div className="flex flex-col gap-3 mt-6">

          <button className="w-full p-3 rounded-xl bg-gray-200 text-black cursor-pointer hover:bg-gray-300">
            Alterar senha
          </button>

          <button className="w-full p-3 rounded-xl bg-red-500 text-white cursor-pointer hover:bg-red-600">
            Deletar conta
          </button>

          <button className="w-full bg-[#6A38F3] text-white py-3 rounded-xl text-lg cursor-pointer hover:bg-[#5830c7]">
            Salvar alterações
          </button>

        </div>
      </div>
    </div>
  );
}
