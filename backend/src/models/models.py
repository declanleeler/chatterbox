from pydantic import BaseModel
from bson import ObjectId
from typing import Any


# Helper function to convert ObjectId to string
def objectid_to_str(obj_id: Any) -> str:
    """Convert ObjectId to string."""
    if isinstance(obj_id, ObjectId):
        return str(obj_id)
    return obj_id


# Helper function to convert string to ObjectId
def str_to_objectid(id_str: str) -> ObjectId:
    """Convert string to ObjectId."""
    return ObjectId(id_str) if id_str else None


class User(BaseModel):
    userId: str
    login: str


class Chat(BaseModel):
    userId: int
    createdOn: int
    name: str


class Message(BaseModel):
    conversationId: str
    userId: int
    messageText: str
    createdOn: int

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class OAuthCodeRequest(BaseModel):
    code: str


class MessageRequest(BaseModel):
    message: Message


class ChatsRequest(BaseModel):
    userId: int


class CreateChatRequest(BaseModel):
    chat: Chat
