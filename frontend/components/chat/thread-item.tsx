"use client";

import { Thread } from "@/models/message";
import {
  deleteThread,
  updateThread,
} from "@/store/features/messages/messagesService";
import { useAppDispatch } from "@/store/hooks";
import {
  MoreHorizontalIcon,
  ShareIcon,
  SquarePenIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DialogDeleteThread } from "../dialogs/dialog-delete-thread";

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

export default function ThreadItem({ thread }: { thread: Thread }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [threadTitle, setThreadTitle] = useState("");

  const [isUpdateThread, setIsUpdateThread] = useState(false);
  const [isDeleteThread, setIsDeleteThread] = useState(false);

  const handleClickThread = useCallback(
    (threadId: string) => {
      router.push(`/chat/${threadId}`);
    },
    [router]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      e.stopPropagation();
      if (id === "rename") {
        setIsUpdateThread(true);
      } else if (id === "delete") {
        setIsDeleteThread(true);
      }
    },
    []
  );

  const handleUpdateThread = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        dispatch(
          updateThread({ threadId: thread.threadId, title: threadTitle })
        );
        setIsUpdateThread(false);
        setThreadTitle("");
      }
    },
    [dispatch, thread.threadId, threadTitle]
  );

  const handleDeleteThread = useCallback(() => {
    dispatch(deleteThread({ threadId: thread.threadId }));
    setIsDeleteThread(false);
    router.push("/chat");
  }, [dispatch, router, thread.threadId]);

  const handleClickOutInput = useCallback(() => {
    setIsUpdateThread(false);
    setThreadTitle("");
  }, []);

  return (
    <>
      {isUpdateThread ? (
        <div>
          <Input
            autoFocus
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            onKeyDown={handleUpdateThread}
            onBlur={handleClickOutInput}
          />
        </div>
      ) : (
        <SidebarMenuItem onClick={() => handleClickThread(thread.threadId)}>
          <SidebarMenuButton asChild>
            <div className="group/item flex items-center justify-between gap-2 cursor-pointer w-full">
              <span className="truncate">{thread.title}</span>
              <Popover>
                <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="group-hover/item:block hidden" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-3xl p-2 w-40">
                  {actionThread.map((action) => (
                    <Button
                      key={action.id}
                      onClick={(e) => handleClick(e, action.id)}
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
      )}

      <DialogDeleteThread
        open={isDeleteThread}
        onClose={() => setIsDeleteThread(false)}
        onHandle={() => handleDeleteThread()}
      />
    </>
  );
}
