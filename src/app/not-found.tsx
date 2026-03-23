import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
        Return Home
      </Link>
    </div>
  );
}