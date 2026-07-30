import { getCurrentUser } from '../../lib/getUser';

export default async function CampusMapPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Campus Map</h1>
      <p className="lead">Springfield State University spans over 200 acres in the heart of Springfield. Our campus features a mix of historic and modern facilities.</p>
      <div className="info-grid">
        <div className="card"><h2>Academic Buildings</h2><p><strong>Anderson Hall</strong> &mdash; College of Engineering<br /><strong>Browning Hall</strong> &mdash; Humanities & Social Sciences<br /><strong>Carnegie Hall</strong> &mdash; Natural Sciences<br /><strong>Davison Hall</strong> &mdash; Business School<br /><strong>Ellis Hall</strong> &mdash; Education</p></div>
        <div className="card"><h2>Student Life</h2><p><strong>Student Union</strong> &mdash; Dining, meeting spaces, student services<br /><strong>Johnson Fitness Center</strong> &mdash; Gym, pool, recreation<br /><strong>Performing Arts Center</strong> &mdash; Theater and concert venue<br /><strong>University Stadium</strong> &mdash; Athletics</p></div>
        <div className="card"><h2>Residential</h2><p><strong>North Campus Village</strong> &mdash; Freshman residence halls<br /><strong>South Campus Apartments</strong> &mdash; Upperclassmen housing<br /><strong>University Village</strong> &mdash; Graduate & family housing</p></div>
        <div className="card"><h2>Parking & Transportation</h2><p>Visitor parking available in the Campus Center Garage. Free campus shuttle runs Mon-Fri 6am-10pm. Bike racks available at all major buildings.</p></div>
      </div>
    </div>
  );
}
