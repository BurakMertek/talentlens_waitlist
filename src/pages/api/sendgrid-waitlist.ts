import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { email, city, country } = req.body;
  const msg = {
    to: "talentlens.business@gmail.com",
    from: "talentlens.business@gmail.com",
    subject: `New Waitlist Submission from ${email}`,
    text: `A new user has joined the waitlist!\nEmail: ${email}\nCity: ${city}\nCountry: ${country}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
