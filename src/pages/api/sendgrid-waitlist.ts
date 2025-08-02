
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';


sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, city, country } = req.body;

  if (!email || !city || !country) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const msg = {
    to: 'talentlens.business@gmail.com', 
    from: 'talentlens.business@gmail.com', 
    subject: `New Waitlist Submission from ${email}`,
    text: `New waitlist signup!\nEmail: ${email}\nCity: ${city}\nCountry: ${country}`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent!' });
  } catch (err: any) {
    console.error('SendGrid error:', err.response?.body || err.message || err);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
}
