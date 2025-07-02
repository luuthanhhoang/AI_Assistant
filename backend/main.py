from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chatbot_router import router as chatbot_router
from database import engine
from models import messages
from dotenv import load_dotenv
load_dotenv()

# Kiểm tra kết nối database
try:
    messages.Base.metadata.create_all(bind=engine)
    print("✅ Kết nối database thành công!")
    print("✅ Tạo bảng database thành công!")
except Exception as e:
    print(f"❌ Lỗi kết nối database: {str(e)}")
    raise e

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

@app.get("/")
def read_root():
    return {"message": "AI Assistant API is running"}
  
app.include_router(chatbot_router)