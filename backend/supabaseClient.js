import 'dotenv/config'; // ✅ Use this instead of separate dotenv import
import { createClient } from '@supabase/supabase-js';

console.log("SUPABASE_URL", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY", process.env.SUPABASE_ANON_KEY);

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
