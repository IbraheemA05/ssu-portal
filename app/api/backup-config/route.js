export async function GET() {
  return new Response(JSON.stringify({
    note: 'LEGACY BACKUP — DO NOT EXPOSE TO PUBLIC',
    db_connection: { host: 'db.internal.springfield.edu', port: 5432, database: 'springfield_prod' },
    flag: 'FLAG{backup_c0nfig}',
    admin_backup_codes: ['vc_backup_1932', 'root_recovery_2024'],
    default_passwords: { admin: 'admin123', vc: 'vc123', it_staff: 'it123', lecturer: 'lecturer123' },
    system: { env: 'production', last_backup: '2026-07-25', encryption: 'MD5' },
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
