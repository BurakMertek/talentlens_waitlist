const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { email, city, country } = data;

  const msg = {
    to: 'talentlens.business@gmail.com', 
    from: 'talentlens.business@gmail.com', 
    subject: `New Waitlist Submission from ${email}`,
    text: `A new user has joined the waitlist!
Email: ${email}
City: ${city}
Country: ${country}`
  };

  try {
    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ message: "Email sent!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
