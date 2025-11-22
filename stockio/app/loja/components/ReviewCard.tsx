import React from "react";
import Image, { type StaticImageData } from "next/image";

type Review = {
  name: string;
  avatar: StaticImageData | string;
  rating: number;
  text: string;
  badge: StaticImageData | string;
};

export const ReviewCard: React.FC<{ review: Review; starSrc?: StaticImageData | string }> = ({ review, starSrc }) => {
  return (
    <article className="p-8 bg-[#f3efe0] rounded-[40px] shadow-sm border border-white/20 h-full flex flex-col">
      <div className="flex gap-6 h-full">
        <div className="shrink-0">
          <Image
            src={review.avatar}
            alt={`${review.name} avatar`}
            width={88}
            height={88}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">{review.name}</h3>

            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Image
                  key={i}
                  src={starSrc ?? "/loja/star-4.svg"}
                  alt={i < Math.round(review.rating) ? `star` : `star-empty`}
                  width={18}
                  height={18}
                  className={`${i < Math.round(review.rating) ? "" : "opacity-40"}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex-1">
            <p className="text-base md:text-lg leading-7 text-gray-700 clamp">{review.text}</p>
          </div>

          <div className="mt-4 flex justify-end">
            <a className="text-sm text-indigo-600" href="#">
              ver mais
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .clamp {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </article>
  );
};

export default ReviewCard;
