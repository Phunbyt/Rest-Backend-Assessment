const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require("dotenv").config({ path: require("find-config")(".env") });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const refreshToken = process.env.REFRESH_TOKEN;
OAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

async function sendmail(userEmail, subject, payload) {
  try {
    console.log(">>>>>>>>>>>>>>>>");
    console.log(payload);
    const accessToken = await OAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "roluwafunbi@gmail.com",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "roluwafunbi@gmail.com",
      to: userEmail,
      subject: subject,
      text: payload,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendmail;
