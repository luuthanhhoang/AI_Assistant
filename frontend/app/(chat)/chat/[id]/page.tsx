import InputChat from "@/components/chat/input-chat";
import MessageList from "@/components/chat/message-list";

export default function ChatPage() {
  return (
    <div className="flex justify-center flex-1 p-4 w-full h-full">
      <div className="flex flex-col items-center space-y-6 w-full h-full lg:w-3xl relative">
        <div className="flex flex-1 flex-col w-full gap-12">
          <MessageList />
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
