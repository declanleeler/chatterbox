import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from .database import mongo
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Startup and shutdown event handlers
async def startup_db():
    await mongo.connect()


async def shutdown_db():
    await mongo.disconnect()


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.get("/test_data/")
async def get_test_data():
    collection = mongo.db["test"]
    document = await collection.find_one({"name": "John Doe"})
    if document:
        return {"name": document["name"], "message": document["message"]}
    else:
        return {"message": "Document not found"}


class OAuthCodeRequest(BaseModel):
    code: str


@app.post("/oauth/redirect")
async def handle_oauth_redirect(request: OAuthCodeRequest):
    print(f"Received code: {request.code}")  # Log the received code
    if not request.code:
        raise HTTPException(status_code=422, detail="Code parameter is missing")

    # Exchange the code for an access token
    token_response = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": os.getenv("GITHUB_CLIENT_ID"),
            "client_secret": os.getenv("GITHUB_CLIENT_SECRET"),
            "code": request.code,
        },
    )
    if token_response.status_code != 200:
        raise HTTPException(
            status_code=400, detail="Error fetching access token from GitHub."
        )

    # Extract the access token
    token_data = token_response.json()
    access_token = token_data["access_token"]
    token_type = token_data["token_type"]

    # Fetch user profile with the access token
    user_response = requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"{token_type} {access_token}"},
    )

    if user_response.status_code != 200:
        raise HTTPException(
            status_code=400, detail="Error fetching user data from GitHub."
        )

    user_data = user_response.json()
    keys_to_keep = ["login", "id", "avatar_url"]

    # Filter the dictionary to keep only the specified keys
    filtered_user = {key: user_data[key] for key in keys_to_keep if key in user_data}

    return {"user": filtered_user, "token": access_token, "tokenType": token_type}


# Add event handlers for startup and shutdown
app.add_event_handler("startup", startup_db)
app.add_event_handler("shutdown", shutdown_db)
