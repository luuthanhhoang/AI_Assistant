import {
  CopyIcon,
  PencilIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface MessageBoxProps {
  type: "user" | "assistant";
  message: string;
}

const actions = [
  {
    id: "copy",
    icon: <CopyIcon />,
    tooltip: "Sao chép",
    type: ["user", "assistant"],
  },
  {
    id: "edit",
    icon: <PencilIcon />,
    tooltip: "Chỉnh sửa",
    type: ["user"],
  },
  {
    id: "like",
    icon: <ThumbsUpIcon />,
    tooltip: "Phản hồi tốt",
    type: ["assistant"],
  },
  {
    id: "dislike",
    icon: <ThumbsDownIcon />,
    tooltip: "Phản hồi không tốt",
    type: ["assistant"],
  },
];

export default function MessageBox({ type, message }: MessageBoxProps) {
  const actionMessage = (type: MessageBoxProps["type"]) => {
    return (
      <div className="flex items-center">
        {actions
          .filter((item) => item.type.includes(type))
          .map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{item.tooltip}</TooltipContent>
            </Tooltip>
          ))}
      </div>
    );
  };

  if (type === "user") {
    return (
      <div className="flex justify-end w-full pr-1">
        <div className="flex flex-col items-end gap-2 w-fit max-w-2/3 h-fit">
          <div className="w-full h-full">
            <div className="bg-[#e9e9e980] dark:bg-[#303030] dark:text-white p-4 rounded-3xl">
              {message}
            </div>
          </div>
          {actionMessage(type)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start w-full px-1">
      <div className="w-full flex flex-col items-start gap-2">
        <div>{message}</div>
        {actionMessage(type)}
      </div>
    </div>
  );
}
