"use client";

import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";

export default function Card({
  venueName, 
  imgSrc, 
  rating, 
  onRatingChange
} : {
  venueName:string, 
  imgSrc:string,
  rating?:number,
  onRatingChange?:(venueName:string, rating:number) => void
}) {
  
  return (
    <InteractiveCard>
      <div className={styles.cardimg}>
        <Image src={imgSrc}
          alt="Venue Picture"
          fill={true}
          objectFit="cover"
        />
      </div>
      <div className={styles.cardtext}>
        <h3 style={{marginTop:"-4px"}} className="text-xl font-semibold font-serif text-emerald-800">{venueName}</h3>
        {
          rating !== undefined && onRatingChange ? 
          <Rating
          id={`${venueName} Rating`}
          name={`${venueName} Rating`}
          data-testid={`${venueName} Rating`}
          value={rating}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onChange={(event, newValue) => {
            event.stopPropagation();
            onRatingChange(venueName, newValue ?? 0);
          }}
          />
          : null
        }
      </div>
    </InteractiveCard>
  );
}