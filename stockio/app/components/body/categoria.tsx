import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categoriesData = [
  { id: 1, name: 'mercado', href: '#' },
  { id: 2, name: 'farmacia', href: '#' },
  { id: 3, name: 'beleza', href: '#' },
  { id: 4, name: 'moda', href: '#' },
  { id: 5, name: 'eletronicos',  href: '#' },
  { id: 6, name: 'jogos', href: '#' },
  { id: 7, name: 'brinquedos', href: '#' },
  { id: 8, name: 'casa', href: '#' },
];




const Categoria = () => {

    return (
        <section className="w-full">
            <h2 className="text-3xl font-semibold md:text-5xl  text-black mb-4">
                Categoria
            </h2>

            <div className="flex overflow-x-auto space-x-4 w-full h-[180px] items-center sem-barra">
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