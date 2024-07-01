from pydantic import BaseModel, EmailStr


class EmailMessage(BaseModel):
    receiver_email: EmailStr
    subject: str
    body: str
