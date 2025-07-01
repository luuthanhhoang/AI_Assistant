interface Message {
  type: "user" | "assistant";
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type { Message };
