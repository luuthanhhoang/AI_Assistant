import Header from "@/components/chat/header";
import Sidebar from "@/components/chat/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
