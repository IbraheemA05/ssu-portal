import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  const rememberMe = cookieStore.get('remember_me')?.value || null;

  return new Response(JSON.stringify({ token, remember_me: rememberMe }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
