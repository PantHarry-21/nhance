import { supabase } from '../supabaseClient.js';

export const getCoupons = async (req, res) => {
  const { data, error } = await supabase.from('coupons').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createCoupon = async (req, res) => {
  const { code, discount } = req.body;
  const { data, error } = await supabase.from('coupons').insert([{ code, discount }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { code, discount } = req.body;
  const { data, error } = await supabase
    .from('coupons')
    .update({ code, discount })
    .eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('coupons').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
