export async function GET() {
  return new Response(
    'DB_HOST=db.internal.springfield.edu\nDB_USER=root\nDB_PASS=s3cur3_p@ss_2026\nSESSION_SECRET=spr1ngf13ld_s3ss10n\nENCRYPTION=MD5\nFLAG=FLAG{env_var_1eak}\n',
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
