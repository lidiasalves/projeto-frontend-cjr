/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { X, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function InputSenha({
  label,
  value,
  setValue,
  show,
  setShow,
}: {
  label: string;
  value: string;
  setValue: any;
  show: boolean;
  setShow: any;
}) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-gray-100 p-3 rounded-xl pr-12"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
      >
        {show ? <EyeOff size={22} /> : <Eye size={22} />}
      </button>
    </div>
  );
}

// -----------------------------------------------------

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  onBack: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  userId,
  onBack,
}: ChangePasswordProps) {
  const [show, setShow] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else setTimeout(() => setShow(false), 200);
  }, [isOpen]);

  if (!isOpen && !show) return null;

  async function handleSubmit() {
    if (!oldPass || !newPass || !confirm) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (newPass !== confirm) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      await axios.patch("http://localhost:3001/usuario/alterar-senha", {
        id: userId,
        senhaAntiga: oldPass,
        novaSenha: newPass,
      });

      toast.success("Senha alterada com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Senha antiga incorreta.");
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm transition-opacity duration-200 z-999
      ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white w-[500px] p-8 rounded-2xl shadow-xl transition-all duration-200 relative
        ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        <button
          onClick={onBack}
          className="absolute left-4 top-4 p-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={28} />
        </button>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-600 hover:text-black"
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-semibold mb-8 text-center">Alterar Senha</h2>

        <div className="flex flex-col gap-4">
          <InputSenha
            label="Senha Antiga"
            value={oldPass}
            setValue={setOldPass}
            show={showOld}
            setShow={setShowOld}
          />

          <InputSenha
            label="Nova Senha"
            value={newPass}
            setValue={setNewPass}
            show={showNew}
            setShow={setShowNew}
          />

          <InputSenha
            label="Confirmar Senha"
            value={confirm}
            setValue={setConfirm}
            show={showConfirm}
            setShow={setShowConfirm}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-[#6A38F3] text-white py-3 rounded-xl text-lg hover:bg-[#5830c7]"
        >
          Salvar senha
        </button>
      </div>
    </div>
  );
}
