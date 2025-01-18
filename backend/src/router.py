import time
from fastapi import APIRouter, HTTPException

from src.services.messages_management_service import (
    get_messages_by_chatId,
    save_message,
)
from src.services.chat_management_service import get_user_chats, save_chat

from .models.models import (
    MessageRequest,
    ChatsRequest,
    Message,
    OAuthCodeRequest,
    CreateChatRequest,
)

from .services.oauth_service import (
    code_already_used,
    exchange_code_for_token,
    get_user_data,
    mark_code_as_used,
)

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Hello, World!"}


@router.post("/oauth/redirect")
async def handle_oauth_redirect(request: OAuthCodeRequest):
    if not request.code:
        raise HTTPException(status_code=422, detail="Code parameter is missing")

    if code_already_used(request.code):
        raise HTTPException(status_code=400, detail="Authorization code already used")

    try:
        access_token, token_type = exchange_code_for_token(request.code)
        filtered_user = get_user_data(access_token, token_type)
    except HTTPException as e:
        raise e

    mark_code_as_used(request.code)
    return {"user": filtered_user, "token": access_token, "tokenType": token_type}


@router.post("/chats")
async def get_chats(request: ChatsRequest):
    user_id = request.userId
    chats = await get_user_chats(user_id)
    return {"chats": chats}


@router.post("/create_chat")
async def create_chat(request: CreateChatRequest):
    chat = request.chat
    chat_id = await save_chat(chat)
    if not chat_id:
        raise HTTPException(status_code=500, detail="Failed to save chat")
    return {"message": "Chat created successfully", "chatId": chat_id}


@router.post("/message")
async def handle_message(request: MessageRequest):
    user_message = request.message

    # Save user message
    await save_message(user_message)

    # TODO do LLM here
    robot_response = f"Robot answer to: {user_message.messageText}"
    time.sleep(3)
    robot_message = Message(
        chatId=request.message.chatId,
        userId=10101010,
        messageText=robot_response,
        createdOn=int(time.time() * 1000),
    )

    # Save LLM message
    await save_message(robot_message)

    return {"message": robot_message}


@router.get("/chat/{chat_id}")
async def get_chat_messages(chat_id: str):
    """
    Retrieve a chat by its ID.

    :param chat_id: The ID of the chat to retrieve.
    :return: The Chat instance if found, else 404.
    """
    messages = await get_messages_by_chatId(chat_id)
    if messages is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"messages": messages}
