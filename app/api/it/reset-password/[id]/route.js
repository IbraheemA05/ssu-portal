import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';
import { md5 } from '../../../../../lib/md5';

export async function POST(request, { params }) {
  const { data: target } = await supabase.from('users').select('id').eq('id', params.id).maybeSingle();
  if (!target) return new Response('User not found', { status: 404 });

  await supabase.from('users').update({ password: md5('Reset123!'), plain_password: 'Reset123!' }).eq('id', params.id);

  return NextResponse.redirect(new URL('/it/dashboard', request.url));
}
