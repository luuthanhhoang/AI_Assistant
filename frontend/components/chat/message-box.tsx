interface MessageBoxProps {
  type: "user" | "assistant";
  message: string;
}

export default function MessageBox({ type, message }: MessageBoxProps) {
  if (type === "user") {
    return (
      <div className="flex justify-end w-full mr-1">
        <div className="w-fit max-w-2/3 h-fit">
          <div className="bg-[#e9e9e980] dark:bg-[#303030] dark:text-white p-4 rounded-3xl">
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start w-full ml-1">
      <div>{message}</div>
    </div>
  );
}
