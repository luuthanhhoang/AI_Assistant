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
import { useAppSelector } from "@/store/hooks";

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
  const threads = useAppSelector((state) => state.messages.threads);

  const handleClick = useCallback(
    (id: string) => {
      if (id === "new-chat") {
        router.push("/chat");
      }
    },
    [router]
  );

  const handleClickThread = useCallback(
    (threadId: string) => {
      router.push(`/chat/${threadId}`);
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
              {threads.map((thread) => (
                <SidebarMenuItem
                  key={thread.threadId}
                  onClick={() => handleClickThread(thread.threadId)}
                >
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span>{thread.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
