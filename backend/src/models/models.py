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
    id: Optional[str] = Field(alias="_id", default=None)

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

    # Validator to convert ObjectId to string when reading from MongoDB
    @field_validator("id", mode="before")
    def validate_id(cls, v):
        return objectid_to_str(v) if v else None

    # Method to convert back to MongoDB format, with ObjectId
    def to_mongo(self) -> dict:
        data = self.dict()
        if isinstance(data.get("id"), str):
            data["_id"] = str_to_objectid(data["id"])
        return data

    @classmethod
    def from_mongo(cls, data: dict) -> "MongoBaseModel":
        data["_id"] = objectid_to_str(
            data["_id"]
        )  # Convert ObjectId to string for response
        return cls(**data)


class User(MongoBaseModel):
    email: str
    googleId: str
    name: Optional[str] = None
    createdOn: datetime
    updatedOn: Optional[datetime] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


# Input schema for creating a new Conversation
class ConversationCreate(BaseModel):
    googleId: str
    status: Optional[str] = None
    createdOn: datetime

    class Config:
        orm_mode = True


# Output schema for retrieving a Conversation
class Conversation(MongoBaseModel):
    googleId: str
    status: Optional[str] = None
    createdOn: datetime
    updatedOn: Optional[datetime] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class Message(MongoBaseModel):
    conversationId: str
    senderId: int
    messageText: str
    createdOn: int

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class OAuthCodeRequest(BaseModel):
    code: str


class ChatRequest(BaseModel):
    message: Message
