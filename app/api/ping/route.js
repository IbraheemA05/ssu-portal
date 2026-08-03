import { exec } from 'child_process';

export const dynamic = 'force-dynamic';

function run(command) {
  return new Promise(resolve => {
    exec(command, (err, stdout, stderr) => {
      resolve((stdout || '') + (stderr || '') + (err ? '\n[exit: ' + err.code + ']' : ''));
    });
  });
}

async function getHost(request) {
  if (request.method === 'POST') {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      return body.host;
    }
    const formData = await request.formData();
    return formData.get('host');
  }
  return request.nextUrl.searchParams.get('host') || '';
}

export async function GET(request) {
  const host = await getHost(request);
  const output = await run('ping -c 4 ' + host);
  return new Response(output, { headers: { 'Content-Type': 'text/plain' } });
}

export async function POST(request) {
  const host = await getHost(request);
  const output = await run('ping -c 4 ' + host);
  return new Response(output, { headers: { 'Content-Type': 'text/plain' } });
}
