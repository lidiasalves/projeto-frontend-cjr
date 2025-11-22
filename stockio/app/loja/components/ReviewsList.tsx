import React from "react";
import ReviewCard from "./ReviewCard";
import type { StaticImageData } from "next/image";

type Review = {
  name: string;
  avatar: StaticImageData | string;
  rating: number;
  text: string;
  badge: StaticImageData | string;
};

export const ReviewsList: React.FC<{
  reviews: Review[];
  starSrc?: StaticImageData | string;
  /** optional ref to control scrolling from parent (carousel) */
  containerRef?: React.RefObject<HTMLDivElement>;
}> = ({ reviews, starSrc, containerRef }) => {
  return (
    <>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        ref={containerRef}
        className="no-scrollbar flex gap-8 py-10 overflow-x-auto snap-x snap-mandatory pl-[6vw] pr-[6vw] md:pl-[10vw] md:pr-[10vw]"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            data-slide
            className="snap-center flex-shrink-0 w-[min(88vw,980px)] md:w-[min(68vw,980px)] lg:w-[880px] h-[340px] md:h-[360px] lg:h-[420px]"
          >
            <div className="h-full">
              <ReviewCard review={review} starSrc={starSrc} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewsList;
