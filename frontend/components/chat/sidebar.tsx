"use client";

import {
  DatabaseIcon,
  GlobeIcon,
  MoreHorizontalIcon,
  SearchIcon,
  ShareIcon,
  SquarePenIcon,
  TrashIcon,
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
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";
import {
  deleteThread,
  updateThread,
} from "@/store/features/messages/messagesService";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { DialogDeleteThread } from "../dialogs/dialog-delete-thread";

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

const actionThread = [
  {
    id: "share",
    icon: <ShareIcon />,
    label: "Chia sẻ",
  },
  {
    id: "rename",
    icon: <SquarePenIcon />,
    label: "Đổi tên",
  },
  {
    id: "delete",
    icon: <TrashIcon />,
    label: "Xóa",
  },
];

export default function SidebarComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [threadTitle, setThreadTitle] = useState("");
  const [threadId, setThreadId] = useState("");

  const [isUpdateThread, setIsUpdateThread] = useState(false);
  const [isDeleteThread, setIsDeleteThread] = useState(false);

  const threads = useAppSelector(
    (state) => state.messages.threadsValue.threads
  );

  const handleClick = useCallback(
    (id: string, threadId?: string) => {
      if (id === "new-chat") {
        router.push("/chat");
      } else if (id === "rename") {
        if (!threadId) return;
        const thread = threads.find((thread) => thread.threadId === threadId);
        if (!thread) return;
        setIsUpdateThread(true);
        setThreadId(threadId);
        setThreadTitle(thread.title || "");
      } else if (id === "delete") {
        if (!threadId) return;
        setIsDeleteThread(true);
        setThreadId(threadId);
      }
    },
    [router, threads]
  );

  const handleClickThread = useCallback(
    (threadId: string) => {
      router.push(`/chat/${threadId}`);
    },
    [router]
  );

  const handleUpdateThread = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        dispatch(updateThread({ threadId, title: threadTitle }));
        setIsUpdateThread(false);
        setThreadTitle("");
        setThreadId("");
      }
    },
    [threadId, threadTitle, dispatch]
  );

  const handleDeleteThread = useCallback(() => {
    dispatch(deleteThread({ threadId }));
    setIsDeleteThread(false);
    setThreadId("");
    router.push("/chat");
  }, [threadId, dispatch, router]);

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
              {threads.map((thread) =>
                thread.threadId === threadId && isUpdateThread ? (
                  <div key={threadId}>
                    <Input
                      key={threadId}
                      value={threadTitle}
                      onChange={(e) => setThreadTitle(e.target.value)}
                      onKeyDown={handleUpdateThread}
                    />
                  </div>
                ) : (
                  <SidebarMenuItem
                    key={thread.threadId}
                    onClick={() => handleClickThread(thread.threadId)}
                  >
                    <SidebarMenuButton asChild>
                      <div className="group/item flex items-center justify-between gap-2 cursor-pointer w-full">
                        <span className="truncate">{thread.title}</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="group-hover/item:block hidden" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="rounded-3xl p-2 w-40">
                            {actionThread.map((action) => (
                              <Button
                                key={action.id}
                                onClick={() =>
                                  handleClick(action.id, thread.threadId)
                                }
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start hover:cursor-pointer",
                                  action.id === "delete" &&
                                    "text-red-500 hover:text-red-500 hover:bg-red-500/10 dark:text-red-500 dark:hover:text-red-500 dark:hover:bg-red-500/10"
                                )}
                              >
                                {action.icon}
                                <span>{action.label}</span>
                              </Button>
                            ))}
                          </PopoverContent>
                        </Popover>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />

      <DialogDeleteThread
        open={isDeleteThread}
        onClose={() => setIsDeleteThread(false)}
        onHandle={() => handleDeleteThread()}
      />
    </Sidebar>
  );
}
