import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';
import { redirect } from 'next/navigation';

export default async function ITDashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
  const { count: totalCourses } = await supabase.from('courses').select('*', { count: 'exact', head: true });
  const { count: totalEnrollments } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });

  const { data: allUsers } = await supabase.from('users').select('*').order('id');

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <div className="card-header"><h1>IT Services Dashboard</h1></div>
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="card stat-card"><div className="stat-value">{totalUsers}</div><div className="stat-label">System Users</div></div>
        <div className="card stat-card"><div className="stat-value">{totalCourses}</div><div className="stat-label">Courses</div></div>
        <div className="card stat-card"><div className="stat-value">{totalEnrollments}</div><div className="stat-label">Enrollments</div></div>
      </div>
      <div className="card card-accent">
        <h2>System Information</h2>
        <table><tbody>
          <tr><th style={{ width: 180 }}>Server Uptime</th><td>N/A (serverless)</td></tr>
          <tr><th>Password Hashing</th><td>MD5</td></tr>
          <tr><th>Session Secret</th><td>spr1ngf13ld_s3ss10n</td></tr>
        </tbody></table>
      </div>
      <div className="card">
        <h2>User Management</h2>
        <table><thead><tr><th>ID</th><th>Username</th><th>Full Name</th><th>Role</th><th>Actions</th></tr></thead><tbody>
          {(allUsers || []).map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.full_name}</td>
              <td><span className={'badge badge-' + u.role}>{u.role}</span></td>
              <td>
                <form method="POST" action={'/api/it/reset-password/' + u.id} style={{ display: 'inline', marginRight: 6 }}>
                  <button type="submit" className="btn btn-secondary btn-sm">Reset Password</button>
                </form>
                <form method="POST" action={'/api/it/delete-user/' + u.id} style={{ display: 'inline' }} onSubmit="return confirm('Delete this user?')">
                  <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
}
