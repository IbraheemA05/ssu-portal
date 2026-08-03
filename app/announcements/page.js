import { supabase } from '../../lib/supabase';

export const dynamic = 'force-dynamic';

export default async function AnnouncementsPage() {
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('id', { ascending: false });

  return (
    <div className="container info-page" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>Announcements</h1>
      <p className="lead">Official announcements from Springfield State University administration.</p>
      {(announcements || []).map(item => (
        <div className="card" key={item.id} style={{ marginBottom: 16 }}>
          <div className="date">{item.date}</div>
          <h3>{item.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </div>
      ))}
    </div>
  );
}
