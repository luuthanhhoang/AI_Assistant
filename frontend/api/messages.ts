import { Message, MessageCreate, Thread, ThreadCreate } from "@/models/message";
import { apiDelete, apiGet, apiPatch, apiPost, Response } from "./common";

export async function getThreadsApi(
  skip: number,
  limit: number
): Promise<Response<Thread[]>> {
  return apiGet(`/chatbot/threads?skip=${skip}&limit=${limit}`);
}

export const getThreadApi = async (
  threadId: string
): Promise<Response<Thread>> => {
  return apiGet(`/chatbot/thread/${threadId}`);
};

export const createThreadApi = async (thread: ThreadCreate) => {
  return apiPost("/chatbot/thread", thread);
};

export const updateThreadApi = async (
  threadId: string,
  title: string
): Promise<Response<Thread>> => {
  return apiPatch(`/chatbot/thread/${threadId}`, { title });
};

export const deleteThreadApi = async (threadId: string) => {
  return apiDelete(`/chatbot/thread/${threadId}`);
};

export function createMessageApi(
  message: MessageCreate
): Promise<Response<Message>> {
  return apiPost("/chatbot/message", message);
}

export const updateMessageApi = async (messageId: string, content: string) => {
  return apiPatch(`/chatbot/message/${messageId}`, { content });
};

export const getMessageApi = async (messageId: string) => {
  return apiGet(`/chatbot/message/${messageId}`);
};

export function getMessagesApi(
  threadId: string,
  skip: number,
  limit: number
): Promise<Response<Message[]>> {
  return apiGet(`/chatbot/messages/${threadId}?skip=${skip}&limit=${limit}`);
}
