"use client";

import { useAppSelector } from "@/store/hooks";
import { DEFAULT_LIMIT } from "@/api/common";
import { fetchMessages } from "@/store/features/messages/messagesService";
import { useAppStore } from "@/store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Status } from "@/models/common";
import MessageBox from "./message-box";

export default function MessageList() {
  const params = useParams();

  const store = useAppStore();
  const chatId = params.id as string;
  const initializedRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messages = useAppSelector(
    (state) => state.messages.messagesValue[chatId]?.messages || []
  );

  useEffect(() => {
    if (!initializedRef.current && chatId) {
      store.dispatch(
        fetchMessages({
          threadId: chatId,
          skip: 0,
          limit: DEFAULT_LIMIT,
        })
      );
      initializedRef.current = true;
    }
  }, [chatId, store]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesResponseState = useAppSelector(
    (state) => state.messages.responseState["fetchMessages"]
  );

  if (
    messagesResponseState?.status === Status.LOADING &&
    messages.length === 0
  ) {
    return <div></div>;
  }

  return (
    <>
      {messages.map((message) => (
        <MessageBox
          key={message.messageId}
          message={message.content}
          type={message.type}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}
