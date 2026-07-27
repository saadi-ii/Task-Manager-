"use client";

import Link from "next/link";
import Image from "next/image";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [active, setActive] = useState("");

  return (
    <motion.div
        initial={{ x: 0 }}
        animate={{
          x: isOpen ? 0 : "-85%",
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
         className="fixed left-0 top-14 z-50 flex items-start pointer-events-none  ">
      < nav
        className="pointer-events-auto flex flex-col items-center w-50 max-sm:w-40 h-[calc(100vh-3.5rem)] bg-primary text-primary-foreground text-2xl py-10 gap-10 p-5"
      >
        <div>
          <Image
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/task-manager-icon-svg-download-png-4624650.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </div>

        <div className="after:content-[''] after:block  after:w-30 after:h-1 after:bg-primary-foreground after:ml-0.5 after:rounded-2xl" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TbArrowBadgeRightFilled
              className={`size-5 ${
                active === "home" ? "visible" : "invisible"
              }`}
            />

            <Link href="/" onClick={() => setActive("home")}>
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <TbArrowBadgeRightFilled
              className={`size-5 ${
                active === "board" ? "visible" : "invisible"
              }`}
            />

            <Link href="/board" onClick={() => setActive("board")}>
              Boards
            </Link>
          </div>

        </div>
      </nav>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto ml-2 mt-4"
      >
        <RxHamburgerMenu className="text-primary size-8 cursor-pointer" />
      </button>
    </motion.div>
  );
};



