import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

await supabase.auth.admin.createUser({
    email: "admin@nhance.com",
    password: "Admin@123",
    user_metadata: {
      full_name: "Admin User",
      role: "admin"
    },
    email_confirm: true,
  });
