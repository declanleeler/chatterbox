from motor.motor_asyncio import AsyncIOMotorClient
import os
from pymongo.errors import ConfigurationError
from loguru import logger


class MongoDB:
    def __init__(self, uri: str, db_name: str):
        self.uri = uri
        self.db_name = db_name
        self.client = None
        self.db = None

    async def connect(self):
        try:
            self.client = AsyncIOMotorClient(self.uri)
            self.db = self.client[self.db_name]
            logger.info("Successfully connected to MongoDB")
        except ConfigurationError as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise e

    async def disconnect(self):
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed.")
        else:
            logger.warning("MongoDB connection was not established.")


# Initialize MongoDB instance
mongo = MongoDB(
    uri=f"mongodb+srv://{os.getenv('MONGO_USERNAME')}:{os.getenv('MONGO_PASSWORD')}@chatterbox-cluster.wlfsn.mongodb.net/{os.getenv('MONGO_DB')}?retryWrites=true&w=majority",
    db_name=os.getenv("MONGO_DB"),
)
