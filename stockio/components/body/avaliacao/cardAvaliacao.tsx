"use client";


interface ComentarioProps {
  usuario: string;
  comentario: string;
  nota?: number;
  foto?: string;
}

export default function Comentario({ usuario, comentario, nota, foto }: ComentarioProps) {
  return (
    <div className="bg-black-700 p-4 rounded-xl  text-black flex gap-3">

      {/* foto do usuario (opcional) */}
      <img
        src={foto || "/images/default-user.png"}
        alt={usuario}
        className="w-12 h-12 rounded-full object-cover border border-neutral-500"
      />

      <div className="flex flex-col flex-1">
        
        {/* nome + avaliacao */}
        <div className="flex items-center justify-between">
          <p className="font-semibold">{usuario}</p>

          {nota && (
            <span className="text-yellow-400 text-xs">
              {"★".repeat(nota)}
              {"☆".repeat(5 - nota)}
            </span>
          )}
        </div>

        {/* comentario */}
        <p className="text-sm opacity-80 mt-1">
          {comentario}
        </p>

      </div>
    </div>
  );
}
