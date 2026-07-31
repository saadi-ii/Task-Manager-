"use client"
import Link from "next/link"
import * as React from "react"
import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, PlusIcon, MinusIcon } from "lucide-react"
import { NavUser } from "./app-user"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { getBoards } from "@/lib/api/board/get";
import { Board } from "@/lib/types/board.types";
import { Great_Vibes } from 'next/font/google'


const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchBoards = () => {
    getBoards()
      .then((res) => {
        setBoards(res.data.boards)
      })
      .catch((error: AxiosError) => {
        if (error?.response?.status === 401) {
          router.replace("/signin");
        }
      });
  };
  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    const handleBoardChanged = () => {
      fetchBoards();
    };
    window.addEventListener("board-changed", handleBoardChanged);
    return () => window.removeEventListener("board-changed", handleBoardChanged);
  }, []);

  const data = {
    navMain: [
      {
        title: "Home",
        url: "/",
        items: [{ title: "Home", url: "/" }],
      },
      {
        title: "Boards",
        url: "/board",
        items: boards.map((board) => ({
          title: board.boardname,
          url: `/board/${board._id}`, 
        })),
      },
    ],
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEndIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">
                  <div className={`text-xl max-sm:text-xl`}>Task <span className="text-foreground">M</span>anagement</div>
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton render={<CollapsibleTrigger />}>
                    <div className=" font-semibold">{item.title}{" "}</div>
                    <PlusIcon className="ml-auto group-aria-expanded/menu-button:hidden" />
                    <MinusIcon className="ml-auto hidden group-aria-expanded/menu-button:block" />
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              render={<Link href={item.url} />}
                            >
                              {item.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
