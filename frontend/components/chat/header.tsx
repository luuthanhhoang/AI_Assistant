import { ModeToggle } from "../mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 h-16 sticky top-0 left-0">
      <div className="flex items-center space-x-2">
        <SidebarTrigger />
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
