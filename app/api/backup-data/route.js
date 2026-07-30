export async function GET() {
  const data = {
    note: 'LEGACY BACKUP — DO NOT DEPLOY TO PRODUCTION',
    flag: 'FLAG{0ld_d4ta_l34k}',
    users: [
      { id: 1, username: 'admin', password: '0192023a7bbd73250516f069df18b500', plain: 'admin123', role: 'admin' },
      { id: 2, username: 'vc', password: '4bf7c122590f1d0234321eed85ea242f', plain: 'vc123', role: 'vc' },
    ],
    generated: '2025-01-15',
  };
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
