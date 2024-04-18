"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { menuItems } from "@/lib/config";

function DsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex">
        <div className="bg-[#111827] xl:w-[17vw] w-0 h-[100vh] text-[#D1D5DB] ">
          <div className="pl-10 pt-5 bg-[#111827]">
            {/* <Image src="/tcc-logo.png" alt="logo" width={100} height={100} /> */}
            Logo
          </div>
          <div className="h-[1px] bg-[#1F2937] w-[17vw] mt-10"></div>
          {/* <NavBar /> */}
          <div className="mt-10 flex flex-col px-4 bg-[#111827]">
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.route}
                  className={
                    pathname === item.route
                      ? "bg-[#242A38] py-2 px-4 mb-2 text-[#12B981] rounded-sm"
                      : "py-2 px-4 rounded-sm mb-2 bg-[#111827]"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="lg:w-[83vw] w-[100vw] flex justify-between lg:px-6 pr-6  pl-2 py-3">
          {children}
        </div>
        {/* <div className="flex flex-col bg-[#F9FAFC] lg ">
          <div className="bg-white lg:w-[83vw] w-[100vw] flex justify-between lg:px-6 pr-6  pl-2 py-3">
            <div className="flex gap-4 items-center">
              <div className="cursor-pointer lg:hidden block">
                <Dialog>
                  <DialogTrigger>
                    <Menu size={28} />
                  </DialogTrigger>

                  <DialogContent className="bg-[#111827] text-[#D1D5DB] outline-none border-none ">
                    <div className="mt-10 flex flex-col px-4">
                      {menuItems.map((item) => {
                        return (
                          <DialogClose asChild key={item.name}>
                            <Link
                              key={item.name}
                              href={item.route}
                              className={
                                pathname === item.route
                                  ? "bg-[#242A38] py-2 px-4 mb-2 text-[#12B981] rounded-sm"
                                  : "py-2 px-4 rounded-sm mb-2"
                              }
                            >
                              {item.name}
                            </Link>
                          </DialogClose>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div> */}
      </div>
    </>
  );
}

export default DsLayout;
