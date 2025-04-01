import { supabase } from "../supabaseClient.js";

export const registerPartner = async (req, res) => {
  const { email, name, services_offered, experience, id_proof_url } = req.body;

  const { data, error } = await supabase
    .from("partners")
    .update({
      services_offered,
      experience,
      id_proof_url,
      status: "active",
    })
    .eq("email", email);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Partner registered", data });
};

export const getAssignedJobs = async (req, res) => {
  const { email } = req.params;

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("assigned_partner", email);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ jobs: data });
};
