import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = "https://bjvffucsnbtqeofwsuna.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdmZmdWNzbmJ0cWVvZndzdW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNzA1MTIsImV4cCI6MjA1ODg0NjUxMn0.canzVtQqMOfCl233ifK64EwfhTlONGY1WWbJGC1L_z8"

// Safety check
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing!");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const login = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return;
  }

  console.log('Logged in user:', user);
  // Redirect to Admin Dashboard
};


export default supabase;
