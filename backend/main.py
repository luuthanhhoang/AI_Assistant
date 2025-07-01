from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chatbot_router import router as chatbot_router
from database import engine
from models import messages
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
  title= "API for AI Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
  messages.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "AI Assistant API is running"}
  
app.include_router(chatbot_router)