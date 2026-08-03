const challenges = [
  {
    id: 'recon_secret',
    title: 'Hidden Paths',
    category: 'Reconnaissance',
    difficulty: 'Easy',
    description: 'Explore the server to find hidden directories that were never meant to be public. Sometimes developers leave debug paths accessible in production.',
    hints: [
      'Think about common administrative or debug directory names.',
      'Try /secret, /admin, /backup, /hidden...',
      'The path is exactly 7 characters and starts with /s.',
    ],
    flag: 'FLAG{hidden_secret_dir}',
  },
  {
    id: 'recon_robots',
    title: 'Robot Secrets',
    category: 'Reconnaissance',
    difficulty: 'Easy',
    description: 'The robots.txt file is meant for search engine crawlers, but it can reveal sensitive information to humans too.',
    hints: [
      'Where do webmasters tell search bots what not to index?',
      'Check the comments in the robots.txt file — someone left notes there.',
      'Visit /robots.txt and look at the bottom of the file.',
    ],
    flag: 'FLAG{r0b0ts_d1scl0sure}',
  },
  {
    id: 'recon_env',
    title: 'Environment Leak',
    category: 'Reconnaissance',
    difficulty: 'Easy',
    description: 'Environment files contain sensitive configuration data. They should never be exposed to the public.',
    hints: [
      'What file do many frameworks use to store environment variables?',
      'Try accessing /.env directly.',
      'The .env file has been accidentally exposed at /.env.',
    ],
    flag: 'FLAG{env_var_1eak}',
  },
  {
    id: 'recon_backup',
    title: 'Backup Bonanza',
    category: 'Reconnaissance',
    difficulty: 'Easy',
    description: 'Backup and configuration files are often left in publicly accessible locations. Find the backup config.',
    hints: [
      'The robots.txt mentioned something about a backup config.',
      'Look in the /backup/ directory.',
      'The backup config is at /backup/config.json.',
    ],
    flag: 'FLAG{backup_c0nfig}',
  },
  {
    id: 'recon_old',
    title: 'Ancient Artifacts',
    category: 'Reconnaissance',
    difficulty: 'Medium',
    description: 'Developers often leave old files and backups in the codebase. Find the legacy data dump.',
    hints: [
      'Sometimes old backup files are left in the project root or subdirectories.',
      'Check for a /backup-old/ directory.',
      'There is a data.json.old file in the backup-old directory.',
    ],
    flag: 'FLAG{0ld_d4ta_l34k}',
  },
  {
    id: 'idor_profile',
    title: 'Profile Peek',
    category: 'IDOR',
    difficulty: 'Medium',
    description: 'Insecure Direct Object Reference (IDOR) allows you to access resources by manipulating identifiers. View another user\'s private profile data.',
    hints: [
      'User profiles are accessed by numeric ID in the URL.',
      'Try changing the ID in /profile/1 to a different number.',
      'Check profile ID 2 — the SSN field contains something interesting.',
    ],
    flag: 'FLAG{1dor_pr0f1l3}',
  },
  {
    id: 'idor_grades',
    title: 'Grade Gossip',
    category: 'IDOR',
    difficulty: 'Medium',
    description: 'Grade reports should be private to each student. But the ID is sequential and unprotected. Find another student\'s grades.',
    hints: [
      'Grades are accessed via /grades/[student_id].',
      'Try viewing /grades/5 (John Doe) then change the ID.',
      'Student ID 6 (Jane Smith) has a flag hidden in her enrollment data.',
    ],
    flag: 'FLAG{1dor_gr4d3s}',
  },
  {
    id: 'idor_transcript',
    title: 'Transcript Tampering',
    category: 'IDOR',
    difficulty: 'Hard',
    description: 'Not only can you view other students\' transcripts — you can modify them too. Change another student\'s grade.',
    hints: [
      'The transcript page allows grade changes via a form POST.',
      'Intercept the POST request or craft your own to /api/transcript/[id].',
      'Modify Jane Smith\'s (ID 6) transcript and check the response headers.',
    ],
    flag: 'FLAG{1dor_tr4nscr1pt}',
  },
  {
    id: 'auth_jwt',
    title: 'JWT Juggler',
    category: 'Authentication',
    difficulty: 'Hard',
    description: 'JSON Web Tokens (JWTs) secure user sessions. If you can forge a valid token, you can impersonate any user.',
    hints: [
      'Find the JWT secret — it is stored or displayed in multiple places.',
      'Decode your JWT token to understand its structure, then forge one with role=admin.',
      'The secret is "spr1ngf13ld_s3ss10n" and the flag is on the session page with a forged admin token.',
    ],
    flag: 'FLAG{jwt_f0rg3ry}',
  },
  {
    id: 'auth_cookie',
    title: 'Cookie Crumble',
    category: 'Authentication',
    difficulty: 'Medium',
    description: 'The "remember me" cookie is trivially encoded. Decode it, modify it, and login as someone else.',
    hints: [
      'Check your cookies — the remember_me value looks like encoded data.',
      'Base64 decode the remember_me cookie value.',
      'It is just base64(userId). Change it to 1 (admin), re-encode, and login.',
    ],
    flag: 'FLAG{c00ki3_m0nst3r}',
  },
  {
    id: 'auth_mass',
    title: 'Mass Promotion',
    category: 'Authentication',
    difficulty: 'Hard',
    description: 'Mass assignment (also known as autobinding) lets you update fields that were never intended to be user-modifiable. Escalate your privileges.',
    hints: [
      'The profile edit form submits to /api/profile/[id] with form fields.',
      'The server blocks some fields but forgets to block "role".',
      'Add &lt;input type="hidden" name="role" value="admin"&gt; to the edit form and submit.',
    ],
    flag: 'FLAG{m4ss_4ss1gn}',
  },
  {
    id: 'bac_admin',
    title: 'Administrative Access',
    category: 'Broken Access Control',
    difficulty: 'Medium',
    description: 'The admin panel checks if you are logged in — but it never checks WHAT role you have. Any authenticated user can access it.',
    hints: [
      'Visit /admin while logged in as a regular student.',
      'The page only checks if (!currentUser) — no role verification.',
      'The admin panel is at /admin and the flag is displayed on the page.',
    ],
    flag: 'FLAG{4dm1n_g4t3}',
  },
  {
    id: 'bac_it',
    title: 'IT Infiltration',
    category: 'Broken Access Control',
    difficulty: 'Medium',
    description: 'The IT Services dashboard has system-wide powers. Access it without being an IT staff member.',
    hints: [
      'Visit /it/dashboard while logged in as any user.',
      'Like the admin panel, it only checks authentication, not authorization.',
      'The IT dashboard shows the session secret and the flag.',
    ],
    flag: 'FLAG{1t_p0w3r}',
  },
  {
    id: 'bac_lecturer',
    title: 'Lecturer Loophole',
    category: 'Broken Access Control',
    difficulty: 'Medium',
    description: 'Grade management is meant for lecturers only. But the access control is missing. Access the lecturer panel.',
    hints: [
      'Visit /lecturer/grades while logged in as a student.',
      'The page only checks if you are logged in, not your role.',
      'The lecturer grade management panel is at /lecturer/grades.',
    ],
    flag: 'FLAG{l3ctur3r_byp4ss}',
  },
  {
    id: 'open_redirect',
    title: 'Open Redirect',
    category: 'Misc',
    difficulty: 'Medium',
    description: 'Open redirect vulnerabilities allow attackers to redirect users to malicious sites. Find the unprotected redirect and use it.',
    hints: [
      'Look for endpoints that take a URL parameter and redirect without validation.',
      'Try common parameter names: ?url=, ?to=, ?next=, ?redirect=.',
      'Visit /go?to=https://example.com and check the HTML source.',
    ],
    flag: 'FLAG{0p3n_r3d1r3ct}',
  },
  {
    id: 'sql_injection',
    title: 'SQL Injection',
    category: 'Injection',
    difficulty: 'Hard',
    description: 'The course search builds a SQL query by concatenating your input directly into the statement. Break out of the string literal to read data you should not see — like other users\' passwords.',
    hints: [
      'Go to /courses and use the Search Courses box.',
      'Try a single quote (\') in the search and watch the query fail with a syntax error.',
      'Use a UNION SELECT to read from the users table: the courses table has 8 columns (id, code, title, instructor, instructor_id, credits, schedule, capacity).',
      'A working payload: \' UNION SELECT id, username, plain_password, role, NULL, NULL, NULL, NULL FROM users--',
      'The admin\'s plain_password is a good proof of data exfiltration.',
    ],
    flag: 'FLAG{sql_1nj3ct10n}',
  },
  {
    id: 'cmd_injection',
    title: 'Command Injection',
    category: 'Injection',
    difficulty: 'Hard',
    description: 'The network diagnostics tool passes your input straight into a shell command. Escape the command to run your own code on the server.',
    hints: [
      'Open the Network Diagnostics tool at /ping.',
      'The server runs: ping -c 4 <your input>. Try a semicolon or backticks.',
      'Payload like 8.8.8.8; ls or 8.8.8.8; id proves code execution.',
      'A secret file in the project source (lib/flag-cmd.txt) can be read with cat — chain it onto the command.',
      'If the file is not at that path (e.g. serverless), run 8.8.8.8; env | grep -i flag or find / -iname "*flag*" 2>/dev/null.',
    ],
    flag: 'FLAG{c0mm4nd_1nj3ct10n}',
  },
  {
    id: 'stored_xss',
    title: 'Stored XSS',
    category: 'Injection',
    difficulty: 'Hard',
    description: 'The administration panel lets staff publish announcements, but the announcement body is rendered as raw HTML on the public page. Inject a script that exfiltrates the session cookie.',
    hints: [
      'Publish an announcement from the Admin panel (Manage Announcements).',
      'The /announcements page renders the body with dangerouslySetInnerHTML — unescaped HTML.',
      'Post a body like: &lt;script&gt;fetch("/api/xss-receiver?c="+encodeURIComponent(document.cookie)).then(r=&gt;r.text()).then(f=&gt;alert(f))&lt;/script&gt;',
      'Visit /announcements and the script will exfiltrate your session cookie to the receiver, which returns the flag.',
    ],
    flag: 'FLAG{st0r3d_xss}',
  },
  {
    id: 'xss_reflected',
    title: 'Reflected XSS',
    category: 'Injection',
    difficulty: 'Easy',
    description: 'Some pages echo query parameters directly into the page without escaping. Craft a URL that executes JavaScript in the victim\'s browser.',
    hints: [
      'Look for pages that reflect searchParams in the HTML.',
      'Try the password reset flow — /forgot-password?success=... is rendered with dangerouslySetInnerHTML.',
      'Payload: /forgot-password?success=&lt;img src=x onerror=alert(document.cookie)&gt;',
      'The flag is revealed when your payload executes.',
    ],
    flag: 'FLAG{r3fl3ct3d_xss}',
  },
];

export function getChallenges() {
  return challenges.map(({ flag, ...rest }) => rest);
}

export function findChallenge(id) {
  return challenges.find(c => c.id === id);
}

export function validateFlag(challengeId, submittedFlag) {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) return false;
  return challenge.flag === submittedFlag;
}
