// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // This is your App Password, not your Gmail password
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"NHance" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('✅ Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
};
