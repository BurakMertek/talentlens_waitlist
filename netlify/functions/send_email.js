const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, city, country } = JSON.parse(event.body);

  const msg = {
    to: 'talentlens.business@gmail.com', 
    from: 'talentlens.business@gmail.com', 
    subject: `New Waitlist Submission from ${email}`,
    text: `New waitlist signup!
Email: ${email}
City: ${city}
Country: ${country}`,
  };

  try {
    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ message: "Email sent!" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
