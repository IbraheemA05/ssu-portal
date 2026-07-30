import { createClient } from '@supabase/supabase-js';

let _supabase = null;

export function getSupabase() {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    const msg = 'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local';
    throw new Error(msg);
  }

  _supabase = createClient(supabaseUrl, supabaseKey);
  return _supabase;
}

const handler = {
  get(_, prop) {
    return (...args) => getSupabase()[prop](...args);
  },
};

export const supabase = new Proxy({}, handler);
