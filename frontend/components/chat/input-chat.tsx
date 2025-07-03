"use client";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowUpIcon,
  BinocularsIcon,
  GlobeIcon,
  Grid2x2PlusIcon,
  LightbulbIcon,
  MicIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import GoogleDriverIcon from "@/public/images/google_driver.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/store/hooks";
import { MessageType } from "@/models/message";
import { createMessage } from "@/store/features/messagesSlice";

const fileActions = [
  {
    id: "add-image-file",
    label: "Thêm ảnh và tệp",
    icon: <Grid2x2PlusIcon />,
  },
  {
    id: "connect-google-drive",
    label: "Kết nối Google Drive",
    icon: (
      <Image src={GoogleDriverIcon} alt="Google Drive" width={18} height={18} />
    ),
  },
];

const toolActions = [
  {
    id: "search-web",
    label: "Tìm kiếm trên mạng",
    icon: <GlobeIcon />,
  },
  {
    id: "deep-thinking",
    label: "Suy nghĩ sâu hơn",
    icon: <LightbulbIcon />,
  },
  {
    id: "deep-research",
    label: "Nghiên cứu chuyên sâu",
    icon: <BinocularsIcon />,
  },
];

export default function InputChat() {
  const router = useRouter();
  const params = useParams();
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();
  const isSubmittingRef = useRef(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  const resetContent = useCallback(() => {
    setContent("");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!content.trim() || isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    try {
      const pathName = window.location.pathname;
      const threadId = (params.id as string) || uuidv4();
      const messageId = uuidv4();

      const messageContent = content.trim();

      await dispatch(
        createMessage({
          type: MessageType.USER,
          content: messageContent,
          messageId,
          threadId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

      if (pathName !== `/chat/${threadId}`) {
        router.push(`/chat/${threadId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetContent();
      isSubmittingRef.current = false;
    }
  }, [content, dispatch, params.id, resetContent, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex flex-col items-center w-full gap-2 p-2 rounded-3xl border bg-white dark:bg-[#303030]">
      <Textarea
        placeholder="Hỏi bất cứ điều gì"
        className="block min-h-8 max-h-40 w-full resize-none border-0 !bg-transparent shadow-none pl-3 pr-0 py-2 ring-0 !text-[16px] focus:ring-0 focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <div className="flex items-start justify-between w-full">
        <div className="flex items-center w-full">
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"} className="rounded-full w-10 h-10">
                    <PlusIcon />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Thêm ảnh và tệp</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent
              className="p-2 border rounded-3xl shadow-none"
              align="start"
              side="bottom"
            >
              {fileActions.map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => console.log(action.id)}
                >
                  <div className="flex items-center space-x-2">
                    {action.icon}
                    <span>{action.label}</span>
                  </div>
                </Button>
              ))}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="flex items-center space-x-1 rounded-lg"
              >
                <SlidersHorizontalIcon size={18} />
                <span>Công cụ</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-2 border rounded-3xl shadow-none"
              align="start"
              side="bottom"
            >
              {toolActions.map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => console.log(action.id)}
                >
                  <div className="flex items-center space-x-2">
                    {action.icon}
                    <span>{action.label}</span>
                  </div>
                </Button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} className="rounded-full w-10 h-10">
                <MicIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chép chính tả</p>
            </TooltipContent>
          </Tooltip>
          <Button
            className="rounded-full w-10 h-10"
            disabled={!content.trim() || isSubmittingRef.current}
            onClick={handleSubmit}
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
