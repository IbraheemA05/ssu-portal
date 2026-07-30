import { cookies } from 'next/headers';

export default function SessionPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  const rememberMe = cookieStore.get('remember_me')?.value || null;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>Session Info</h1>
      {/* FLAG{jwt_f0rg3ry} */}
      <div className="card card-accent">
        <table><tbody>
          <tr><th style={{ width: 150 }}>Token</th><td style={{ wordBreak: 'break-all' }}>{token}</td></tr>
          <tr><th>Remember Me</th><td>{rememberMe}</td></tr>
        </tbody></table>
      </div>
    </div>
  );
}
