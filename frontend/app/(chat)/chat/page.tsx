import InputChat from "@/components/chat/input-chat";

export default function ChatPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6 w-full lg:w-3xl mb-20">
        <h2 className="text-2xl font-semibold">Hôm nay bạn muốn làm gì?</h2>
        <InputChat />
      </div>
    </div>
  );
}
