# chatterbox
This is a chatbot application built with React (TypeScript), FastAPI (Python), and MongoDB. The app provides a conversational interface using an LLM API (Gemini) and includes authentication through GitHub's OAuth 2.0.
Live demo: https://chatterbox-frontend-ochre.vercel.app

## Key Features
- User Authentication: Users authenticate via GitHub OAuth 2.0.
- Chat History: View and chat history and automatically include it when re-starting stale converations

## Set up
1. Clone the repo
2. Create a .env file in the backend folder and key in the following key: value pairs
    - MONGO_USERNAME (generate keys in MongoDB Atlas)
    - MONGO_PASSWORD
    - MONGO_DB
    - GITHUB_CLIENT_ID (https://github.com/settings/apps) 
    - GITHUB_CLIENT_SECRET
    - GOOGLE_API_KEY (https://ai.google.dev/gemini-api/docs/api-key)
3. Create a .env file in the frontend folder and key in the following key: value pairs
    - VITE_GITHUB_CLIENT_ID
4. Edit the GitHub Oauth application settings
    - Home: http://localhost:5173/
    - Authorization callback: http://localhost:5173/oauth/callback as the callback in G
5. CD into respective folders frontend and backend, install dependencies, and run 
    - `cd frontend`, `npm install`, `npm run dev`
    - `cd backend`, `pip install -r requirements.txt`, `python main.py`
6. [Optional] Run using docker compose
    - `docker-compose up --build -d`
  
  
Useful links
https://docs.github.com/en/enterprise-server@3.10/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

