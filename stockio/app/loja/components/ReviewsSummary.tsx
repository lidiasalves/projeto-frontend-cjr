import React, { useRef } from "react";
import Image from "next/image";
import ReviewsList from "./ReviewsList";

type Review = {
    name: string;
    avatar: string;
    rating: number;
    text: string;
    badge: string;
};

const ReviewsSummary: React.FC<{
  reviews: Review[];
  starSrc?: string;
  halfStarSrc?: string;
}> = ({ reviews, starSrc = "/loja/star-4.svg", halfStarSrc = "/loja/group-130-3.png" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollNext = () => {
    const el = containerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".snap-center");
    const gap = parseFloat(getComputedStyle(el).gap || "") || 24;
    const amount = first ? first.clientWidth + gap : Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const el = containerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".snap-center");
    const gap = parseFloat(getComputedStyle(el).gap || "") || 24;
    const amount = first ? first.clientWidth + gap : Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: -amount, behavior: "smooth" });
  };

  return (
    <section className="relative z-30 -mt-12 md:-mt-20">
      <div className="bg-black text-white w-full">
        <div className="max-w-5xl mx-auto text-center px-6 py-20">
          <h2 className="text-6xl md:text-4xl tracking-tight mb-6 font-light">Reviews e Comentários</h2>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-6xl md:text-[120px] leading-none font-light">4.75</div>

            <div className="flex items-center gap-3">
              {[...Array(4)].map((_, i) => (
                <Image key={i} src={starSrc} alt={`star-${i}`} width={48} height={48} />
              ))}
              <Image src={halfStarSrc} alt="half-star" width={48} height={48} />
            </div>
          </div>

          {/* removed absolute "ver mais" from header; will place it above carousel */}
        </div>
      </div>

      {/* Reviews section as a continuous cream band under the hero */}
      <div className="w-full -mt-6 md:-mt-10 bg-black py-20">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex justify-end mb-6">
            <a className="text-sm text-purple-400 underline" href="#">
              ver mais
            </a>
          </div>
          <button
            onClick={scrollPrev}
            aria-label="anterior"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-40 w-10 h-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div>{/* carousel sits directly on the cream band */}
            <ReviewsList reviews={reviews} starSrc={starSrc} containerRef={containerRef as React.RefObject<HTMLDivElement>} />
          </div>

          <button
            onClick={scrollNext}
            aria-label="próximo"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-40 w-10 h-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSummary;
