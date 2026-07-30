export const dynamic = 'force-dynamic';

import { supabase } from '../../lib/supabase';

export async function GET() {
  const { data: users } = await supabase.from('users').select('username, plain_password, role');

  const admins = (users || []).filter(u => ['admin', 'vc', 'it_staff'].includes(u.role));
  const lecturers = (users || []).filter(u => u.role === 'lecturer');
  const students = (users || []).filter(u => u.role === 'student');

  let lines = `User-agent: *
Disallow: /admin
Disallow: /api/
Disallow: /backup/
Disallow: /secret/

# ====== IMPORTANT: REMOVE BEFORE PRODUCTION ======
# All registered accounts (auto-generated):
`;

  if (admins.length) { lines += '#\n# -- Administrative Staff --\n'; admins.forEach(u => { lines += `#   ${u.username} / ${u.plain_password || 'N/A'} (${u.role})\n`; }); }
  if (lecturers.length) { lines += '#\n# -- Lecturers --\n'; lecturers.forEach(u => { lines += `#   ${u.username} / ${u.plain_password || 'N/A'}\n`; }); }
  if (students.length) { lines += '#\n# -- Students --\n'; students.forEach(u => { lines += `#   ${u.username} / ${u.plain_password || 'N/A'}\n`; }); }
  lines += '#\n# VC backup password hint: His first name (James) + founding year (1932)\n# Full backup config at: /backup/config.json\n# Challenge flag: FLAG{r0b0ts_d1scl0sure}\n# ==================================================\n';

  return new Response(lines, { headers: { 'Content-Type': 'text/plain' } });
}
