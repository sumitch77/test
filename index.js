const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const transporter = nodemailer.createTransport({
host: "142.251.2.108",
  port: 587,
  secure: false,
  auth: {
    user: "sumitchaudhary7728@gmail.com",
    pass: process.env.pass, 
  },
  tls: {
    servername: "smtp.gmail.com",
    rejectUnauthorized: false
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
    console.log("--- Environment Health Check ---");
console.log("Node Version:", process.versions.node);
console.log("Server Port:", process.env.PORT || "Using default 3069");
console.log("SMTP User:", "sumitchaudhary7728@gmail.com");
console.log("SMTP Pass Variable:", process.env.pass ? `FOUND (Length: ${process.env.pass.length})` : "NOT FOUND ❌");
console.log("Database URL:", process.env.url ? "CONNECTED ✅" : "MISSING ❌");
console.log("-------------------------------");
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
   



