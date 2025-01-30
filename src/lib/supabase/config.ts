// Supabase configuration
const requiredEnvVars = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY'] as const;

// Check for missing environment variables
const missingVars = requiredEnvVars.filter(name => !import.meta.env[name]);
if (missingVars.length > 0) {
  console.error(`Missing Supabase environment variables: ${missingVars.join(', ')}`);
}

export const supabaseConfig = {
  url: import.meta.env.PUBLIC_SUPABASE_URL,
  anonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY
} as const;