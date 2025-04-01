import { supabase } from "../supabaseClient.js";
import nodemailer from "nodemailer";

export const invitePartner = async (req, res) => {
  const { name, email } = req.body;

  try {
    const { data, error } = await supabase
      .from("partners")
      .insert([{ name, email, status: "invited" }]);

    if (error) return res.status(400).json({ error: error.message });

    const activationLink = `${process.env.FRONTEND_URL}/partner/signup?email=${email}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NHance" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You're Invited to Join NHance as a Partner",
      html: `<p>Hello ${name},</p>
             <p>You’ve been invited to join NHance as a service partner.</p>
             <p>Click below to register:</p>
             <a href="${activationLink}">${activationLink}</a>`,
    });

    res.status(200).json({ message: "Invitation sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error sending invite" });
  }
};
