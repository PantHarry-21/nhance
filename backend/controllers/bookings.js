import { supabase } from "../supabaseClient.js";

export const createBooking = async (req, res) => {
  const { user_email, service_id, image_url, address } = req.body;

  const { data, error } = await supabase.from("bookings").insert([
    {
      user_email,
      service_id,
      image_url,
      address,
      status: "pending",
    },
  ]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: "Booking created", data });
};

export const getUserBookings = async (req, res) => {
  const { email } = req.params;

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_email", email);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ bookings: data });
};

export const updateBookingStatus = async (req, res) => {
  const { id, status } = req.body;

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Status updated" });
};
