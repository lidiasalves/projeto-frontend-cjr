"use client";

import { useRouter } from "next/navigation";

interface ComentarioProps {
  id: string;         // ID da Avaliação
  lojaId: string;     // ID da Loja (NOVO)
  usuario: string;
  comentario: string;
  nota?: number;
  foto?: string;
}

export default function Comentario({ id, lojaId, usuario, comentario, nota, foto }: ComentarioProps) {
  const router = useRouter();

  return (
    <div 
      // --- CORREÇÃO DA ROTA ---
      // Redireciona para: /loja/1/avaliacoes/55
      onClick={(e) => {
        e.stopPropagation(); // Evita cliques duplos se estiver dentro de outro link
        router.push(`/loja/${lojaId}/avaliacoes/${id}`);
      }} 
      
      className="bg-[#D9D9D9] p-5 rounded-2xl text-black flex gap-5 w-full md:w-[750px] h-auto md:h-[150px] items-center shadow-sm cursor-pointer transition-opacity hover:opacity-90 shrink-0"
    >
      {/* Foto do usuário */}
      <img
        src={foto || "/images/default-user.png"}
        alt={usuario}
        className="w-24 h-24 rounded-full object-cover border border-neutral-500 shrink-0 bg-gray-300"
      />

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 h-full justify-center">
        
        {/* Cabeçalho: Nome e Estrelas */}
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold text-lg">{usuario}</p>

          {nota && (
            <span className="text-yellow-500 text-sm tracking-wide">
              {"★".repeat(nota)}
              {"☆".repeat(5 - nota)}
            </span>
          )}
        </div>

        {/* Texto do Comentário */}
        <p className="text-sm opacity-80 mt-1 line-clamp-2">
          {comentario}
        </p>
      </div>
    </div>
  );
}