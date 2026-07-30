import { cookies } from 'next/headers';
import { supabase } from './supabase';
import { verifyToken, unb64 } from './auth';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let userId = null;

  if (token) {
    const payload = verifyToken(token);
    if (payload) userId = payload.userId;
  }

  if (!userId) {
    const rememberMe = cookieStore.get('remember_me')?.value;
    if (rememberMe) {
      userId = unb64(rememberMe);
    }
  }

  if (!userId) return null;

  const { data } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();
  return data;
}
