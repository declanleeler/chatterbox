from src.models.models import Chat
from ..database import mongo
from bson import ObjectId
from typing import Optional

# MongoDB collection name
CHAT_COLLECTION = "chats"


async def save_chat(chat: Chat) -> Optional[str]:
    """
    Save a chat document to the database.

    :param chat: Chat instance to be saved.
    :return: The ID of the inserted chat or None if failed.
    """
    try:
        chat_dict = chat.model_dump()
        result = await mongo.db[CHAT_COLLECTION].insert_one(chat_dict)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error saving chat: {e}")
        return None


async def get_user_chats(user_id: str) -> Optional[Chat]:
    """
    Retrieve a chat document by ID.

    :param chat_id: The ID of the chat to retrieve.
    :return: Chat instance or None if not found.
    """
    try:
        chat_docs = await mongo.db[CHAT_COLLECTION].find({"userId": user_id}).to_list()
        for chat in chat_docs:
            chat["_id"] = str(chat["_id"])  # Convert ObjectId to string
        return chat_docs
    except Exception as e:
        print(f"Error retrieving chat: {e}")
        return None


async def get_chat(chat_id: str) -> Optional[Chat]:
    """
    Retrieve a chat document by ID.

    :param chat_id: The ID of the chat to retrieve.
    :return: Chat instance or None if not found.
    """
    try:
        chat_doc = await mongo.db[CHAT_COLLECTION].find_one({"_id": ObjectId(chat_id)})
        if chat_doc:
            return Chat(**chat_doc)
        return None
    except Exception as e:
        print(f"Error retrieving chat: {e}")
        return None
