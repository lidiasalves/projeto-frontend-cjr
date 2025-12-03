"use client";

import React from "react";
import Image from "next/image";
import NavbarDeslogada from "../../components/header/navbardeslogada";
import HeroLoja from "./components/HeroLoja";
import ReviewsList from "./components/ReviewsList";
import ReviewsSummary from "./components/ReviewsSummary";

const star4 = "/loja/star-4.svg";
const vector = "/loja/vector.svg";

const ellipse212 = "/loja/ellipse-21-2.svg";
const ellipse213 = "/loja/ellipse-21-3.svg";
const ellipse214 = "/loja/ellipse-21-4.svg";
const ellipse211 = "/loja/ellipse-21.png";
const ellipse21 = "/loja/ellipse-21.svg";

const group1302 = "/loja/group-130-2.png";
const group1303 = "/loja/group-130-3.png";
const group1304 = "/loja/group-130-4.png";
const group1305 = "/loja/group-130-5.png";
const group1306 = "/loja/group-130-6.png";
const group1307 = "/loja/group-130-7.png";
const group130 = "/loja/group-130.png";

const image = "/loja/image.svg";

const reviews = [
  {
    name: "Sofia Figueiredo",
    avatar: ellipse213,
    rating: 4.5,
    text: "Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram",
    badge: group1302,
  },
  {
    name: "Selena Gomez",
    avatar: ellipse211,
    rating: 4,
    text: "Não é por nada não, mas essa garota arrasa",
    badge: group1305,
  },
  {
    name: "Pedro Freitas",
    avatar: ellipse214,
    rating: 4,
    text: "Não consigo descrever a sensação de passar uma base que realmente orna com sua pele... Sensacional! Parabéns aos envolvidos",
    badge: group1306,
  },
  {
    name: "Sofia Figueiredo",
    avatar: ellipse21,
    rating: 4,
    text: "Eu gostei bastante! Mas acho que errei no tom",
    badge: group1304,
  },
  {
    name: "Sofia Figueiredo",
    avatar: image,
    rating: 4,
    text: "Esses produtos realmente transformaram minha rotina de beleza e elevaram minha confiança a novos patamares!!! O rímel não só dá volume e comprimento incríveis aos meus cílios, como também os levanta e curva, abrindo meu olhar e me fazendo sentir [...]",
    badge: group1307,
  },
  {
    name: "Sofia Figueiredo",
    avatar: ellipse212,
    rating: 4,
    text: "Recebi recentemente meu pedido da Rare Beauty e não poderia estar mais encantada! Os produtos são absolutamente incríveis.",
    badge: group130,
  },
];

export const LojaDeslogado = (): React.ReactElement => {
  return (
    <main className="loja-deslogado">
      <div className="div-2">
        <NavbarDeslogada />
        <HeroLoja />
        <section className="frame">
          {/* Hero Section */}
          <header className="group-2">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle" />
                <Image className="vector" alt="Vector" src={vector} width={48} height={48} />
              </div>
            </div>
            <ReviewsSummary reviews={reviews} starSrc={star4} halfStarSrc={group1303} />
          </header>
        </section>
      </div>
    </main>
  );
};
