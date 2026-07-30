import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function POST(request, { params }) {
  const { data: target } = await supabase.from('courses').select('id').eq('id', params.id).maybeSingle();
  if (!target) return new Response('Course not found', { status: 404 });

  await supabase.from('courses').delete().eq('id', params.id);

  return NextResponse.redirect(new URL('/admin', request.url));
}
