import { getCurrentUser } from '../../lib/getUser';
import { supabase } from '../../lib/supabase';

export default async function AboutPage() {
  const user = await getCurrentUser();
  const { count: studentCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student');
  const { count: lecturerCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'lecturer');
  const { count: courseCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });

  return (
    <div className="container info-page">
      <h1>About Springfield State University</h1>
      <p className="lead">Founded in 1932, Springfield State University has grown from a small teachers college into a comprehensive public research university serving over 8,000 students across six academic schools.</p>

      <div className="grid-3" style={{ marginBottom: 32 }}>
        <div className="card stat-card"><div className="stat-value">{studentCount || '8,200+'}</div><div className="stat-label">Students</div></div>
        <div className="card stat-card"><div className="stat-value">{lecturerCount || '400+'}</div><div className="stat-label">Faculty</div></div>
        <div className="card stat-card"><div className="stat-value">{courseCount || '200+'}</div><div className="stat-label">Courses</div></div>
      </div>

      <div className="info-section">
        <h2>Our History</h2>
        <p>Springfield State University was established in 1932 as Springfield Teachers College. In 1965, it was renamed Springfield State College, and in 1988, it achieved university status. Today, SSU is recognized as a leading institution for cybersecurity research, data science, and engineering education.</p>
      </div>

      <div className="info-section">
        <h2>Mission & Vision</h2>
        <p><strong>Mission:</strong> To provide accessible, high-quality education that prepares students for meaningful careers and lifelong learning in a rapidly changing world.</p>
        <p><strong>Vision:</strong> To be a nationally recognized public university known for academic excellence, innovative research, and community impact.</p>
      </div>

      <div className="info-section">
        <h2>Accreditation</h2>
        <p>Springfield State University is accredited by the Higher Learning Commission (HLC) and holds specialized accreditations for its engineering, business, and computer science programs.</p>
      </div>
    </div>
  );
}
