import { supabase } from '../supabaseClient.js';

export const handleSignup = async (req, res) => {
  const { email, password, full_name } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name },
    email_confirm: true,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'User registered successfully', user: data.user });
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });

  res.json({ message: 'Login successful', user: data.user, session: data.session });
};

