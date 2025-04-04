// === bookingController.js ===
import { supabase } from '../supabaseClient.js';
import { sendEmail } from '../utils/sendEmail.js';

export const getBookings = async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getNewBookings = async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*').eq('status', 'Pending');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getActiveBookings = async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*').eq('status', 'Active');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getCompletedBookings = async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*').eq('status', 'Completed');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const sendQuotation = async (req, res) => {
  const { id } = req.params;
  const { email, amount, message } = req.body;

  const { error } = await supabase.from('bookings').update({ quotation: amount }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });

  // Send quotation email
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2 style="color: #4B0082;">Your NHance Quotation</h2>
      <p>Dear customer,</p>
      <p>We are pleased to provide your quotation for the requested jewellery service.</p>
      <p><strong>Quotation Amount:</strong> ₹${amount}</p>
      <p>${message || 'Our team will follow up shortly for confirmation.'}</p>
      <br/>
      <p>Thank you for choosing NHance.</p>
    </div>
  `;

  await sendEmail({ to: email, subject: "NHance Service Quotation", html });

  res.status(200).json({ success: true });
};

export const assignPartner = async (req, res) => {
  const { id } = req.params;
  const { partner_id } = req.body;
  const { error } = await supabase.from('bookings').update({ partner_id, status: 'Active' }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ success: true });
};
