import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';
import { redirect } from 'next/navigation';

export default async function LecturerGradesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { data: myCourses } = await supabase.from('courses').select('*').eq('instructor_id', user.id);
  const courseIds = (myCourses || []).map(c => c.id);

  let enrollments = [];
  if (courseIds.length > 0) {
    const { data: enr } = await supabase
      .from('enrollments')
      .select('*, courses(*), users!inner(*)')
      .in('course_id', courseIds);
    enrollments = enr || [];
  }

  const grouped = {};
  for (const e of enrollments) {
    const cid = e.course_id;
    if (!grouped[cid]) { const c = e.courses; grouped[cid] = { code: c?.code, title: c?.title, enrollments: [] }; }
    grouped[cid].enrollments.push(e);
  }

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <h1>Grade Management</h1>
      {/* FLAG{l3ctur3r_byp4ss} */}
      {Object.values(grouped).length === 0 ? (
        <p style={{ color: '#7a8599' }}>No courses assigned.</p>
      ) : (
        Object.values(grouped).map(g => (
          <div className="card card-accent" key={g.code}>
            <h2>{g.code} &mdash; {g.title}</h2>
            <table><thead><tr><th>Student</th><th>ID</th><th>Grade</th><th></th></tr></thead><tbody>
              {g.enrollments.map(e => (
                <tr key={e.id}>
                  <td>{e.users?.full_name}</td>
                  <td>{e.users?.student_id}</td>
                  <td><span className={'badge badge-' + e.grade}>{e.grade}</span></td>
                  <td>
                    <form method="POST" action={'/api/lecturer/grade/' + e.id} style={{ display: 'flex', gap: 6 }}>
                      <select name="grade" defaultValue={e.grade}>
                        <option>A+</option><option>A</option><option>A-</option><option>B+</option><option>B</option><option>B-</option><option>C+</option><option>C</option><option>F</option>
                      </select>
                      <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody></table>
          </div>
        ))
      )}
    </div>
  );
}
