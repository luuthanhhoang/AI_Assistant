from http.client import HTTPException
from schemas.message import MessageCreate, MessageUpdate, ThreadCreate, ThreadUpdate
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from models.messages import Message, Thread

def create_thread(db: Session, thread: ThreadCreate):
  db_thread = Thread(
    thread_id=thread.threadId,
    title=thread.title,
    created_at=datetime.now(timezone.utc),
    updated_at=datetime.now(timezone.utc),
  )
  db.add(db_thread)
  db.commit()
  db.refresh(db_thread)
  return db_thread

def update_thread(db: Session, thread_id: str, thread: ThreadUpdate):
  db_thread = db.query(Thread).filter(Thread.thread_id == thread_id).first()
  if not db_thread:
    raise HTTPException(status_code=404, detail="Thread not found")
  db_thread.title = thread.title
  db_thread.updated_at = datetime.now(timezone.utc)
  db.commit()
  db.refresh(db_thread)
  return db_thread

def get_thread(db: Session, thread_id: str):
  db_thread = db.query(Thread).filter(Thread.thread_id == thread_id).first()
  if not db_thread:
    raise HTTPException(status_code=404, detail="Thread not found")
  return db_thread

def get_threads(db: Session, skip: int = 0, limit: int = 20):
  return db.query(Thread).order_by(Thread.created_at.desc()).offset(skip).limit(limit).all()

def delete_thread(db: Session, thread_id: str):
  db_thread = db.query(Thread).filter(Thread.thread_id == thread_id).first()
  if not db_thread:
    raise HTTPException(status_code=404, detail="Thread not found")
  db.delete(db_thread)
  db.commit()
  return thread_id

def create_message(db: Session, message: MessageCreate):
  existing_thread = db.query(Thread).filter(Thread.thread_id == message.threadId).first()
  if not existing_thread:
    new_thread = Thread(
      thread_id=message.threadId,
      title="New chat",
      created_at=datetime.now(timezone.utc),
      updated_at=datetime.now(timezone.utc),
    )
    db.add(new_thread)
    db.commit()
    db.refresh(new_thread)
  
  db_message = Message(
    message_id=message.messageId,
    thread_id=message.threadId,
    type=message.type,
    content=message.content,
    created_at=datetime.now(timezone.utc),
    updated_at=datetime.now(timezone.utc),
  )
  db.add(db_message)
  db.commit()
  db.refresh(db_message)
  return db_message

def update_message(db: Session, message_id: str, message: MessageUpdate):
  db_message = db.query(Message).filter(Message.message_id == message_id).first()
  if not db_message:
    raise HTTPException(status_code=404, detail="Message not found")
  db_message.content = message.content
  db_message.updated_at = datetime.now(timezone.utc)
  db.commit()
  db.refresh(db_message)
  return db_message

def get_message(db: Session, message_id: str):
  db_message = db.query(Message).filter(Message.message_id == message_id).first()
  if not db_message:
    raise HTTPException(status_code=404, detail="Message not found")
  return db_message

def get_messages(db: Session, thread_id: str, skip: int = 0, limit: int = 20):
  return db.query(Message).filter(Message.thread_id == thread_id).offset(skip).limit(limit).all()