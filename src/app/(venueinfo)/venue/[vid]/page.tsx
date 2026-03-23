import getVenue from "@/libs/getVenue";
import Image from "next/image";

export default async function VenueDetailPage({ params } : { params: Promise<{vid: string}>}) {

  const { vid } = await params;
  const venueDetail = await getVenue(vid);

  /**
   * Mock Venue Data
   */
  // const mockVenue = new Map();
  // mockVenue.set("001", {name: "The Bloom Pavilion", image: "/img/bloom.jpg"});
  // mockVenue.set("002", {name: "Spark Space", image: "/img/sparkspace.jpg"});
  // mockVenue.set("003", {name: "The Grand Table", image: "/img/grandtable.jpg"});

  return (
    <main className="text-center !p-5">
      <h1 className="text-lg font-medium">{ venueDetail.data.name }</h1>
      <div className="flex flex-row !my-5">
        <Image 
          src={ venueDetail.data.picture }
          alt="Venue Image"
          width={0} 
          height={0} 
          sizes="100vw"
          className="rounded-lg w-[30%] "
        />
        <div className="text-md !mx-5 text-left">
          <div className="text-md mx-5">Name: { venueDetail.data.name }</div>
          <div className="text-md mx-5">Address: { venueDetail.data.address }</div>
          <div className="text-md mx-5">District: { venueDetail.data.district }</div>
          <div className="text-md mx-5">Postal Code: { venueDetail.data.postalcode }</div>
          <div className="text-md mx-5">Tel: { venueDetail.data.tel }</div>
          <div className="text-md mx-5">Daily Rate: { venueDetail.data.dailyrate }</div>
        </div>
      </div>
    </main>
  );
}