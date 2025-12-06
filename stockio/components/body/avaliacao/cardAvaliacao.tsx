"use client";

import { useRouter } from "next/navigation"; // 1. Importação necessária

interface ComentarioProps {
  id: string; // 2. Precisamos do ID para saber para onde linkar
  usuario: string;
  comentario: string;
  nota?: number;
  foto?: string;
}

export default function Comentario({ id, usuario, comentario, nota, foto }: ComentarioProps) {
  const router = useRouter(); // 3. Inicializa o roteador

  return (
    <div 
      // 4. Torna clicável redirecionando para a rota dinâmica
      onClick={() => router.push(`/review/${id}`)} 
      className="
      bg-[#D9D9D9] 
      p-5 
      rounded-2xl 
      text-black 
      flex 
      gap-5 
      w-[750px]        /* largura fixa */
      h-[150px]        /* ALTURA FIXA */
      items-center 
      shadow-sm
      cursor-pointer   /* 5. Único add visual: cursor de 'clique' */
      transition-opacity hover:opacity-90 /* Opcional: feedback sutil ao passar mouse */
    ">
      {/* Foto do usuário */}
      <img
        src={foto || "/images/default-user.png"}
        alt={usuario}
        className="
          w-24 
          h-24 
          rounded-full 
          object-cover 
          border border-neutral-500
          shrink-0
        "
      />

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 h-full justify-center">
        
        {/* Nome + Estrelas */}
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold text-lg">{usuario}</p>

          {nota && (
            <span className="text-yellow-500 text-sm tracking-wide">
              {"★".repeat(nota)}
              {"☆".repeat(5 - nota)}
            </span>
          )}
        </div>

        {/* Comentário */}
        <p className="
          text-sm 
          opacity-80 
          mt-1 
          line-clamp-2      /* impede que o texto estoure */
        ">
          {comentario}
        </p>
      </div>
    </div>
  );
}