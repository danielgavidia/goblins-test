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
            src="https://www.esai.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4b6d8299.png&w=1080&q=75"
            alt="ESAI"
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
              All ESAI Tools
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => router.push("/history")}
              className="font-semibold text-xs"
            >
              History
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => router.push("/cards")}
              className="font-semibold text-xs"
            >
              Cards
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
      </SidebarContent>
    </Sidebar>
  );
};

export default GeneralSidebar;
