"use client";

import InputChat from "@/components/chat/input-chat";
import MessageBox from "@/components/chat/message-box";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messages = useAppSelector(
    (state) => state.messages.messagesValue[chatId]?.messages || []
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center flex-1 p-4 w-full h-full">
      <div className="flex flex-col items-center space-y-6 w-full h-full lg:w-3xl relative">
        <div className="flex flex-1 flex-col w-full gap-12">
          {messages.map((message) => (
            <MessageBox
              key={message.messageId}
              message={message.content}
              type={message.type}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="w-full lg:w-3xl sticky bottom-0">
          <div className="fixed z-0 bottom-0 h-8 w-full bg-white dark:bg-background"></div>
          <div className="sticky bottom-0 mb-3">
            <InputChat />
          </div>
        </div>
      </div>
    </div>
  );
}
