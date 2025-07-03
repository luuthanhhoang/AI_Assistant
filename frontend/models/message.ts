export enum MessageType {
  USER = "user",
  ASSISTANT = "assistant",
}

interface Message {
  type: MessageType;
  content: string;
  messageId: string;
  threadId: string;
  createdAt: string;
  updatedAt: string;
}

interface Thread {
  threadId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ThreadCreate {
  threadId: string;
  title: string;
}

interface ThreadUpdate {
  title: string;
}

interface MessageCreate {
  type: MessageType;
  messageId: string;
  content: string;
  threadId: string;
}

export type { Message, Thread, ThreadCreate, ThreadUpdate, MessageCreate };
