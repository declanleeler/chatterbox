from pydantic import BaseModel
from typing import List


class User(BaseModel):
    googleId: str
    email: str
    name: str
    messages: List[str] = []

    class Config:
        orm_mode = (
            True  # Allows reading data from ORM-like objects (MongoDB in this case)
        )
