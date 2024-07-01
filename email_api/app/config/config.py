from pydantic import EmailStr
from pydantic_settings import BaseSettings


class EmailSettings(BaseSettings):
    GMAIL_ADDRESS: EmailStr
    GMAIL_APP_PASSWORD: str
