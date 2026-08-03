export const dynamic = 'force-dynamic';

export async function GET(request) {
  const c = request.nextUrl.searchParams.get('c') || '';

  if (c.includes('token=') || c.startsWith('eyJ')) {
    return new Response('FLAG{st0r3d_xss}', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response('No token received.', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
