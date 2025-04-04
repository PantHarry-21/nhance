import { supabase } from '../supabaseClient.js';

// === Coupons ===

export const getAllCoupons = async (req, res) => {
  const { data, error } = await supabase.from('coupons').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const createCoupon = async (req, res) => {
  const { code, discount } = req.body;
  const { data, error } = await supabase.from('coupons').insert([{ code, discount }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { code, discount } = req.body;
  const { data, error } = await supabase
    .from('coupons')
    .update({ code, discount })
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('coupons').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Coupon deleted' });
};

// === Billing History ===

export const getBillingHistory = async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('status', 'completed');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// === Commission Tracking ===

export const getCommissions = async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*').eq('status', 'completed');
  if (error) return res.status(500).json({ error: error.message });

  const commissionData = data.map((item) => ({
    service: item.service,
    cost: item.cost,
    quoted: item.quotation_price,
    commission: (item.quotation_price || 0) - (item.cost || 0),
  }));

  res.json(commissionData);
};
