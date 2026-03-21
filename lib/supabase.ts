import { createClient } from '@supabase/supabase-js';

// 1. Retrieve your environment variables from Vercel/Local .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Safety Check: Ensure the app doesn't crash but warns you if keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase Environment Variables. Check your .env.local or Vercel settings.'
  );
}

/**
 * The standard Supabase Client.
 * Use this for:
 * - Fetching pastries for the storefront
 * - Submitting "Join Waitlist" forms
 * - Checking inventory status
 */
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

/**
 * THE SERVICE ROLE CLIENT (Optional/Secure)
 * Use this ONLY in /api routes or Server Actions.
 * It bypasses Row Level Security (RLS) for admin tasks like 
 * deleting old orders or managing user roles.
 * * NOTE: Never use 'process.env.SUPABASE_SERVICE_ROLE_KEY' 
 * in files that start with 'use client'.
 */
export const getAdminClient = () => {
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!adminKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  
  return createClient(supabaseUrl || '', adminKey);
};