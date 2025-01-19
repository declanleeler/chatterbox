import os
from typing import List, Optional
import google.generativeai as genai
from vertexai.preview import tokenization
from ..models.models import (
    Message,
)

GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
genai.configure(api_key=GOOGLE_API_KEY)

MODEL_NAME = "gemini-1.5-flash"
INPUT_TOKEN_LIMIT = 1048576
OUTPUT_TOKEN_LIMIT = 8192


def get_token_count(prompt: str) -> int:
    tokenizer = tokenization.get_tokenizer_for_model(MODEL_NAME)
    result = tokenizer.count_tokens(prompt)
    return result.total_tokens


def validate_token_count(prompt: str):
    input_token_count = get_token_count(prompt)
    if input_token_count > INPUT_TOKEN_LIMIT:
        raise ValueError(
            f"Input exceeds token limit. Max: {INPUT_TOKEN_LIMIT}, but got: {input_token_count}"
        )
    return True


def transform_history_for_gemini(history):
    """Transform the conversation history into the format expected by Google Gemini API."""
    transformed_history = []
    for message in history:
        transformed_message = {
            "role": "model" if message.userId == 10101010 else "user",
            "parts": [{"text": message.messageText}],
        }
        transformed_history.append(transformed_message)
    return transformed_history


def generate(message: str, history: Optional[List[Message]] = None):
    if history:
        prompt = transform_history_for_gemini(history)
        print(f"history: {prompt}")
    else:
        prompt = message
        print(f"message: {prompt}")
    try:
        validate_token_count(prompt)
        model = genai.GenerativeModel(model_name=MODEL_NAME)
        response = model.generate_content(prompt)
        # return "hoofd"
        return response.text

    except ValueError as e:
        print(f"Error: {e}")
        return None

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None
