from pydantic import BaseModel, Field
from bson import ObjectId
from datetime import datetime
from typing import Optional


class ObjectIdStr(str):
    """Custom type to validate and handle ObjectId as strings."""

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)


class User(BaseModel):
    id: Optional[ObjectIdStr] = Field(alias="_id")
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
class Conversation(BaseModel):
    id: ObjectIdStr = Field(alias="_id")
    googleId: str
    status: Optional[str] = None
    createdOn: datetime
    updatedOn: Optional[datetime] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class Message(BaseModel):
    id: Optional[ObjectIdStr] = Field(alias="_id")
    conversationId: ObjectIdStr
    senderId: str
    messageText: str
    createdOn: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
