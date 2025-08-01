import nodemailer from "nodemailer";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface WaitlistPayload {
  data: {
    email: string;
    city?: string;
    country?: string;
  };
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let payload: WaitlistPayload;
  try {
    payload = JSON.parse(event.body ?? "").payload;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid payload" }),
    };
  }

  const userEmail = payload.data.email;
  const city = payload.data.city || "Not provided";
  const country = payload.data.country || "Not provided";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "talentlens.business@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: "talentlens.business@gmail.com",
    to: "talentlens.business@gmail.com",
    subject: `New Waitlist Submission from ${userEmail}`,
    text: `A new user has joined the TalentLens waitlist!\nSubmitted Email: ${userEmail}\nCity: ${city}\nCountry: ${country}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to send email: ${error.message}` }),
    };
  }
};
