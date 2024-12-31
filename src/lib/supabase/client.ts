import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';
import { supabaseConfig } from './config';

export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey
);