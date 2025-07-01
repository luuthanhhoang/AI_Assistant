import { Message } from "@/models/message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
  value: {
    [key: string]: Message[];
  };
  status: "idle" | "loading" | "success" | "error";
  data: Message | null;
  error: string | null;
}

const initialState: MessagesState = {
  value: {},
  status: "idle",
  data: null,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ [key: string]: Message[] }>
    ) => {
      state.value = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      if (!state.value[action.payload.id]) {
        state.value[action.payload.id] = [];
      }
      state.value[action.payload.id].push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
