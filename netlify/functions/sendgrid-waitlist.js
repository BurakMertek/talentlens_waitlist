const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid request body" };
  }

  const { email, city, country } = body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'talentlens.business@gmail.com', // your recipient
    from: 'talentlens.business@gmail.com', // must be a verified sender in SendGrid
    subject: `New Waitlist Submission from ${email}`,
    text: `New waitlist signup!
Email: ${email}
City: ${city}
Country: ${country}`,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent!" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Failed to send email" }),
    };
  }
};
