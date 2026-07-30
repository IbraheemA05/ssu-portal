import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { md5 } from '../../../lib/md5';

export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .maybeSingle();

  if (!user) {
    return NextResponse.redirect(new URL('/forgot-password?error=User+not+found', request.url));
  }

  const token = md5(user.id + Date.now());

  await supabase
    .from('reset_tokens')
    .insert({ token, user_id: user.id });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resetLink = `${baseUrl}/reset-password/${token}`;

  return NextResponse.redirect(
    new URL('/forgot-password?success=Reset+link%3A+<a+href%3D"' + encodeURIComponent(resetLink) + '">' + encodeURIComponent(resetLink) + '</a>', request.url)
  );
}
