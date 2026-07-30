import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function POST(request, { params }) {
  const { data: target } = await supabase.from('users').select('id').eq('id', params.id).single();
  if (!target) return new Response('User not found', { status: 404 });

  await supabase.from('users').delete().eq('id', params.id);

  return NextResponse.redirect(new URL('/it/dashboard', request.url));
}
