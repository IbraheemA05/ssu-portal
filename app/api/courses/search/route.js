import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const { data, error } = await supabase.rpc('search_courses', { _q: q });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
