import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../lib/getUser';

export default async function HomePage() {
  const user = await getCurrentUser();
  const { data: announcements } = await supabase.from('announcements').select('*').order('date', { ascending: false });

  const { count: studentCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student');
  const { count: courseCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });

  const stats = { students: studentCount || 0, courses: courseCount || 0 };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-badge">Founded 1932 &mdash; Accredited since 1947</div>
          <h1>Where Academic Excellence Meets Innovation</h1>
          <p className="tagline">Springfield State University empowers the next generation of leaders through world-class education, cutting-edge research, and a vibrant, inclusive community.</p>
          <div className="btn-group">
            {user ? (
              <>
                <a href="/dashboard" className="btn btn-primary">My Dashboard</a>
                <a href="/courses" className="btn btn-outline-light">Browse Courses</a>
              </>
            ) : (
              <>
                <a href="/login" className="btn btn-primary">Student Portal Login</a>
                <a href="/register" className="btn btn-outline-light">Apply for Admission</a>
                <a href="/about" className="btn btn-outline-light">About SSU</a>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
        {stats && (
          <div className="grid-3" style={{ marginBottom: 32 }}>
            <div className="card stat-card"><div className="stat-value">{stats.students}</div><div className="stat-label">Students Enrolled</div></div>
            <div className="card stat-card"><div className="stat-value">{stats.courses}</div><div className="stat-label">Courses Offered</div></div>
            <div className="card stat-card"><div className="stat-value">1932</div><div className="stat-label">Founded</div></div>
          </div>
        )}

        {announcements && announcements.length > 0 && (
          <div className="card card-accent" style={{ marginBottom: 32 }}>
            <h2>Latest Announcements</h2>
            {announcements.map((a, i) => (
              <div className="announcement" key={i}>
                <div className="date">{a.date}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        )}

        <div className="links-grid">
          <a href="/about">About Springfield State</a>
          <a href="/academics">Academic Programs</a>
          <a href="/research">Research & Innovation</a>
          <a href="/library">Library Resources</a>
          <a href="/campus-map">Campus Map</a>
          <a href="/contact">Contact Us</a>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Why Springfield State?</h2>
          <div className="grid-3" style={{ marginTop: 20, textAlign: 'left' }}>
            <div><h3>World-Class Faculty</h3><p style={{ color: '#5a6577', fontSize: 14, lineHeight: 1.7 }}>Learn from leading experts in cybersecurity, data science, engineering, and the humanities.</p></div>
            <div><h3>Cutting-Edge Research</h3><p style={{ color: '#5a6577', fontSize: 14, lineHeight: 1.7 }}>Our $50M research initiative funds groundbreaking work in AI, sustainable energy, and cyber defense.</p></div>
            <div><h3>Vibrant Community</h3><p style={{ color: '#5a6577', fontSize: 14, lineHeight: 1.7 }}>Join over 200 student organizations, NCAA Division II athletics, and a diverse community of 8,000+ students.</p></div>
          </div>
        </div>
      </div>
    </>
  );
}
