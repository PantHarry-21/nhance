// === userController.js ===
import { supabase } from '../supabaseClient.js';

export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Supabase Error (getUsers):', error);
      return res.status(400).json({ error: error.message });
    }
    console.log('Fetched users:', data);
    res.json(data);
  } catch (err) {
    console.error('Server Error (getUsers):', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
