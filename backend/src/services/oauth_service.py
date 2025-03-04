import os
import requests
from fastapi import Depends, HTTPException, Request, status

used_codes = set()  # In-memory set to track used codes


def code_already_used(code: str) -> bool:
    return code in used_codes


def mark_code_as_used(code: str):
    used_codes.add(code)


def exchange_code_for_token(code: str):
    token_response = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": os.getenv("GITHUB_CLIENT_ID"),
            "client_secret": os.getenv("GITHUB_CLIENT_SECRET"),
            "code": code,
        },
    )

    if token_response.status_code != 200:
        raise HTTPException(
            status_code=400, detail="Error fetching access token from GitHub."
        )

    token_data = token_response.json()
    if "access_token" not in token_data:
        raise HTTPException(
            status_code=400, detail="Access token not found in response"
        )

    return token_data["access_token"], token_data["token_type"]


def get_user_data(access_token: str, token_type: str):
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
    return {key: user_data[key] for key in keys_to_keep if key in user_data}


def get_authorization_header(request: Request):
    authorization = request.headers.get("Authorization")
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token missing",
        )
    return authorization


async def verify_github_token(authorization: str = Depends(get_authorization_header)):
    # Assuming the header format is "Bearer <token>"
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization header is invalid. Token should start with 'Bearer '",
        )

    token = authorization.split(" ")[1]
    user_data = get_user_data(token, "Bearer")

    if user_data is None:
        return False

    return True
