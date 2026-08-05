"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function NavbarWrapper({username}:{username:string}) {
    const pathname = usePathname();

    const shouldHideNavbar = pathname.startsWith("/board");

    if (shouldHideNavbar) {
        return null;
    }

    return <Navbar username={username}/>;
}