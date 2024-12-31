// Supabase configuration
const requiredEnvVars = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY'] as const;

// Check for missing environment variables
const missingVars = requiredEnvVars.filter(name => !import.meta.env[name]);
if (missingVars.length > 0) {
  throw new Error(
    `Missing required Supabase environment variables: ${missingVars.join(', ')}\n` +
    'Please click the "Connect to Supabase" button to set up your environment.'
  );
}

export const supabaseConfig = {
  url: import.meta.env.PUBLIC_SUPABASE_URL,
  anonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY
} as const;