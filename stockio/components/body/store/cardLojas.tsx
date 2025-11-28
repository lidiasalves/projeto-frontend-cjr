import Link from "next/link";
import Image from "next/image";
import {lojasMock} from "@/mock/lojasMock"


interface Props {
    id: number;
    nome: string;
    stickerLoja: string;
    categoria: string;
}
 


const CardLojas = ({ id, nome, stickerLoja, categoria }: Props) => {
    return (
        <Link href={`/stores/${id}`} className = "block">
            <article className = "shrink-0 relative bg-transparent sm:w-30 md:w-56  hover:scale-105 overflow-hidden transition p-3 flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center overflow-hidden rounded-full">
                    <Image src={stickerLoja}
                        alt={nome}
                        width={200}
                        height={200}
                        draggable={false}
                        className = "object-contain w-full h-full transform-gpu transition-transform duration-300 hover:scale-110 select-none"
                    />
                </div>
                <div className="flex flex-col items-center mt-3">
                    <h3 className="mt-3 text-lg font-semibold text-center text-black">
                        {nome}
                    </h3>
                   
                    <p className="text-sm text-[#5E3C9E] text-center font-medium mt-1">
                        {categoria}
                    </p>
                   
                </div>
            </article>
        </Link>
    )
}

export default CardLojas;