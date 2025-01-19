import os
import google.generativeai as genai
from vertexai.preview import tokenization

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


def generate(prompt: str):
    try:
        validate_token_count(prompt)
        model = genai.GenerativeModel(model_name=MODEL_NAME)
        response = model.generate_content(prompt)

        return response.text

    except ValueError as e:
        print(f"Error: {e}")
        return None

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None
