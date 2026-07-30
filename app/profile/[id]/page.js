import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';
import { notFound, redirect } from 'next/navigation';

const roleLabel = (role) => ({ admin: 'Registrar', vc: 'Vice Chancellor', it_staff: 'IT Staff', lecturer: 'Lecturer', student: 'Student' })[role] || role;
const roleBadge = (role) => role === 'admin' || role === 'vc' ? 'badge-admin' : role === 'it_staff' ? 'badge-it' : role === 'lecturer' ? 'badge-lecturer' : 'badge-student';

export default async function ProfilePage({ params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  const { data: target } = await supabase.from('users').select('*').eq('id', params.id).maybeSingle();
  if (!target) notFound();

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <h1>{target.full_name}</h1>
      <div className="card card-accent">
        <table><tbody>
          <tr><th style={{ width: 155 }}>{target.role === 'student' ? 'Student ID' : 'Staff ID'}</th><td>{target.student_id || target.staff_id}</td></tr>
          <tr><th>Username</th><td>{target.username}</td></tr>
          <tr><th>Full Name</th><td>{target.full_name}</td></tr>
          <tr><th>Email</th><td>{target.email}</td></tr>
          <tr><th>Role</th><td><span className={'role-header ' + target.role}>{roleLabel(target.role)}</span></td></tr>
          {target.role === 'student' ? (
            <>
              <tr><th>Major</th><td>{target.major}</td></tr>
              <tr><th>Year</th><td>{target.year}</td></tr>
              <tr><th>GPA</th><td>{target.gpa}</td></tr>
              <tr><th>Date of Birth</th><td>{target.dob || '&mdash;'}</td></tr>
              <tr><th>SSN</th><td>{target.ssn || '&mdash;'}</td></tr>
              <tr><th>Address</th><td>{target.address || '&mdash;'}</td></tr>
            </>
          ) : (
            <>
              <tr><th>Department</th><td>{target.department}</td></tr>
              <tr><th>Title</th><td>{target.title}</td></tr>
            </>
          )}
        </tbody></table>
        <p className="mt-12 flex-wrap">
          <a href={'/profile/' + target.id + '/edit'} className="btn btn-primary btn-sm">Edit Profile</a>
          {target.role === 'student' && (
            <>
              <a href={'/grades/' + target.id} className="btn btn-secondary btn-sm">View Grades</a>
              <a href={'/transcript/' + target.id} className="btn btn-secondary btn-sm">Transcript</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
