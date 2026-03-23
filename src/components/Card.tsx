"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  venueName,
  imgSrc,
  address,
  telephone,
}: {
  venueName: string;
  imgSrc: string;
  address?: string;
  telephone?: string;
}) {
  return (
    <InteractiveCard>
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-200">
        <Image src={imgSrc} alt={venueName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{venueName}</h3>
        {address && <p className="text-sm text-gray-500 mt-1 line-clamp-1">{address}</p>}
        {telephone && <p className="text-sm text-gray-500 mt-1">{telephone}</p>}
      </div>
    </InteractiveCard>
  );
}