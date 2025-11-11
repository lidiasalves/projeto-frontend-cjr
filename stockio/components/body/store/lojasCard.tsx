import Link from "next/link";
import Image from "next/link";
import {lojasMock} from "@/mock/lojasMock"

interface Props {
    id: number;
    nome: string;
    stickerLoja: string;
    categoria: string;
}
 


const LojasCard = ({ id, nome, stickerLoja, categoria }: Props) => {
    return (
        <Link href={`/stores/${id}`} className = "block">
            <article>
                <Image />
            </article>
        </Link>
    )
}