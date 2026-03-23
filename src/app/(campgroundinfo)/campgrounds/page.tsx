import CampgroundCatalog from "@/components/CampgroundCatalog";
import { getCampgrounds } from "@/libs/api";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default async function CampgroundsPage() {
  const campgrounds = await getCampgrounds();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Your Desired Campground</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CampgroundCatalog campgroundsJson={campgrounds} />
      </Suspense>
    </main>
  );
}