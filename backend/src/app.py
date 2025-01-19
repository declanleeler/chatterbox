from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from .router import router
from .database import mongo

app = FastAPI()
origins = [
    "https://chatterbox-frontend-ochre.vercel.app",  # Production frontend
    "http://localhost:5173",  # Local frontend (during development)
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,  # Allow cookies/auth headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (Authorization, Content-Type, etc.)
)


# Startup and shutdown event handlers
async def startup_db():
    await mongo.connect()


async def shutdown_db():
    await mongo.disconnect()


# Add event handlers for startup and shutdown
app.add_event_handler("startup", startup_db)
app.add_event_handler("shutdown", shutdown_db)

app.include_router(router)
