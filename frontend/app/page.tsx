"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>AI Assistant</h1>
      <p>Build your own AI assistant with many features.</p>
      <Button onClick={() => router.push("/chat")}>Chat</Button>
    </div>
  );
}
