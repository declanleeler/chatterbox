import time
from fastapi import APIRouter, HTTPException

from .models.models import ChatRequest, Message, OAuthCodeRequest

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


@router.post("/chat")
async def handle_chat(request: ChatRequest):
    user_message = request.message
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    time.sleep(3)
    robot_response = f"Robot answer to: {user_message.messageText}"
    robot_message = Message(
        conversationId=request.message.conversationId,
        senderId=10101010,
        messageText=robot_response,
        createdOn=int(time.time() * 1000),
    )

    # TODO save to db here

    return {"message": robot_message}
