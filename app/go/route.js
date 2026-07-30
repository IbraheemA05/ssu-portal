export async function GET(request) {
  const to = request.nextUrl.searchParams.get('to') || '/';
  return new Response(
    '<!DOCTYPE html><html><body>'
    + '<p>Redirecting to <a href="' + to + '">' + to + '</a>...</p>'
    + '<!-- FLAG{0p3n_r3d1r3ct} -->'
    + '<script>location.href="' + to + '";</script>'
    + '</body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}
