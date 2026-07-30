import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { md5 } from '../../../lib/md5';
import { signToken, b64 } from '../../../lib/auth';

export async function POST(request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  const fullName = formData.get('fullName') || '';
  const email = formData.get('email') || '';

  if (!username || !password) {
    return NextResponse.redirect(new URL('/register?error=Username+and+password+required', request.url));
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single();

  if (existing) {
    return NextResponse.redirect(new URL('/register?error=Username+taken', request.url));
  }

  const { data: maxUser } = await supabase.from('users').select('id').order('id', { ascending: false }).limit(1).single();
  const nextId = (maxUser?.id || 0) + 1;

  const { data: newUser } = await supabase
    .from('users')
    .insert({
      id: nextId, username, password: md5(password), plain_password: password, role: 'student',
      email, full_name: fullName, student_id: 'STU-' + nextId,
      major: 'Undeclared', year: 'Freshman', gpa: 0.0, ssn: '', dob: '', address: '',
    })
    .select()
    .single();

  const token = signToken({ userId: newUser.id, role: newUser.role });
  const response = NextResponse.redirect(new URL('/dashboard', request.url));
  response.cookies.set('token', token, { httpOnly: false, secure: false, sameSite: 'lax', maxAge: 86400 });

  return response;
}
