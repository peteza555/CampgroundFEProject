"use client"

import Link from "next/link";
import Card from "./Card";
import { useReducer } from "react";

export default function CardPanel() {

  function ratingReducer(venueRatingMap: Map<string, number>, action: {type: string, venueName: string, rating: number}) {
    switch (action.type) {
      case "setRating": {
        venueRatingMap.set(action.venueName, action.rating);
        return new Map(venueRatingMap);
      }
      default: {
        return venueRatingMap;
      }
    }
  }

  const [venueRatings, dispatch] = useReducer(ratingReducer, new Map<string, number>([
    ["The Bloom Pavilion", 0], 
    ["Spark Space", 0], 
    ["The Grand Table", 0] 
  ]));
  
  /**
   * Mock Venue Data
   */
  const mockVenue = [
    {vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
    {vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
    {vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"}
  ]
  
  return (
    <div>
      <div style={{ margin: "20px" }} className="flex flex-row flex-wrap justify-around content-around">
        {
          mockVenue.map((venue) => (
            <Link 
              href={`venue/${venue.vid}`}
              key={venue.vid}
              className="w-1/5"
            >
            <Card 
              venueName={venue.name}
              imgSrc={venue.image}
              rating={venueRatings.get(venue.name) ?? 0}
              onRatingChange={(venueName, rating) => dispatch({type: "setRating", venueName: venueName, rating: rating})}
            />
            </Link>
          ))
        }
      </div>
      {Array.from(venueRatings.entries())
        .filter(([, rating]) => rating > 0)
        .map(([venueName, rating]) => (
          <div 
            data-testid={venueName}
            onClick={
              () => dispatch({type: "setRating", venueName: venueName, rating: 0})
            }
          >
            {venueName} : {rating}
          </div>
        ))
      }
    </div>
  );
}