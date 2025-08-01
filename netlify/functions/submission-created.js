const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    let payload;
    try {
      payload = JSON.parse(event.body).payload;
    } catch (error) {
      console.error("JSON parse error:", error);
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid payload" }) };
    }

    const userEmail = payload.data.email;
    const city = payload.data.city || "Not provided";
    const country = payload.data.country || "Not provided";

    console.log('Payload received:', payload);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "talentlens.business@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "talentlens.business@gmail.com",
      to: "talentlens.business@gmail.com",
      subject: `New Waitlist Submission from ${userEmail}`,
      text: `A new user has joined the TalentLens waitlist!\nSubmitted Email: ${userEmail}\nCity: ${city}\nCountry: ${country}`,
    };

    await transporter.sendMail(mailOptions);

    return { statusCode: 200, body: JSON.stringify({ message: "Email sent successfully" }) };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Unknown server error" }),
    };
  }
};
