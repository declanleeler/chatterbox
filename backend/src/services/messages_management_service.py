from src.models.models import Message
from ..database import mongo
from bson import ObjectId
from typing import Optional

# MongoDB collection name
MESSAGES_COLLECTION = "messages"


async def save_message(message: Message) -> Optional[str]:
    """
    Save a message document to the database.

    :param message: Message instance to be saved.
    :return: The ID of the inserted message or None if failed.
    """
    try:
        message_dict = message.model_dump()
        result = await mongo.db[MESSAGES_COLLECTION].insert_one(message_dict)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error saving message: {e}")
        return None


async def get_messages_by_chatId(chat_id: str) -> Optional[Message]:
    """
    Retrieve a chat document by ID.

    :param chat_id: The ID of the chat to retrieve.
    :return: Chat instance or None if not found.
    """
    try:
        message_docs = (
            await mongo.db[MESSAGES_COLLECTION].find({"chatId": chat_id}).to_list()
        )
        for message in message_docs:
            message["_id"] = str(message["_id"])
        return message_docs
    except Exception as e:
        print(f"Error retrieving chat: {e}")
        return None
