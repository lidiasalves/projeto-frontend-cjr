/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    setErro("");

    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        senha,
      });

      // PADRONIZADO: front e perfil usarão userId
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userToken", res.data.token);

      router.push("/perfil");
    } catch (error) {
      setErro("Email ou senha incorretos");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F4EC]">
      <div className="flex items-center justify-center gap-10">
        
        {/* Parte esquerda */}
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Logo" className="w-90 h-auto mb-15" />
          <img src="/personagem.png" alt="Personagem" className="w-75 h-auto" />
        </div>

        {/* Formulário */}
        <div className="w-[380px] bg-black rounded-2xl text-white p-10 mt-40">
          <h2 className="text-2xl text-center font-bold mb-6">
            BEM VINDO DE VOLTA!
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-2xl bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="w-full px-4 py-3 pr-10 rounded-2xl bg-white text-black"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[#858585]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {erro && (
              <p className="text-red-400 text-center text-sm">{erro}</p>
            )}

            <button
              type="submit"
              className="bg-[#5E3C9E] hover:bg-purple-700 text-white font-semibold py-2 rounded-md"
            >
              ENTRAR
            </button>
          </form>

          <p className="text-sm text-gray-300 mt-6 text-center">
            Não possui uma conta?{" "}
            <a href="/cadastro" className="text-purple-400 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
