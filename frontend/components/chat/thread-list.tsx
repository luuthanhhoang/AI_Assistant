import { ListRange, Virtuoso } from "react-virtuoso";
import { useCallback, useRef } from "react";
import { useAppSelector, useAppStore } from "@/store/hooks";
import ThreadItem from "./thread-item";
import { fetchThreads } from "@/store/features/messages/messagesService";
import { DEFAULT_LIMIT } from "@/api/common";
import { Status } from "@/models/common";
import { ThreadSkeleton } from "../common/skeleton";

export default function ThreadList() {
  const store = useAppStore();
  const initializedRef = useRef(false);
  const rangeInitialStartIndexRef = useRef(0);

  if (!initializedRef.current) {
    store.dispatch(fetchThreads({ skip: 0, limit: DEFAULT_LIMIT }));
    initializedRef.current = true;
  }

  const threads = useAppSelector(
    (state) => state.messages.threadsValue.threads
  );

  const threadsResponseState = useAppSelector(
    (state) => state.messages.responseState["fetchThreads"]
  );

  const { skip, limit } = useAppSelector(
    (state) => state.messages.threadsValue
  );

  const loadMore = useCallback(() => {
    if (threadsResponseState.status === Status.LOADING) return;
    store.dispatch(fetchThreads({ skip: skip + limit, limit }));
  }, [threadsResponseState.status, store, skip, limit]);

  const handleRangeChanged = useCallback((range: ListRange) => {
    rangeInitialStartIndexRef.current = range.startIndex;
  }, []);

  if (threads.length === 0 && threadsResponseState.status === Status.LOADING) {
    return <ThreadSkeleton />;
  }

  return (
    <Virtuoso
      useWindowScroll
      initialItemCount={Math.min(
        Math.floor(DEFAULT_LIMIT * 0.9),
        threads.length
      )}
      itemContent={(index, thread) => {
        return <ThreadItem key={thread.threadId} thread={thread} />;
      }}
      endReached={loadMore}
      data={threads}
      rangeChanged={handleRangeChanged}
      initialTopMostItemIndex={rangeInitialStartIndexRef.current}
    />
  );
}
