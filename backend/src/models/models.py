from pydantic import BaseModel, field_validator, validator, Field
from bson import ObjectId
from datetime import datetime
from typing import Any, Optional


# Helper function to convert ObjectId to string
def objectid_to_str(obj_id: Any) -> str:
    """Convert ObjectId to string."""
    if isinstance(obj_id, ObjectId):
        return str(obj_id)
    return obj_id  # In case it's already a string or None


# Helper function to convert string to ObjectId
def str_to_objectid(id_str: str) -> ObjectId:
    """Convert string to ObjectId."""
    return ObjectId(id_str) if id_str else None


class MongoBaseModel(BaseModel):
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {ObjectId: objectid_to_str}  # Convert ObjectId to string

    # Method to convert back to MongoDB format with ObjectId
    def to_mongo(self) -> dict:
        data = self.dict(exclude_unset=True)
        if "_id" in data and isinstance(data["_id"], str):
            data["_id"] = str_to_objectid(data["_id"])
        return data


class User(BaseModel):
    userId: str
    login: str


class Chat(MongoBaseModel):
    userId: int
    createdOn: int
    name: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class Message(MongoBaseModel):
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
