"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDAÇÕES FRONTEND
    if (!formData.nome || !formData.username || !formData.email) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }
    
    // Senha forte
    const senhaForteRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!senhaForteRegex.test(formData.senha)) {
      toast.error(
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          username: formData.username,
          email: formData.email,
          senha: formData.senha, // <-- NÃO É senha_hash NO FRONT!
        }),
      });

      const data = await response.json();

      // Se o backend retornar erro
      if (!response.ok) {
        
        if (Array.isArray(data.message)) {
          data.message.forEach((msg: string) => toast.error(msg));
        } 
        
        else if (typeof data.message === "string") {
          toast.error(data.message);
        }
        else {
          toast.error("Erro ao criar conta.");
        }
        return;
    }

      toast.success("Conta criada com sucesso!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex justify-center items-center px-8">
      <div className="max-w-6xl w-full flex items-center justify-between">

        {/* Card de Cadastro */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-black text-[#f6f2e8] rounded-4xl p-10">
          <h1 className="text-3xl font-bold mb-8">CRIE SUA CONTA</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4">
            <input
              name="nome"
              type="text"
              placeholder="Nome Completo"
              value={formData.nome}
              onChange={handleChange}
              className="rounded-full px-4 py-2 bg-[#f6f2e8] text-black outline-none"
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="rounded-full px-4 py-2 bg-[#f6f2e8] text-black outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-full px-4 py-2 bg-[#f6f2e8] text-black outline-none"
            />

            {/* Senha */}
            <div className="relative">
              <input
                name="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#f6f2e8] text-black outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirmar Senha */}
            <div className="relative">
              <input
                name="confirmarSenha"
                type={mostrarConfirmar ? "text" : "password"}
                placeholder="Confirmar Senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#f6f2e8] text-black outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {mostrarConfirmar ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#5b3db5] text-white py-2 font-semibold mt-4 hover:bg-[#4a3196] transition"
            >
              CRIAR CONTA
            </button>
          </form>

          <p className="mt-4 text-sm">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-[#5b3db5] hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Imagens */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/">
            <Image
              src="/images/logoCAD.png"
              alt="Logo"
              width={421}
              height={267}
              className="cursor-pointer hover:scale-105 transition-transform"
            />
          </Link>

          <Image
            src="/images/stockinhaCAD.png"
            alt="Boneca"
            width={496.57}
            height={1128.5}
          />
        </div>
      </div>
    </div>
  );
}
