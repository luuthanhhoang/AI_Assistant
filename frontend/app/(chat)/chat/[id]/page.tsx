import InputChat from "@/components/chat/input-chat";
import MessageBox from "@/components/chat/message-box";

export default function ChatPage() {
  return (
    <div className="flex justify-center flex-1 p-4 w-full h-full">
      <div className="flex flex-col items-center space-y-6 w-full h-full lg:w-3xl relative">
        <div className="flex flex-1 flex-col w-full gap-12">
          <MessageBox
            message="w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3w-full lg:w-3xl sticky bottom-3"
            type="user"
          />
          <MessageBox
            message="Trong ứng dụng Next.js dùng App Router, useQuery (từ React Query / TanStack Query) và useSWR (từ Vercel) đều có thể dùng được, nhưng useQuery thường được đánh giá là tốt hơn và phù hợp hơn cho ứng dụng phức tạp.

Dưới đây là bảng so sánh trực quan để bạn lựa chọn:Trong ứng dụng Next.js dùng App Router, useQuery (từ React Query / TanStack Query) và useSWR (từ Vercel) đều có thể dùng được, nhưng useQuery thường được đánh giá là tốt hơn và phù hợp hơn cho ứng dụng phức tạp.

Dưới đây là bảng so sánh trực quan để bạn lựa chọn:

✅ Khi KHÔNG CẦN dùng Redux (chỉ dùng React Query là đủ):
React Query đã được thiết kế để quản lý dữ liệu bất đồng bộ từ server, nên bạn không cần Redux cho:

Gọi API (GET/POST/PUT/DELETE)

Quản lý cache, loading, error, retry

Refetching, pagination, infinite scroll

Background update và stale-time handling

Query invalidation và synchronization✅ Khi KHÔNG CẦN dùng Redux (chỉ dùng React Query là đủ):
React Query đã được thiết kế để quản lý dữ liệu bất đồng bộ từ server, nên bạn không cần Redux cho:

Gọi API (GET/POST/PUT/DELETE)

Quản lý cache, loading, error, retry

Refetching, pagination, infinite scroll

Background update và stale-time handling

Query invalidation và synchronization✅ Khi KHÔNG CẦN dùng Redux (chỉ dùng React Query là đủ):
React Query đã được thiết kế để quản lý dữ liệu bất đồng bộ từ server, nên bạn không cần Redux cho:

Gọi API (GET/POST/PUT/DELETE)

Quản lý cache, loading, error, retry

Refetching, pagination, infinite scroll

Background update và stale-time handling

Query invalidation và synchronization"
            type="assistant"
          />
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
