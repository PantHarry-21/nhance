import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing!");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
