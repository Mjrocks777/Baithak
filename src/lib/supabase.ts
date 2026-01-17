/**
 * Supabase Client Configuration
 * 
 * This file creates and exports the Supabase client instance
 * that is used throughout the application for database and auth operations.
 * 
 * Note: To enable strict typing, generate types using:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
 * Then import and use: createClient<Database>(...)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

// Using untyped client for flexibility - add Database type after schema is deployed
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

