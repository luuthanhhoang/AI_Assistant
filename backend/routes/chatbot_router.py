from typing import List
from services import chatbot_service
from database import get_db
from schemas.message import MessageCreate, MessageOut, MessageUpdate, ThreadCreate, ThreadDelete, ThreadOut, ThreadUpdate
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(prefix="/chatbot", tags=["chatbot"])

@router.post("/thread", response_model=ThreadOut)
def create_thread(thread: ThreadCreate, db: Session = Depends(get_db)):
  thread = chatbot_service.create_thread(db, thread)
  return ThreadOut(
    threadId=thread.thread_id,
    title=thread.title,
    createdAt=thread.created_at,
    updatedAt=thread.updated_at,
  )

@router.get("/thread/{thread_id}", response_model=ThreadOut)
def get_thread(thread_id: str, db: Session = Depends(get_db)):
  thread = chatbot_service.get_thread(db, thread_id)
  return ThreadOut(
    threadId=thread.thread_id,
    title=thread.title,
    createdAt=thread.created_at,
    updatedAt=thread.updated_at,
  )

@router.get("/threads", response_model=List[ThreadOut])
def get_threads(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
  threads = chatbot_service.get_threads(db, skip, limit)
  return [
    ThreadOut(
      threadId=thread.thread_id,
      title=thread.title,
      createdAt=thread.created_at,
      updatedAt=thread.updated_at,
    )
    for thread in threads
  ]

@router.patch("/thread/{thread_id}", response_model=ThreadOut)
def update_thread(thread_id: str, thread: ThreadUpdate, db: Session = Depends(get_db)):
  thread = chatbot_service.update_thread(db, thread_id, thread)
  return ThreadOut(
    threadId=thread.thread_id,
    title=thread.title,
    createdAt=thread.created_at,
    updatedAt=thread.updated_at,
  )

@router.delete("/thread/{thread_id}", response_model=ThreadDelete)
def delete_thread(thread_id: str, db: Session = Depends(get_db)):
  thread_id = chatbot_service.delete_thread(db, thread_id)
  return ThreadDelete(threadId=thread_id)

@router.post("/message", response_model=MessageOut)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
  message = chatbot_service.create_message(db, message)
  return MessageOut(
    messageId=message.message_id,
    threadId=message.thread_id,
    type=message.type,
    content=message.content,
    createdAt=message.created_at,
    updatedAt=message.updated_at,
  )

@router.put("/message/{message_id}", response_model=MessageOut)
def update_message(message_id: str, message: MessageUpdate, db: Session = Depends(get_db)):
  message = chatbot_service.update_message(db, message_id, message)
  return MessageOut(
    messageId=message.message_id,
    threadId=message.thread_id,
    type=message.type,
    content=message.content,
    createdAt=message.created_at,
    updatedAt=message.updated_at,
  )

@router.get("/message/{message_id}", response_model=MessageOut)
def get_message(message_id: str, db: Session = Depends(get_db)):
  message = chatbot_service.get_message(db, message_id)
  return MessageOut(
    threadId=message.thread_id,
    messageId=message.message_id,
    type=message.type,
    content=message.content,
    createdAt=message.created_at,
    updatedAt=message.updated_at,
  )

@router.get("/messages/{thread_id}", response_model=List[MessageOut])
def get_messages(thread_id: str, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
  messages = chatbot_service.get_messages(db, thread_id, skip, limit)
  return [
    MessageOut(
      threadId=message.thread_id,
      messageId=message.message_id,
      type=message.type,
      content=message.content,
      createdAt=message.created_at,
      updatedAt=message.updated_at,
    )
    for message in messages
  ]