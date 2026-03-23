"use client";

export default function InteractiveCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300">
      {children}
    </div>
  );
}