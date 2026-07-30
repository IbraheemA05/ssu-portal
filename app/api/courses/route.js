export const dynamic = 'force-dynamic';

import { supabase } from '../../../lib/supabase';

export async function GET() {
  const { data } = await supabase.from('courses').select('*');
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
