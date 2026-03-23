"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DateReserve from "@/components/DateReserve";
import { getCampgrounds, createBooking } from "@/libs/api";
import dayjs, { Dayjs } from "dayjs";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");

  const { data: session, status } = useSession();
  const [campgrounds, setCampgrounds] = useState<any[]>([]);
  const [selectedCampground, setSelectedCampground] = useState(campgroundId || "");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status, router]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const res = await getCampgrounds();
        setCampgrounds(res.data);
        if (!campgroundId && res.data.length > 0) setSelectedCampground(res.data[0]._id);
      } catch (err) {
        setError("Failed to load campgrounds");
      }
    };
    fetchCampgrounds();
  }, [campgroundId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampground || !bookingDate) {
      setError("Please select campground and date");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createBooking(selectedCampground, bookingDate.toISOString(), session!.user.token);
      router.push("/mybooking");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div className="text-center py-12">Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Create Booking</h1>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campground</label>
            <select
              value={selectedCampground}
              onChange={(e) => setSelectedCampground(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a campground</option>
              {campgrounds.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Date</label>
            <DateReserve value={bookingDate} onChange={setBookingDate} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </main>
  );
}