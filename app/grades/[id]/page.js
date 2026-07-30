import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';
import { notFound, redirect } from 'next/navigation';

export default async function GradesPage({ params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  const { data: student } = await supabase.from('users').select('*').eq('id', params.id).eq('role', 'student').maybeSingle();
  if (!student) notFound();

  const { data: enrolled } = await supabase.from('enrollments').select('*, courses(*)').eq('student_id', student.id);
  const isTarget = parseInt(params.id) === 6;

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <h1>Grade Report</h1>
      {isTarget && <div style={{ color: '#2ecc71', fontWeight: 600, marginBottom: 12 }}>FLAG{1dor_gr4d3s}</div>}
      <div className="card card-accent">
        <table><tbody>
          <tr><th style={{ width: 150 }}>Student</th><td>{student.full_name} ({student.student_id})</td></tr>
          <tr><th>Major</th><td>{student.major}</td></tr>
          <tr><th>Year</th><td>{student.year}</td></tr>
          <tr><th>GPA</th><td>{student.gpa}</td></tr>
        </tbody></table>
      </div>
      <div className="card">
        <h2>Course Grades</h2>
        <table><thead><tr><th>Course</th><th>Title</th><th>Credits</th><th>Grade</th></tr></thead><tbody>
          {(enrolled || []).map(e => (
            <tr key={e.id}><td>{e.courses?.code}</td><td>{e.courses?.title}</td><td>{e.courses?.credits}</td><td><span className={'badge badge-' + e.grade}>{e.grade}</span></td></tr>
          ))}
        </tbody></table>
      </div>
    </div>
  );
}
