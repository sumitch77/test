const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use True for port 465, False for 587
  auth: {
    user: "sumitchaudhary7728@gmail.com",
    pass: process.env.pass, // Your 16-digit App Password
  },
});

async function sendMail() {
  try {
    const info = await transporter.sendMail({
      from: '"Sumit" <sumitchaudhary7728@gmail.com>',
      to: "coc13maxfull@gmail.com",
      subject: "Testing Google SMTP",
      text: "Sent via Gmail SMTP and Nodemailer!",
    });

    console.log("Email sent successfully: " + info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
sendMail();
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'ind.html'));
});


 const port = 3069;
  app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
     });
   



