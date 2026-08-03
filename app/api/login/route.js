import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { signToken, b64 } from '../../../lib/auth';

export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  const remember = formData.get('remember');

  if (!username || !password) {
    return NextResponse.redirect(new URL('/login?error=Username+and+password+required', request.url));
  }

  const { data, error } = await supabase.rpc('unsafe_login', { _username: username, _password: password });
  const user = Array.isArray(data) ? data[0] : data;

  if (error || !user) {
    return NextResponse.redirect(new URL('/login?error=Invalid+username+or+password', request.url));
  }

  const token = signToken({ userId: user.id, role: user.role });
  const response = NextResponse.redirect(new URL('/dashboard', request.url));
  response.cookies.set('token', token, { httpOnly: false, secure: false, sameSite: 'lax', maxAge: 86400 });

  if (remember) {
    response.cookies.set('remember_me', b64(String(user.id)), { httpOnly: false, secure: false, sameSite: 'lax', maxAge: 2592000 });
  }

  return response;
}
