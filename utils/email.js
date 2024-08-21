const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use a service like Gmail, or configure with SMTP settings
  auth: {
    user: 'gskkarthikeya@gmail.com', // Your email
    pass: 'uhhs jlnl feoi gdsg'    // Your email password or app-specific password
  }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'gskkarthikeya@gmail.com',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
