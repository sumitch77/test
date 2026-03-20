const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const transporter = nodemailer.createTransport({
service: 'gmail',
  auth: {
    user: "sumitchaudhary7728@gmail.com",
    pass: process.env.pass, 
  },
  connectionTimeout: 30000, 
  greetingTimeout: 30000,
  socketTimeout: 30000,
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

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname, 'ind.html'));
    setTimeout(async () => {
    try {
        await sendMail();
        console.log("Email sent successfully after page load");
    } catch (err) {
        console.error("Email failed:", err);
    }
}, 5000);
});


 const port = 3069;
  app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
     });
   



