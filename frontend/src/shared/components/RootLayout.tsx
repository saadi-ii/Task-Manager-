"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function NavbarWrapper() {
    const pathname = usePathname();

    const shouldHideNavbar = pathname.startsWith("/board");

    if (shouldHideNavbar) {
        return null;
    }

    return <Navbar />;
}