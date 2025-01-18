import os
import google.generativeai as genai

GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
genai.configure(api_key=GOOGLE_API_KEY)

INPUT_TOKEN_LIMIT = 1048576
OUTPUT_TOKEN_LIMIT = 8192


def generate(prompt):
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)
    print(response.text)
    return response.text
