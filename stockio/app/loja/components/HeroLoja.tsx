import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/loja/Rectangle 37.svg"
        alt="Banner Rare Beauty"
        fill
        priority
        className="object-cover object-center brightness-75"
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/loja/Rectangle 47.svg"
          alt="Overlay decorativo"
          fill
          priority
          className="object-cover object-center opacity-60 mix-blend-multiply"
        />
      </div>
      <div className="absolute inset-0 z-[15] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 z-20">        <div className="relative">
          <Image
            src="/loja/vector.svg"
            alt="Logo Rare Beauty"
            width={552}
            height={97}
            priority
          />

          <span className="absolute left-0 -bottom-5 text-lg md:text-2xl lg:text-3xl opacity-95 drop-shadow-md text-white font-light">
            beleza
          </span>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 z-20 text-sm md:text-base text-white/90 drop-shadow-md font-light">
        by <span className="underline">Selena Gomez</span>
      </div>
    </header>
  );
}
