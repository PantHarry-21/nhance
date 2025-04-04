import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password, full_name, role = 'user' } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name, role },
    email_confirm: true,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({
    message: 'User created',
    user: data.user,
  });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });

  res.json({
    message: 'Login successful',
    user: data.user,
    session: data.session,
  });
});

export default router;
