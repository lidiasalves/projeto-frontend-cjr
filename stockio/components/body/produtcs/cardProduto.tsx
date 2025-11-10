import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    stickerLoja?: string;
    estoque: number;
}
 

const CardProduto = ({ id, nome, preco, imagem,  stickerLoja, estoque }: Props) => { 
    return (
        <Link href={`/produto/${id}`} className = "block">
            <article className="shrink-0 relative w:40 sm: w-30 md:w-56 bg-white rounded-lg hover:shadow-lg overflow-hidden transition p-3">
                
                {stickerLoja && (
                    <div className="absolute top-2 right-2 z-10">
                        <Image
                            src={stickerLoja}
                            alt="Sticker Loja"
                            width={55}
                            height={55}
                            className="object-contain"
                        />
                    </div>
                )}
                <div className = "relative w-full aspect-square flex items-center justify-center">
                <Image src={imagem}
                    alt={nome}
                    width={200}
                    height={200}
                    className="object-cover w-full" />
                </div>
                <div className="mt-2">
                    
                    <h3 className="text-xl font-semibold text-black truncate">
                        {nome}
                    </h3>
                    
                    <p className="text-black font-semibold text-small"> R${preco.toFixed(2)} </p>
                    
                    <p className={`text-sx sm:text-sm font-medium mt-1 ${
                    estoque > 0 ? "text-green-600" : "text-red-500"
                    }`}
                    >
                    {estoque > 0 ? "DISPONÍVEL" : "INDISPONÍVEL"}
                    </p>
                </div>
            </article>
        </Link >
    );
};


export default CardProduto;