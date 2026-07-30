import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set('token', '', { maxAge: 0 });
  response.cookies.set('remember_me', '', { maxAge: 0 });
  return response;
}
