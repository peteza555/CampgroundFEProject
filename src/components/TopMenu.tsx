"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === "admin";
  const bookingTitle = isAdmin ? "All Booking" : "My Booking";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-3 sm:py-0">
          <div className="flex items-center justify-between">
            <TopMenuItem title="CampFinder" pageRef="/" />
          </div>
          <nav className="flex flex-wrap gap-2 mt-3 sm:mt-0 sm:gap-1">
            <TopMenuItem title="Home" pageRef="/" />
            {session ? (
              <>
                <button
                  onClick={() => router.push("/signout")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition"
                >
                  Sign Out
                </button>
                <TopMenuItem title={bookingTitle} pageRef="/mybooking" />
              </>
            ) : (
              <>
                <TopMenuItem title="Sign In" pageRef="/login" />   {/* ← เปลี่ยนที่นี่ */}
                <TopMenuItem title="Register" pageRef="/register" />
              </>
            )}
            <TopMenuItem title="Book Now" pageRef="/booking" />
          </nav>
        </div>
      </div>
    </header>
  );
}