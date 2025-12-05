/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, Plus, Minus, Trash, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModalEditProduto({ isOpen, onClose, produto }: any) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(0);
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [imagens, setImagens] = useState<any[]>([]);
  const [novasImagens, setNovasImagens] = useState<File[]>([]);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setDescricao(produto.descricao || "");
      setCategoriaId(produto.CategoriaId);
      setPreco(produto.preco);
      setQuantidade(produto.estoque);
      setImagens(produto.imagens || []);
    }
  }, [produto]);

  

  //--------------
  // Salvar produto
  //--------------
  async function salvar() {
    try {
      const form = new FormData();

      form.append("nome", nome);
      form.append("descricao", descricao);
      form.append("preco", String(preco));
      form.append("estoque", String(quantidade));
      form.append("CategoriaId", String(categoriaId));
      form.append("LojaId", String(produto.LojaId));

      // Enviar novas imagens
      novasImagens.forEach((file) => {
        form.append("fotos", file);
      });

      await axios.put(`http://localhost:3001/produto/${produto.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Produto atualizado com sucesso!");
      onClose();
    } catch (err) {
      toast.error("Erro ao atualizar produto!");
      console.error(err);
    }
  }

  //--------------
  // Deletar produto
  //--------------
  async function deletar() {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    try {
      await axios.delete(`http://localhost:3001/produto/${produto.id}`);
      toast.success("Produto deletado!");
      onClose();
    } catch (err) {
      toast.error("Erro ao deletar produto!");
    }
  }

  //--------------
  // Trocar imagem existente
  //--------------
  function alterarImagem(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    const novas = [...novasImagens];
    novas[index] = file;

    const imgs = [...imagens];
    imgs[index] = { ...imgs[index], url_imagem: preview, _nova: true };

    setNovasImagens(novas);
    setImagens(imgs);
  }

  //--------------
  // Remover imagem
  //--------------
  function removerImagem(index: number) {
    let imgs = [...imagens];
    imgs.splice(index, 1);
    setImagens(imgs);

    let novas = [...novasImagens];
    novas.splice(index, 1);
    setNovasImagens(novas);
  }

  //--------------
  // Adicionar imagem nova (máx 4)
  //--------------
  function adicionarNovaFoto(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    if (imagens.length >= 4) return toast.warning("Máximo de 4 imagens!");

    const preview = URL.createObjectURL(file);

    setImagens(prev => [...prev, { url_imagem: preview, _nova: true }]);
    setNovasImagens(prev => [...prev, file]);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999">
      <div className="bg-[#EDEDED] w-[750px] max-h-[85vh] overflow-y-auto p-10 rounded-3xl relative shadow-xl">

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-600 hover:text-black"
        >
          <X size={32} />
        </button>

        <h1 className="text-center text-[38px] font-semibold mb-8">
          Editar Produto
        </h1>

        {/*- IMAGENS- */}
        <div className="flex flex-col items-center gap-4 mb-8">

          {/* Imagem principal */}
          {imagens[0] && (
            <ImagemEditor
              imagem={imagens[0]}
              onRemove={() => removerImagem(0)}
              onChange={(e) => alterarImagem(e, 0)}
              width="360px"
              height="180px"
            />
          )}

          {/* Imagens menores */}
          <div className="flex gap-6">
            {imagens.slice(1).map((img, i) => (
              <ImagemEditor
                key={i + 1}
                imagem={img}
                onRemove={() => removerImagem(i + 1)}
                onChange={(e) => alterarImagem(e, i + 1)}
                width="110px"
                height="110px"
              />
            ))}

            {/* Botão adicionar imagem (máx 4) */}
            {imagens.length < 4 && (
              <label
                className="border-2 border-dashed border-purple-400 rounded-xl w-[110px] h-[110px] flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
              >
                <Plus className="text-purple-600" />
                <span className="text-purple-600 text-xs mt-1">Adicionar</span>
                <input type="file" className="hidden" onChange={adicionarNovaFoto} />
              </label>
            )}
          </div>
        </div>

        {/*- FORM- */}
        <div className="flex flex-col gap-4">

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-white p-4 rounded-xl w-full"
          />

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="bg-white p-4 rounded-xl w-full h-[110px]"
          />

          <input
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="bg-white p-4 rounded-xl w-full"
          />
        </div>

        {/*- QUANTIDADE- */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Minus size={28} />
          </button>

          <span className="text-[40px] font-medium text-purple-600">
            {quantidade}
          </span>

          <button
            onClick={() => setQuantidade(quantidade + 1)}
            className="w-12 h-12 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Botão deletar */}
        <button
          onClick={deletar}
          className="w-full bg-red-600 text-white py-3 rounded-full text-lg font-medium mt-6 hover:opacity-90 transition"
        >
          DELETAR
        </button>

        {/* Botão salvar */}
        <button
          onClick={salvar}
          className="w-[260px] mx-auto mt-10 mb-4 block bg-purple-600 text-white py-3 rounded-full text-lg font-medium hover:opacity-90 transition"
        >
          Salvar
        </button>

      </div>
    </div>
  );
}

/*COMPONENTE DE IMAGEM*/

function ImagemEditor({ imagem, onRemove, onChange, width, height }: any) {
  return (
    <div
      style={{ width, height }}
      className="border border-purple-400 rounded-xl relative overflow-hidden"
    >
      <img src={imagem.url_imagem} className="w-full h-full object-cover" />

      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
      >
        <Trash size={18} />
      </button>

      <label
        className="absolute bottom-2 right-2 bg-purple-600 text-white p-1 rounded-full cursor-pointer"
      >
        <Upload size={18} />
        <input type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
