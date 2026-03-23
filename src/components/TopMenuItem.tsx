import Link from "next/link";

export default function TopMenuItem({ title, pageRef }: { title: string; pageRef: string }) {
  return (
    <Link
      href={pageRef}
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition"
    >
      {title}
    </Link>
  );
}