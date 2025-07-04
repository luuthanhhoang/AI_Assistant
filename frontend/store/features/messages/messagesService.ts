import {
  createMessageApi,
  deleteThreadApi,
  getMessagesApi,
  getThreadsApi,
  updateThreadApi,
} from "@/api/messages";
import { Message } from "@/models/message";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const updateThread = createAsyncThunk(
  "messages/updateThread",
  async (
    {
      threadId,
      title,
    }: {
      threadId: string;
      title: string;
    },
    { rejectWithValue }
  ) => {
    const response = await updateThreadApi(threadId, title);
    if (response.isError) {
      return rejectWithValue(response.errorMessage);
    }
    return {
      thread: response.data,
    };
  }
);

export const deleteThread = createAsyncThunk(
  "messages/deleteThread",
  async ({ threadId }: { threadId: string }, { rejectWithValue }) => {
    const response = await deleteThreadApi(threadId);
    if (response.isError) {
      return rejectWithValue(response.errorMessage);
    }
    return {
      threadId,
    };
  }
);
