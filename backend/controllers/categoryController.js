// === backend/controllers/categoryController.js ===
import { supabase } from '../supabaseClient.js';

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, icon, is_featured } = req.body;
    const { data, error } = await supabase.from('categories').insert([{ name, icon, is_featured }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, is_featured } = req.body;
    const { data, error } = await supabase.from('categories').update({ name, icon, is_featured }).eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('categories').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};