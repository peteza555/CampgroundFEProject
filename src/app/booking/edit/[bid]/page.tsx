"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DateReserve from "@/components/DateReserve";
import { getBookings, updateBooking } from "@/libs/api";
import dayjs, { Dayjs } from "dayjs";

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bid = params.bid as string;
  const { data: session, status } = useSession();
  const [booking, setBooking] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
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
        } else {
          setError("Booking not found");
        }
      } catch (err) {
        setError("Failed to load booking");
      }
    };
    fetchBooking();
  }, [bid, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      setError("Please select a date");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateBooking(bid, bookingDate.toISOString(), session!.user.token);
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
        <p className="mb-4 text-center text-gray-600">
          Campground: <span className="font-medium">{booking.campground.name}</span>
        </p>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
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