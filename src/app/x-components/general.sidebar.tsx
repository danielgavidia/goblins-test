"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GeneralSidebar = () => {
  const router = useRouter();

  return (
    <Sidebar>
      {/* Logo header */}
      <SidebarHeader className="flex items-start p-4 bg-white">
        <Link href={"/"}>
          <img
            src="https://framerusercontent.com/images/rnW1Q2GsGTt3hyXFkTM7ooGFa2w.png?scale-down-to=512"
            alt="Goblins"
            className="h-14"
          />
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-1 bg-white">
        {/* All ESAI Tools */}
        <SidebarGroup>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenuButton onClick={() => router.push("/")} className="font-semibold text-xs">
              Home
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
      </SidebarContent>
    </Sidebar>
  );
};

export default GeneralSidebar;