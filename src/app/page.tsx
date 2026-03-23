import Banner from "@/components/Banner";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="text-center py-12">
        <Link
          href="/campgrounds"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          Browse Campgrounds
        </Link>
      </div>
    </>
  );
}