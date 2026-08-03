import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/getUser';
import { redirect } from 'next/navigation';
import CourseSearchBox from './CourseSearchBox';

export default async function CoursesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { data: courses } = await supabase.from('courses').select('*');
  const { data: myEnrollments } = await supabase.from('enrollments').select('course_id').eq('student_id', user.id);
  const enrolledIds = new Set((myEnrollments || []).map(e => e.course_id));

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <h1>Course Catalog</h1>
      <p className="section-subtitle">Browse available courses for the current semester. Enroll in courses that interest you.</p>
      <CourseSearchBox />
      <div className="card">
        <table><thead><tr><th>Code</th><th>Title</th><th>Instructor</th><th>Credits</th><th>Schedule</th><th>Capacity</th><th></th></tr></thead><tbody>
          {(courses || []).map(c => (
            <tr key={c.id}>
              <td><strong>{c.code}</strong></td>
              <td>{c.title}</td>
              <td>{c.instructor}</td>
              <td>{c.credits}</td>
              <td>{c.schedule}</td>
              <td>{c.capacity}</td>
              <td>
                {user.role === 'student' ? (
                  enrolledIds.has(c.id) ? (
                    <span className="badge badge-A">Enrolled</span>
                  ) : (
                    <a href={'/courses/enroll/' + c.id} className="btn btn-primary btn-sm">Enroll</a>
                  )
                ) : (
                  <span className="badge badge-lecturer">Faculty</span>
                )}
              </td>
            </tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
}
