import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { md5 } from '../../../../lib/md5';

export async function POST(request, { params }) {
  const token = params.token;

  const { data: tokenData } = await supabase
    .from('reset_tokens')
    .select('*')
    .eq('token', token)
    .single();

  if (!tokenData) {
    return new Response('Invalid or expired token.', { status: 404 });
  }

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('id', tokenData.user_id)
    .single();

  if (!user) {
    return new Response('User not found.', { status: 404 });
  }

  const formData = await request.formData();
  const newPassword = formData.get('password');

  await supabase
    .from('users')
    .update({ password: md5(newPassword), plain_password: newPassword })
    .eq('id', user.id);

  await supabase
    .from('reset_tokens')
    .delete()
    .eq('token', token);

  return new Response('Password reset successful. <a href="/login">Login</a>', {
    headers: { 'Content-Type': 'text/html' },
  });
}
