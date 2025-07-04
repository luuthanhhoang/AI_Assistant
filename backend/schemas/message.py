from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class MessageType(str, Enum):
  user="user"
  assistant="assistant"
  
class ThreadBase(BaseModel):
  title: Optional[str]
  
class ThreadCreate(ThreadBase):
  threadId: str
  title: Optional[str] = None

class ThreadUpdate(BaseModel):
  title: Optional[str]
  
class ThreadDelete(BaseModel):
  threadId: str

class ThreadOut(ThreadBase):
  threadId: str
  title: Optional[str] = None
  createdAt: datetime
  updatedAt: datetime
  
  class Config:
    from_attributes = True

class MessageBase(BaseModel):
  type: MessageType
  content: str
  threadId: str
  
class MessageCreate(MessageBase):
  messageId:str

class MessageUpdate(BaseModel):
  content: str

class MessageOut(MessageBase):
  messageId: str
  createdAt: datetime
  updatedAt: datetime
  
  class Config:
    from_attributes = True
    
ThreadOut.update_forward_refs()
