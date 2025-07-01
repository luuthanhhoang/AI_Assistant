interface Message {
  type: "user" | "assistant";
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

export type { Message, Thread };
