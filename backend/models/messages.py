import enum
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone

class MessageType(str, enum.Enum):
  user="user"
  assistant="assistant"

class Thread(Base):
  __tablename__ = "threads"
  
  thread_id = Column(String, primary_key=True, index=True)
  title = Column(String, nullable=True)
  created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
  updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
  messages = relationship("Message", back_populates="thread", cascade="all, delete-orphan")

class Message(Base):
  __tablename__ = "messages"
  message_id = Column(String, primary_key=True, index=True)
  thread_id = Column(String, ForeignKey("threads.thread_id"), nullable=False, index=True)
  type = Column(Enum(MessageType), nullable=False)
  content = Column(Text, nullable=False)
  created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
  updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
  thread = relationship("Thread", back_populates="messages")
  
  def __repr__(self):
    return f"<Message {self.message_id}>"
  