import { getCurrentUser } from '../../lib/getUser';

export default async function ContactPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Contact Us</h1>
      <p className="lead">Have questions? We are here to help.</p>
      <div className="info-grid">
        <div className="card"><h2>Main Campus</h2><p><strong>Address:</strong> 1000 University Drive, Springfield, IL 62701<br /><strong>Phone:</strong> (217) 555-4000<br /><strong>Email:</strong> info@springfield.edu<br /><strong>Hours:</strong> Mon-Fri 8:00 AM &ndash; 5:00 PM</p></div>
        <div className="card"><h2>Admissions Office</h2><p><strong>Phone:</strong> (217) 555-4001<br /><strong>Email:</strong> admissions@springfield.edu</p></div>
        <div className="card"><h2>Registrar's Office</h2><p><strong>Phone:</strong> (217) 555-4002<br /><strong>Email:</strong> registrar@springfield.edu</p></div>
        <div className="card"><h2>IT Help Desk</h2><p><strong>Phone:</strong> (217) 555-4003<br /><strong>Email:</strong> helpdesk@springfield.edu</p></div>
      </div>
    </div>
  );
}
