import { DEFAULT_LIMIT } from "@/api/common";
import { Message, Thread } from "@/models/message";
import { createSlice } from "@reduxjs/toolkit";
import {
  createMessage,
  deleteThread,
  fetchMessages,
  fetchThreads,
  updateThread,
} from "./messagesService";
import { ResponseState, Status } from "@/models/common";

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
  responseState: ResponseState;
}

const initialState: MessagesState = {
  threadsValue: {
    threads: [],
    skip: 0,
    limit: DEFAULT_LIMIT,
  },
  messagesValue: {},
  responseState: {},
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //===========================FETCH MESSAGES============================
    builder.addCase(fetchMessages.pending, (state) => {
      state.responseState["fetchMessages"] = {
        status: Status.LOADING,
        error: null,
      };
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.responseState["fetchMessages"] = {
        status: Status.ERROR,
        error: action.payload as string,
      };
    });

    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.responseState["fetchMessages"] = {
        status: Status.SUCCESS,
        error: null,
      };
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

    //===========================FETCH THREADS============================
    builder.addCase(fetchThreads.pending, (state) => {
      state.responseState["fetchThreads"] = {
        status: Status.LOADING,
        error: null,
      };
    });

    builder.addCase(fetchThreads.rejected, (state, action) => {
      state.responseState["fetchThreads"] = {
        status: Status.ERROR,
        error: action.payload as string,
      };
    });

    builder.addCase(fetchThreads.fulfilled, (state, action) => {
      state.responseState["fetchThreads"] = {
        status: Status.SUCCESS,
        error: null,
      };
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

    //===========================CREATE MESSAGE============================
    builder.addCase(createMessage.pending, (state) => {
      state.responseState["createMessage"] = {
        status: Status.LOADING,
        error: null,
      };
    });

    builder.addCase(createMessage.rejected, (state, action) => {
      state.responseState["createMessage"] = {
        status: Status.ERROR,
        error: action.payload as string,
      };
    });

    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.responseState["createMessage"] = {
        status: Status.SUCCESS,
        error: null,
      };
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
        console.log(message);
        state.threadsValue.threads.push({
          threadId: message.threadId,
          title: message.content,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        });
      }
      state.messagesValue[message.threadId].messages.push(message);
    });

    //===========================UPDATE THREAD============================
    builder.addCase(updateThread.pending, (state) => {
      state.responseState["updateThread"] = {
        status: Status.LOADING,
        error: null,
      };
    });

    builder.addCase(updateThread.rejected, (state, action) => {
      state.responseState["updateThread"] = {
        status: Status.ERROR,
        error: action.payload as string,
      };
    });

    builder.addCase(updateThread.fulfilled, (state, action) => {
      state.responseState["updateThread"] = {
        status: Status.SUCCESS,
        error: null,
      };

      const { thread } = action.payload;
      const threadExist = state.threadsValue.threads.find(
        (th) => th.threadId === thread?.threadId
      );

      if (!threadExist) return;
      threadExist.title = thread?.title || "";
      threadExist.updatedAt = thread?.updatedAt || new Date().toISOString();
    });

    //===========================DELETE THREAD============================
    builder.addCase(deleteThread.pending, (state) => {
      state.responseState["deleteThread"] = {
        status: Status.LOADING,
        error: null,
      };
    });

    builder.addCase(deleteThread.rejected, (state, action) => {
      state.responseState["deleteThread"] = {
        status: Status.ERROR,
        error: action.payload as string,
      };
    });

    builder.addCase(deleteThread.fulfilled, (state, action) => {
      state.responseState["deleteThread"] = {
        status: Status.SUCCESS,
        error: null,
      };
      const { threadId } = action.payload;
      state.threadsValue.threads = state.threadsValue.threads.filter(
        (thread) => thread.threadId !== threadId
      );
      delete state.messagesValue[threadId];
    });
  },
});

export const {} = messagesSlice.actions;
export default messagesSlice.reducer;
