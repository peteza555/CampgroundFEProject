import { getCampground } from "@/libs/api";
import Image from "next/image";
import Link from "next/link";

export default async function CampgroundDetailPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  const campground = await getCampground(cid);
  const data = campground.data;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={data.imageUrl || "/img/cover.jpg"}
              alt={data.name}
              width={800}
              height={600}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.name}</h1>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-semibold">Address:</span> {data.address}</p>
              <p><span className="font-semibold">Telephone:</span> {data.telephone}</p>
            </div>
            <Link
              href={`/booking?campgroundId=${data._id}`}
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book this campground
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}