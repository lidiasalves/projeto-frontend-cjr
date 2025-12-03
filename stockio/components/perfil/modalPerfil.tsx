/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { X, Camera, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onChangePassword: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onChangePassword,
}: EditProfileModalProps) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const [excluirModal, setExcluirModal] = useState(false);
  const [senhaExcluir, setSenhaExcluir] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setNome(user.nome);
      setUsername(user.username);
      setEmail(user.email);
      setFotoPreview(user.foto_perfil_url || "/images/default-profile.png");
    } else {
      setTimeout(() => setShow(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  async function handleFotoChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("foto", file);

    try {
      const res = await axios.patch(
        `http://localhost:3001/usuario/${user.id}/foto`,
        fd
      );

      const fotoUrl =
        res.data?.foto_perfil_url ||
        res.data?.fotoUrl ||
        res.data?.usuario?.foto_perfil_url ||
        null;

      if (fotoUrl) setFotoPreview(fotoUrl);

      toast.success("Foto atualizada!");
    } catch (err: any) {
      console.log(err);
      toast.error("Erro ao enviar a foto");
      setFotoPreview(user.foto_perfil_url || "/images/default-profile.png");
      setFotoFile(null);
    }
  }

  async function handleResetFoto() {
    try {
      await axios.patch(`http://localhost:3001/usuario/${user.id}/reset-foto`);

      setFotoPreview("/images/default-profile.png");
      toast.success("Foto removida!");
    } catch (error) {
      toast.error("Erro ao remover foto");
    }
  }

  async function handleSave() {
    if (!nome || !username || !email) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/usuario/${user.id}`, {
        nome,
        username,
        email,
      });

      toast.success("Perfil atualizado!");
      onClose();
      window.location.reload();
    } catch (error: any) {
      if (error.response?.data?.message?.includes("email")) {
        toast.error("Este email já está sendo usado!");
      } else if (error.response?.data?.message?.includes("username")) {
        toast.error("Este username já está sendo usado!");
      } else {
        toast.error("Erro ao atualizar perfil.");
      }
    }
  }

  async function handleDelete() {
    if (!senhaExcluir) {
      toast.error("Digite sua senha para confirmar!");
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/usuario/${user.id}`, {
        data: { senha: senhaExcluir },
      });

      toast.success("Conta excluída com sucesso!");
      localStorage.clear();
      window.location.href = "/homeDeslogada";
    } catch (error) {
      toast.error("Senha incorreta ou erro ao excluir conta.");
    }
  }

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
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-600 hover:text-black"
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-semibold mb-6">Editar Perfil</h2>

        <div className="flex flex-col items-center mb-6 gap-3">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <img
              src={fotoPreview ?? "/images/default-profile.png"}
              alt="Foto"
              className="w-full h-full object-cover"
            />
          </div>

          <label className="cursor-pointer w-[50px] h-[50px] bg-white shadow-md rounded-full flex items-center justify-center">
            <Camera size={28} />
            <input type="file" accept="image/*" className="hidden" onChange={handleFotoChange} />
          </label>

          <button
            onClick={handleResetFoto}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 text-sm"
          >
            <Trash2 size={18} />
            Remover foto
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            className="w-full bg-gray-100 p-3 rounded-xl"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />

          <input
            className="w-full bg-gray-100 p-3 rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <input
            className="w-full bg-gray-100 p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => setExcluirModal(true)}
            className="w-full p-3 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            Deletar conta
          </button>

          {/* BOTÃO ALTERAR SENHA */}
          <button
            onClick={() => {
              onClose();
              onChangePassword(); 
            }}
            className="w-full p-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Alterar senha
          </button>

          <button
            onClick={handleSave}
            className="w-full bg-[#6A38F3] text-white py-3 rounded-xl text-lg hover:bg-[#5830c7]"
          >
            Salvar alterações
          </button>
        </div>
      </div>

      {excluirModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
          <div className="bg-white p-8 rounded-xl w-[450px] shadow-xl">
            <h2 className="text-2xl mb-4">Tem certeza que deseja excluir?</h2>
            <p className="text-gray-600 mb-4">
              Digite sua senha para confirmar a exclusão permanente da conta.
            </p>

            <input
              type="password"
              placeholder="Senha"
              value={senhaExcluir}
              onChange={(e) => setSenhaExcluir(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setExcluirModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
