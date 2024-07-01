from fastapi import FastAPI
from fastapi.responses import JSONResponse
from config.config import EmailSettings
from models.email_message import EmailMessage
from utils.send_email import send_email

CONFIG = EmailSettings()

app = FastAPI(
    title="Harrison Hoffman Contact Me",
    description="An API to send emails to me from my portfolio site",
)


@app.get("/")
async def get_status():
    return {"status": "running"}


@app.post("/send-email")
def send_emails(email_message: EmailMessage) -> JSONResponse:
    """Endpoint to send an email"""

    success = send_email(
        receiver_email=email_message.receiver_email,
        sender_email=CONFIG.GMAIL_ADDRESS,
        password=CONFIG.GMAIL_APP_PASSWORD,
        subject=email_message.subject,
        body=email_message.body,
    )

    if success:
        return JSONResponse(
            status_code=200, content={"message": "Email successfully sent"}
        )
    else:
        return JSONResponse(
            status_code=400,
            content={"message": "An error occurred while sending the email"},
        )
