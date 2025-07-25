"use client";

import {
  DatabaseIcon,
  GlobeIcon,
  SearchIcon,
  SquarePenIcon,
} from "lucide-react";
import Logo from "../common/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import ThreadList from "./thread-list";

const optionActions = [
  {
    id: "new-chat",
    label: "Đoạn chat mới",
    icon: <SquarePenIcon />,
  },
  {
    id: "search-chat",
    label: "Tìm kiếm đoạn chat",
    icon: <SearchIcon />,
  },
];

const toolActions = [
  {
    id: "sql-agent",
    label: "SQL Agent",
    icon: <DatabaseIcon />,
  },
  {
    id: "english-agent",
    label: "English Agent",
    icon: <GlobeIcon />,
  },
];

export default function SidebarComponent() {
  const router = useRouter();

  const handleClick = useCallback(
    (id: string) => {
      if (id === "new-chat") {
        router.push("/chat");
      }
    },
    [router]
  );

  return (
    <Sidebar>
      <SidebarHeader className="h-16 p-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-lg">Chat</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Tuỳ chọn</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {optionActions.map((action) => (
                <SidebarMenuItem
                  key={action.id}
                  onClick={() => handleClick(action.id)}
                >
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      {action.icon}
                      <span>{action.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Công cụ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolActions.map((action) => (
                <SidebarMenuItem key={action.id}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      {action.icon}
                      <span>{action.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Đoạn chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ThreadList />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
