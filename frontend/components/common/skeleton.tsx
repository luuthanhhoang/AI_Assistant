import { Skeleton } from "../ui/skeleton";

const generateArray = (length: number) => {
  return Array.from({ length }, (_, index) => index);
};

export const ThreadSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {generateArray(10).map((item) => (
        <Skeleton key={item} className="w-full h-6 rounded-lg" />
      ))}
    </div>
  );
};
