import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get('title');
  const body = formData.get('body');

  if (!title || !body) {
    return new Response('Title and body are required', { status: 400 });
  }

  const date = new Date().toISOString().slice(0, 10);

  await supabase.from('announcements').insert({ title, body, date });

  return NextResponse.redirect(new URL('/admin', request.url));
}
