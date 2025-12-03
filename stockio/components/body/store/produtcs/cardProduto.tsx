import Image from "next/image";
import Link from "next/link";

interface Props {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    stickerLoja?: string; // Opcional, pois nem sempre tem loja vinculada
    estoque: number;
}

const CardProduto = ({ id, nome, preco, imagem, stickerLoja, estoque }: Props) => { 
    return (
        <Link href={`/produto/${id}`} className="block">
            <article className="shrink-0 relative w-40 md:w-56 bg-white rounded-lg hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300 p-3 border border-transparent hover:border-purple-100">
                
                {stickerLoja && (
                    <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-sm">
                        <Image
                            src={stickerLoja}
                            alt="Loja"
                            width={24}
                            height={24}
                            className="object-contain w-6 h-6 md:w-8 md:h-8"
                        />
                    </div>
                )}


                <div className="relative w-full aspect-square flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                    <Image 
                        src={imagem}
                        alt={nome}
                        fill
                        className="object-cover hover:opacity-90 transition-opacity" 
                        sizes="(max-width: 768px) 160px, 224px"
                    />
                </div>

                <div className="mt-3 space-y-1">
                    
                    <h3 className="text-sm md:text-base font-semibold text-black line-clamp-2 h-10 md:h-12 leading-tight" title={nome}>
                        {nome}
                    </h3>
                    
                    <p className="text-[#5E3C9E] font-bold text-lg">
                        R$ {preco.toFixed(2).replace('.', ',')}
                    </p>
                    
                    <p className={`text-xs font-bold uppercase tracking-wide ${
                        estoque > 0 ? "text-green-600" : "text-red-500"
                    }`}>
                        {estoque > 0 ? "Disponível" : "Indisponível"}
                    </p>
                </div>
            </article>
        </Link >
    );
};

export default CardProduto;