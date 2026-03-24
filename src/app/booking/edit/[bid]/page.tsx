"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DateReserve from "@/components/DateReserve";
import { getBookings, updateBooking, getCampgrounds } from "@/libs/api";
import dayjs, { Dayjs } from "dayjs";

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bid = params.bid as string;
  const { data: session, status } = useSession();
  const [booking, setBooking] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [campgrounds, setCampgrounds] = useState<any[]>([]);
  const [selectedCampground, setSelectedCampground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status, router]);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!session?.user.token) return;
      try {
        const res = await getBookings(session.user.token);
        const found = res.data.find((b: any) => b._id === bid);
        if (found) {
          setBooking(found);
          setBookingDate(dayjs(found.bookingDate));
          const campgroundId =
            typeof found.campground === "string" ? found.campground : found.campground?._id;
          setSelectedCampground(campgroundId || "");
        } else {
          setError("Booking not found");
        }
      } catch (err) {
        setError("Failed to load booking");
      }
    };
    fetchBooking();
  }, [bid, session]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const res = await getCampgrounds();
        setCampgrounds(res.data);
      } catch (err) {
        setError("Failed to load campgrounds");
      }
    };
    fetchCampgrounds();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !selectedCampground) {
      setError("Please select a campground and date");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateBooking(bid, selectedCampground, bookingDate.toISOString(), session!.user.token);
      router.push("/mybooking");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !booking) return <div className="text-center py-12">Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Edit Booking</h1>
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
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
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
            {loading ? "Updating..." : "Update Booking"}
          </button>
        </form>
      </div>
    </main>
  );
}