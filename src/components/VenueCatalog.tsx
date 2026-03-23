import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({ venuesJson } : { venuesJson: Promise<VenueJson> }) {

  const venuesJsonReady = await venuesJson;

  return (
    <>
      Explore { venuesJsonReady.count } venues in our catalog
      <div className="m-[20px] flex flex-row flex-wrap justify-around content-around">
        {
          venuesJsonReady.data.map((venueItem: VenueItem) => 
            <Link href={`/venue/${venueItem.id}`} key={venueItem.id} className="w-1/5">
              <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
            </Link>
          )
        }
      </div>
    </>
  );
}