from fastapi import FastAPI
from .database import mongo  # Import the MongoDB connection class

app = FastAPI()


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


# Add event handlers for startup and shutdown
app.add_event_handler("startup", startup_db)
app.add_event_handler("shutdown", shutdown_db)
