import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function TopMenu() {

  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-[30] border-b border-slate-200 shadow-sm flex flex-row justify-end items-center px-2">
      <div className="flex flex-row absolute left-0 h-full">
        {
          session ? 
          <TopMenuItem title="Sign-Out" pageRef="api/auth/signout"/>
          :
          <TopMenuItem title="Sign-In" pageRef="api/auth/signin"/>
        }
        <TopMenuItem title="My Booking" pageRef="/mybooking"/>
      </div>
      <TopMenuItem title="Booking" pageRef="/booking"/>
      <Image src={"/img/logo.png"} className="h-[80%] w-auto" alt="logo" width={0} height={0} sizes="100vh"/>
    </div>
  );
}