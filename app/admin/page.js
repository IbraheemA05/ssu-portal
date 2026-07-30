import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/getUser';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  const { data: allUsers } = await supabase.from('users').select('*').order('id');
  const { data: allCourses } = await supabase.from('courses').select('*').order('id');

  const { data: allEnrollments } = await supabase
    .from('enrollments')
    .select('*, users!inner(*), courses(*)');

  const { count: ts } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student');
  const { count: tl } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'lecturer');
  const { count: tc } = await supabase.from('courses').select('*', { count: 'exact', head: true });
  const { count: te } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <div className="card-header"><h1>Administration</h1></div>
      <div className="grid-3">
        <div className="card stat-card"><div className="stat-value">{ts}</div><div className="stat-label">Students</div></div>
        <div className="card stat-card"><div className="stat-value">{tl}</div><div className="stat-label">Lecturers</div></div>
        <div className="card stat-card"><div className="stat-value">{tc}</div><div className="stat-label">Courses</div></div>
      </div>

      <div className="card">
        <h2>All Users</h2>
        <table><thead><tr><th>ID</th><th>Username</th><th>Name</th><th>Role</th><th>Actions</th></tr></thead><tbody>
          {(allUsers || []).map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.full_name}</td>
              <td><span className={'badge badge-' + u.role}>{u.role}</span></td>
              <td style={{ display: 'flex', gap: 6 }}>
                {u.role === 'student' && (
                  <form method="POST" action={'/api/admin/delete-student/' + u.id}>
                    <button type="submit" className="btn btn-danger btn-sm">Remove</button>
                  </form>
                )}
                <form method="POST" action={'/api/admin/promote/' + u.id}>
                  <button type="submit" className="btn btn-secondary btn-sm">Change Role</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody></table>
      </div>

      <div className="card">
        <h2>Courses</h2>
        <table><thead><tr><th>Code</th><th>Title</th><th>Instructor</th><th>Credits</th><th></th></tr></thead><tbody>
          {(allCourses || []).map(c => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.title}</td>
              <td>{c.instructor}</td>
              <td>{c.credits}</td>
              <td>
                <form method="POST" action={'/api/admin/delete-course/' + c.id}>
                  <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody></table>
        <details style={{ marginTop: 16 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Add New Course</summary>
          <form method="POST" action="/api/admin/add-course" style={{ marginTop: 12, maxWidth: 500 }}>
            <div className="form-group"><label>Course Code</label><input type="text" name="code" required /></div>
            <div className="form-group"><label>Title</label><input type="text" name="title" required /></div>
            <div className="form-group"><label>Instructor</label><input type="text" name="instructor" /></div>
            <div className="form-group"><label>Instructor ID</label><input type="number" name="instructorId" /></div>
            <div className="form-group"><label>Credits</label><input type="number" name="credits" defaultValue={3} /></div>
            <div className="form-group"><label>Capacity</label><input type="number" name="capacity" defaultValue={30} /></div>
            <div className="form-group"><label>Schedule</label><input type="text" name="schedule" /></div>
            <button type="submit" className="btn btn-primary">Add Course</button>
          </form>
        </details>
      </div>

      <div className="card">
        <h2>All Enrollments</h2>
        <table><thead><tr><th>Student</th><th>Course</th><th>Grade</th></tr></thead><tbody>
          {(allEnrollments || []).map(e => (
            <tr key={e.id}><td>{e.users?.full_name}</td><td>{e.courses?.code} &mdash; {e.courses?.title}</td><td><span className={'badge badge-' + e.grade}>{e.grade}</span></td></tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
}
