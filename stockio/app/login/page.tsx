"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F4EC]">
      <div className="flex items-center justify-center gap-10">
        {/* Lado esquerdo com logo e personagem */}
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Logo da empresa"
            className="w-90 h-auto mb-15 transition-transform duration-300 hover:scale-110"
          />

          <img
            src="/personagem.png"
            alt="Personagem"
            className="w-75 h-auto transform scale-125"
          />
        </div>

        {/* Lado direito com o formulário */}
        <div className="w-[380px] bg-black rounded-2xl text-white flex flex-col justify-center mt-40 p-10">
          <h2 className="text-2xl text-center font-bold mb-6">
            BEM VINDO DE VOLTA!
          </h2>

          <form className="flex flex-col space-y-4">
            {/* Campo Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-2xl bg-white text-black placeholder-[#858585] focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />

            {/* Campo Senha com ícone */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="w-full px-4 py-3 pr-10 rounded-2xl bg-white text-black placeholder-[#858585] focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[#858585] hover:text-purple-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <a
              href="#"
              className="text-sm text-gray-300 underline hover:text-purple-400 text-center"
            >
              Esqueceu sua senha?
            </a>

            <button
              type="submit"
              className="bg-[#5E3C9E] hover:bg-purple-700 text-white font-semibold py-2 rounded-md"
            >
              ENTRAR
            </button>
          </form>

          <p className="text-sm text-gray-300 mt-6 text-center">
            Não possui uma conta?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
