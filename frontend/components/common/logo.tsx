import Image from "next/image";
import AssistantLogo from "@/public/images/logo.png";
export default function Logo() {
  return (
    <Image src={AssistantLogo} alt="Logo" className="w-8 h-8 rounded-full" />
  );
}
