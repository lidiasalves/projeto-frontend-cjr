"use client";

import { useDragScroll } from "@/components/hooks/useDragScroll";
import Comentario from "./cardAvaliacao";

// 1. AJUSTAMOS A INTERFACE PARA BATER COM O QUE VEM DO BANCO
interface AvaliacaoData {
  id: number;
  nota: number;
  comentario: string;
  // O backend manda um objeto usuario, não uma string direta
  usuario?: {
    nome: string;
    foto_perfil_url?: string;
  };
}

const CarrosselAvaliacoes = ({ avaliacoes }: { avaliacoes: AvaliacaoData[] }) => {
  const {
    carrosselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDragScroll();

  // Se não tiver avaliações, mostra mensagem amigável
  if (!avaliacoes || avaliacoes.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        Ainda não há avaliações para esta loja.
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-6 flex flex-col items-center">

      <div
        ref={carrosselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="
          flex gap-6 mt-7 w-full max-w-7xl
          overflow-x-auto overflow-y-hidden 
          cursor-grab select-none scroll-smooth sem-barra
          pb-4
        "
      >
        {avaliacoes.map((item) => (
          <div
            key={item.id}
            className="shrink-0" // Removemos largura fixa para o card decidir, ou ajuste conforme preferir
          >
            {/* 2. AQUI ESTAVA O ERRO: PASSAMOS STRINGS SEPARADAS AGORA */}
            <Comentario
              id={String(item.id)} // Passamos o ID convertido para string
              lojaId={String(item.LojaId)}
              // Extraímos só o TEXTO do nome (resolve o erro do objeto)
              usuario={item.usuario?.nome || "Anônimo"} 
              
              comentario={item.comentario}
              nota={item.nota}
              
              // Passamos a foto separadamente
              foto={item.usuario?.foto_perfil_url} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarrosselAvaliacoes;