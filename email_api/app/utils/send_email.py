import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pydantic import validate_call, EmailStr


logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)


@validate_call
def send_email(
    receiver_email: EmailStr,
    sender_email: EmailStr,
    password: str,
    subject: str,
    body: str,
) -> bool:

    # Create the email
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    # Connect to the Gmail server and send the email
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)

        LOGGER.info("Email sent successfully.")

        return True

    except Exception as e:

        LOGGER.info(f"Error: {e}")

        return False

    finally:

        server.quit()
