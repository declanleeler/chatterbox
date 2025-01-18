from fastapi import FastAPI
from .router import router
from .database import mongo

app = FastAPI()


# Startup and shutdown event handlers
async def startup_db():
    await mongo.connect()


async def shutdown_db():
    await mongo.disconnect()


# Add event handlers for startup and shutdown
app.add_event_handler("startup", startup_db)
app.add_event_handler("shutdown", shutdown_db)

app.include_router(router)
