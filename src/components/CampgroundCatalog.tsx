import Link from "next/link";
import Card from "./Card";
import { CampgroundsResponse } from "@/libs/types";

export default function CampgroundCatalog({ campgroundsJson }: { campgroundsJson: CampgroundsResponse }) {
  return (
    <section className="py-8">
      <div className="mb-6">
        <p className="text-lg text-gray-600">Explore {campgroundsJson.count} campgrounds in our catalog</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {campgroundsJson.data.map((campground) => (
          <Link href={`/campgrounds/${campground._id}`} key={campground._id} className="group">
            <Card
              venueName={campground.name}
              imgSrc={campground.imageUrl || "/img/cover.jpg"}
              address={campground.address}
              telephone={campground.telephone}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}