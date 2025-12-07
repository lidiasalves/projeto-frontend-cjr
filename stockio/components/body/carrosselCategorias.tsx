"use client";
import React, {useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categoriesData } from '@/mock/categoriasMock';
import { useDragScroll } from '../hooks/useDragScroll';

const Categoria = () => {
    
      const {
        carrosselRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove,
        } = useDragScroll();
    return (
        <section className="w-full">
            <h2 className="text-3xl font-semibold md:text-5xl  text-black mb-4">
                Categoria
            </h2>

            <div ref={carrosselRef}
                 onMouseDown={handleMouseDown}
                 onMouseLeave={handleMouseLeave}
                 onMouseUp={handleMouseUp}
                 onMouseMove={handleMouseMove}

                className="flex overflow-x-auto space-x-4 w-full h-[180px] items-center sem-barra cursor-grab scroll-smooth select-none">
                {categoriesData.map((category) => {
                    const iconPath = `/images/icons/${category.name}.svg`;
                    return (

                        <Link key={category.id} href={category.href} className="shrink-0 flex flex-col items-center justify-center w-30 h-30 md:w-60 md:h-40" >
                            
                            <Image src={iconPath}
                                alt={category.name}
                                width={80}
                                height={80}
                                className="w-30 md:w-40 h-30 md:h-30"
                            />

                        </Link>
                    )
                })
                }
            </div>

        </section>

    )
}


export default Categoria;