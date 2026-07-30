import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';
import { notFound, redirect } from 'next/navigation';

export default async function TranscriptPage({ params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  const { data: student } = await supabase.from('users').select('*').eq('id', params.id).eq('role', 'student').single();
  if (!student) notFound();

  const { data: enrolled } = await supabase.from('enrollments').select('*, courses(*)').eq('student_id', student.id);
  const totalCredits = (enrolled || []).reduce((s, e) => s + (e.courses?.credits || 0), 0);

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <div style={{ textAlign: 'right', marginBottom: 10, fontSize: 12, color: '#7a8a9f' }}>OFFICIAL TRANSCRIPT</div>
      <h1>Springfield State University</h1>
      <p style={{ color: '#5a6577', marginBottom: 20 }}>Academic Transcript</p>
      <div className="card card-accent">
        <table><tbody>
          <tr><th style={{ width: 150 }}>Student</th><td>{student.full_name}</td></tr>
          <tr><th>Student ID</th><td>{student.student_id}</td></tr>
          <tr><th>Major</th><td>{student.major}</td></tr>
          <tr><th>Total Credits</th><td>{totalCredits}</td></tr>
          <tr><th>GPA</th><td>{student.gpa}</td></tr>
        </tbody></table>
      </div>
      <form method="POST" action={'/api/transcript/' + student.id}>
        <div className="card">
          <h2>Completed Courses</h2>
          <table><thead><tr><th>Course</th><th>Code</th><th>Credits</th><th>Grade</th></tr></thead><tbody>
            {(enrolled || []).map(e => (
              <tr key={e.id}>
                <td>{e.courses?.title}</td>
                <td>{e.courses?.code}</td>
                <td>{e.courses?.credits}</td>
                <td>
                  <select name={'grade_' + e.id} defaultValue={e.grade}>
                    <option>A+</option><option>A</option><option>A-</option><option>B+</option><option>B</option><option>B-</option><option>C+</option><option>C</option><option>F</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody></table>
        </div>
        <button type="submit" className="btn btn-primary">Update Transcript</button>
      </form>
    </div>
  );
}
