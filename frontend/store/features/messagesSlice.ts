import { DEFAULT_LIMIT } from "@/api/common";
import {
  createMessageApi,
  getMessagesApi,
  getThreadsApi,
} from "@/api/messages";
import { Message, Thread } from "@/models/message";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MessagesState {
  threadsValue: {
    threads: Thread[];
    skip: number;
    limit: number;
  };
  messagesValue: {
    [key: string]: {
      messages: Message[];
      skip: number;
      limit: number;
    };
  };
  status: "idle" | "loading" | "success" | "error";
  data: Message | null;
  error: string | null;
}

const initialState: MessagesState = {
  threadsValue: {
    threads: [],
    skip: 0,
    limit: DEFAULT_LIMIT,
  },
  messagesValue: {},
  status: "idle",
  data: null,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (
    {
      threadId,
      skip,
      limit,
    }: { threadId: string; skip: number; limit: number },
    { rejectWithValue }
  ) => {
    const response = await getMessagesApi(threadId, skip, limit);
    if (response.isError) {
      return rejectWithValue(response.errorMessage);
    }
    return {
      threadId,
      messages: response.data || [],
      skip,
      limit,
    };
  }
);

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async (message: Message, { rejectWithValue }) => {
    const response = await createMessageApi(message);
    if (response.isError) {
      return rejectWithValue(response.errorMessage);
    }
    return {
      message: response.data,
    };
  }
);

export const fetchThreads = createAsyncThunk(
  "messages/fetchThreads",
  async (
    { skip, limit }: { skip: number; limit: number },
    { rejectWithValue }
  ) => {
    const response = await getThreadsApi(skip, limit);
    if (response.isError) {
      return rejectWithValue(response.errorMessage);
    }
    return {
      threads: response.data || [],
      skip,
      limit,
    };
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as string;
    });

    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.status = "success";
      const { threadId, messages, skip, limit } = action.payload;

      if (!state.messagesValue[threadId]) {
        state.messagesValue[threadId] = {
          messages: [],
          skip: 0,
          limit: DEFAULT_LIMIT,
        };
      }

      const existingMessages = state.messagesValue[threadId].messages;
      const newMessages = messages.filter(
        (msg) =>
          !existingMessages.some(
            (existing) => existing.messageId === msg.messageId
          )
      );

      state.messagesValue[threadId].messages = [
        ...existingMessages,
        ...newMessages,
      ];
      state.messagesValue[threadId].skip = skip;
      state.messagesValue[threadId].limit = limit;
    });

    builder.addCase(fetchThreads.fulfilled, (state, action) => {
      const { threads, skip, limit } = action.payload;
      const newThreads = [...state.threadsValue.threads];

      threads.forEach((thread) => {
        const existingIndex = newThreads.findIndex(
          (t) => t.threadId === thread.threadId
        );
        if (existingIndex === -1) {
          newThreads.push(thread);
        } else {
          newThreads[existingIndex].updatedAt = thread.updatedAt;
        }
      });

      state.threadsValue.threads = newThreads;
      state.threadsValue.skip = skip;
      state.threadsValue.limit = limit;
    });

    builder.addCase(createMessage.fulfilled, (state, action) => {
      const { message } = action.payload;
      if (!message) return;
      if (!state.messagesValue[message.threadId]) {
        state.messagesValue[message.threadId] = {
          messages: [],
          skip: 0,
          limit: DEFAULT_LIMIT,
        };
      }

      if (
        !state.threadsValue.threads.find((t) => t.threadId === message.threadId)
      ) {
        state.threadsValue.threads.push({
          threadId: message.threadId,
          title: "New chat",
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        });
      }
      state.messagesValue[message.threadId].messages.push(message);
    });
  },
});

export const {} = messagesSlice.actions;
export default messagesSlice.reducer;
