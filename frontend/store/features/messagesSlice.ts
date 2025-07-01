import { Message, Thread } from "@/models/message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
  value: {
    [key: string]: Message[];
  };
  threads: Thread[];
  status: "idle" | "loading" | "success" | "error";
  data: Message | null;
  error: string | null;
}

const initialState: MessagesState = {
  value: {},
  threads: [],
  status: "idle",
  data: null,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      if (!state.value[action.payload.threadId]) {
        state.value[action.payload.threadId] = [];
      }
      state.value[action.payload.threadId].push(action.payload);
      if (
        !state.threads.find(
          (thread) => thread.threadId === action.payload.threadId
        )
      ) {
        state.threads.push({
          threadId: action.payload.threadId,
          title: action.payload.content.slice(0, 20),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        state.threads.find(
          (thread) => thread.threadId === action.payload.threadId
        )!.updatedAt = new Date().toISOString();
      }
    },
    updateThread: (
      state,
      action: PayloadAction<{ threadId: string; title: string }>
    ) => {
      const thread = state.threads.find(
        (thread) => thread.threadId === action.payload.threadId
      );
      if (thread) {
        thread.title = action.payload.title;
        thread.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { addMessage, updateThread } = messagesSlice.actions;
export default messagesSlice.reducer;
