from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from config.config import EmailSettings
from models.email_message import EmailMessage
from utils.send_email import send_email

CONFIG = EmailSettings()

app = FastAPI(
    title="Harrison Hoffman Contact Me",
    description="An API to send emails to me from my portfolio site",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def get_status():
    return {"status": "running"}


@app.post("/send-email-to-self")
def send_emails(email_message: EmailMessage) -> JSONResponse:
    """Endpoint to send an email"""

    inquiry_message = f"""\
    You received a message from {email_message.receiver_email} 
    on your portfolio page. Here's the message:

    Subject: {email_message.subject}

    Body: {email_message.body}
    """

    success = send_email(
        receiver_email=CONFIG.FINAL_ADDRESS,
        sender_email=CONFIG.GMAIL_ADDRESS,
        password=CONFIG.GMAIL_APP_PASSWORD,
        subject="Portfolio Inquiry",
        body=inquiry_message,
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
