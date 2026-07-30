import { supabase } from '../../../../lib/supabase';
import { getCurrentUser } from '../../../../lib/getUser';
import { notFound, redirect } from 'next/navigation';

export default async function EditProfilePage({ params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  const { data: target } = await supabase.from('users').select('*').eq('id', params.id).maybeSingle();
  if (!target) notFound();

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <h1>Edit Profile</h1>
      <div className="form-card" style={{ maxWidth: 600 }}>
        <form method="POST" action={'/api/profile/' + target.id}>
          <div className="form-group"><label>Full Name</label><input type="text" name="full_name" defaultValue={target.full_name} /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" defaultValue={target.email} /></div>
          {target.role === 'student' ? (
            <>
              <div className="form-group"><label>Major</label><input type="text" name="major" defaultValue={target.major} /></div>
              <div className="form-group"><label>Year</label>
                <select name="year" defaultValue={target.year}>
                  <option>Freshman</option><option>Sophomore</option><option>Junior</option><option>Senior</option>
                </select>
              </div>
              <div className="form-group"><label>Address</label><input type="text" name="address" defaultValue={target.address} /></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" defaultValue={target.dob} /></div>
            </>
          ) : (
            <>
              <div className="form-group"><label>Department</label><input type="text" name="department" defaultValue={target.department} /></div>
              <div className="form-group"><label>Title</label><input type="text" name="title" defaultValue={target.title} /></div>
            </>
          )}
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
