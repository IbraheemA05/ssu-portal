import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', 'http://localhost:3000'));
  response.cookies.set('token', '', { maxAge: 0 });
  response.cookies.set('remember_me', '', { maxAge: 0 });
  return response;
}
