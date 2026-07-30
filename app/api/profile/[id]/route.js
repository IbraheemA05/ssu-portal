import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request, { params }) {
  const { data: target } = await supabase.from('users').select('*').eq('id', params.id).maybeSingle();
  if (!target) return new Response('User not found', { status: 404 });

  const formData = await request.formData();
  const blocked = new Set(['id', 'username', 'password', 'gpa', 'student_id', 'staff_id', 'plain_password']);
  const updates = {};

  for (const [key, value] of formData.entries()) {
    if (!blocked.has(key)) {
      updates[key] = value;
    }
  }

  await supabase.from('users').update(updates).eq('id', params.id);

  return NextResponse.redirect(new URL('/profile/' + params.id, request.url));
}
