import Link from "next/link";

export default function TopMenuItem({ title, pageRef } : { title:string, pageRef:string }) {
  return (
    <Link className="w-[120px] mx-8 h-[100%] flex items-center justify-center text-center font-sans text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200" href={pageRef}>
      {title}
    </Link>
  );
}