import { cookies } from 'next/headers';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/getUser';
import { redirect } from 'next/navigation';
import { unb64 } from '../../lib/auth';

const roleLabel = (role) => ({ admin: 'Registrar', vc: 'Vice Chancellor', it_staff: 'IT Staff', lecturer: 'Lecturer', student: 'Student' })[role] || role;
const roleBadge = (role) => role === 'admin' || role === 'vc' ? 'badge-admin' : role === 'it_staff' ? 'badge-it' : role === 'lecturer' ? 'badge-lecturer' : 'badge-student';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const cookieStore = cookies();
  const rememberMe = cookieStore.get('remember_me')?.value;
  let cookieTampered = false;
  if (rememberMe && user) {
    const decodedId = unb64(rememberMe);
    if (decodedId && decodedId !== user.id) {
      cookieTampered = true;
    }
  }
  if (!user) redirect('/login');

  const roleLabelStr = roleLabel(user.role);
  const badgeClass = roleBadge(user.role);

  let enrollments = [];
  let totalCredits = 0;
  let myCourses = [];
  let myEnrollments = [];
  let recentEnrollments = [];

  if (user.role === 'student') {
    const { data: enr } = await supabase.from('enrollments').select('*, courses(*)').eq('student_id', user.id);
    enrollments = enr || [];
    totalCredits = enrollments.reduce((s, e) => s + (e.courses?.credits || 0), 0);
  } else if (user.role === 'lecturer') {
    const { data: mc } = await supabase.from('courses').select('*').eq('instructor_id', user.id);
    myCourses = mc || [];
    if (myCourses.length > 0) {
      const courseIds = myCourses.map(c => c.id);
      const { data: me } = await supabase
        .from('enrollments')
        .select('*, courses(*), users!inner(*)')
        .in('course_id', courseIds);
      myEnrollments = me || [];
    }
  } else if (user.role === 'it_staff') {
    const { count: tu } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: tc } = await supabase.from('courses').select('*', { count: 'exact', head: true });
    const { count: te } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });
    return (
      <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="card-header"><h1>Dashboard</h1><span className={'role-header ' + user.role}>{roleLabelStr}</span></div>
        {cookieTampered && <div style={{ color: '#2ecc71', fontWeight: 600, marginBottom: 12 }}>FLAG{c00ki3_m0nst3r}</div>}
        <div className="grid-3">
          <div className="card stat-card"><div className="stat-value">{tu}</div><div className="stat-label">System Users</div></div>
          <div className="card stat-card"><div className="stat-value">{tc}</div><div className="stat-label">Courses</div></div>
          <div className="card stat-card"><div className="stat-value">{te}</div><div className="stat-label">Enrollments</div></div>
        </div>
        <div className="card card-accent">
          <h2>System Information</h2>
          <table><tbody>
            <tr><th style={{ width: 180 }}>Password Hashing</th><td>MD5</td></tr>
          </tbody></table>
        </div>
        <p><a href="/it/dashboard" className="btn btn-primary">Full IT Dashboard</a></p>
      </div>
    );
  }

  if (user.role === 'admin' || user.role === 'vc') {
    const { count: ts } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student');
    const { count: tl } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'lecturer');
    const { count: tc } = await supabase.from('courses').select('*', { count: 'exact', head: true });
    const { count: te } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });
    const { data: re } = await supabase.from('enrollments').select('*, courses(*), users!inner(*)').order('id', { ascending: false }).limit(5);
    recentEnrollments = re || [];

    return (
      <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        <div className="card-header"><h1>Dashboard</h1><span className={'role-header ' + user.role}>{roleLabelStr}</span></div>
        {cookieTampered && <div style={{ color: '#2ecc71', fontWeight: 600, marginBottom: 12 }}>FLAG{c00ki3_m0nst3r}</div>}
        <div className="grid-3">
          <div className="card stat-card"><div className="stat-value">{ts}</div><div className="stat-label">Students</div></div>
          <div className="card stat-card"><div className="stat-value">{tl}</div><div className="stat-label">Lecturers</div></div>
          <div className="card stat-card"><div className="stat-value">{tc}</div><div className="stat-label">Courses</div></div>
        </div>
        <div className="grid-2">
          <div className="card stat-card"><div className="stat-value">{te}</div><div className="stat-label">Total Enrollments</div></div>
          <div className="card stat-card"><div className="stat-value">0</div><div className="stat-label">Administrative Staff</div></div>
        </div>
        <div className="card card-accent">
          <h2>Recent Enrollments</h2>
          <table><thead><tr><th>Student</th><th>Course</th><th>Grade</th></tr></thead><tbody>
            {recentEnrollments.map(e => (
              <tr key={e.id}><td><a href={'/profile/' + e.users?.id}>{e.users?.full_name}</a></td><td>{e.courses?.code} &mdash; {e.courses?.title}</td><td><span className={'badge badge-' + e.grade}>{e.grade}</span></td></tr>
            ))}
          </tbody></table>
        </div>
        <p><a href="/admin" className="btn btn-primary">Full Admin Panel</a></p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <div className="card-header"><h1>Dashboard</h1><span className={'role-header ' + user.role}>{roleLabelStr}</span></div>
      {cookieTampered && <div style={{ color: '#2ecc71', fontWeight: 600, marginBottom: 12 }}>FLAG{c00ki3_m0nst3r}</div>}

      {user.role === 'student' && (
        <div className="grid-2">
          <div className="card card-accent">
            <h2>My Profile</h2>
            <table><tbody>
              <tr><th style={{ width: 130 }}>Student ID</th><td>{user.student_id}</td></tr>
              <tr><th>Name</th><td>{user.full_name}</td></tr>
              <tr><th>Email</th><td>{user.email}</td></tr>
              <tr><th>Major</th><td>{user.major}</td></tr>
              <tr><th>Year</th><td>{user.year}</td></tr>
              <tr><th>GPA</th><td>{user.gpa}</td></tr>
            </tbody></table>
            <p className="mt-12"><a href={'/profile/' + user.id + '/edit'} className="btn btn-primary btn-sm">Edit Profile</a></p>
          </div>
          <div className="card card-accent">
            <h2>Enrolled Courses ({enrollments.length})</h2>
            {enrollments.length === 0 ? (
              <div className="empty-state"><p>Not enrolled in any courses.</p><a href="/courses" className="btn btn-secondary btn-sm">Browse Courses</a></div>
            ) : (
              <>
                {enrollments.map(e => (
                  <div className="grade-row" key={e.id}>
                    <div className="course-info"><div className="course-code">{e.courses?.code}</div><div className="course-title">{e.courses?.title}</div></div>
                    <div><span className={'badge badge-' + e.grade}>{e.grade}</span></div>
                  </div>
                ))}
                <p className="mt-12" style={{ fontSize: 14, color: '#5a6577' }}>Total credits: <strong>{totalCredits}</strong></p>
              </>
            )}
          </div>
        </div>
      )}

      {user.role === 'lecturer' && (
        <div className="grid-2">
          <div className="card card-accent">
            <h2>My Courses</h2>
            {myCourses.length === 0 ? (
              <p style={{ color: '#7a8599' }}>No courses assigned.</p>
            ) : (
              myCourses.map(c => (
                <div className="grade-row" key={c.id}>
                  <div className="course-info"><div className="course-code">{c.code}</div><div className="course-title">{c.title} &middot; {c.schedule}</div></div>
                </div>
              ))
            )}
          </div>
          <div className="card card-accent">
            <h2>My Students ({myEnrollments.length})</h2>
            {myEnrollments.length === 0 ? (
              <p style={{ color: '#7a8599' }}>No enrollments yet.</p>
            ) : (
              <table><thead><tr><th>Student</th><th>Course</th><th>Grade</th></tr></thead><tbody>
                {myEnrollments.map(e => (
                  <tr key={e.id}><td><a href={'/profile/' + e.users?.id}>{e.users?.full_name}</a></td><td>{e.courses?.code}</td><td><span className={'badge badge-' + e.grade}>{e.grade}</span></td></tr>
                ))}
              </tbody></table>
            )}
            <p className="mt-12"><a href="/lecturer/grades" className="btn btn-primary btn-sm">Manage Grades</a></p>
          </div>
        </div>
      )}
    </div>
  );
}
