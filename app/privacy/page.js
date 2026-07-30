import { getCurrentUser } from '../../lib/getUser';

export default async function PrivacyPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Privacy Policy</h1>
      <p className="lead">Springfield State University is committed to protecting the privacy of our students, faculty, and staff.</p>
      <div className="info-section"><h2>Information We Collect</h2><p>We collect personal information including names, contact details, academic records, and financial information necessary for enrollment and university operations.</p></div>
      <div className="info-section"><h2>How We Use Your Information</h2><p>Your information is used for academic registration, grade processing, financial aid administration, campus safety, and communication regarding university services and events.</p></div>
      <div className="info-section"><h2>Data Protection</h2><p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p></div>
      <div className="info-section"><h2>Contact</h2><p>For privacy-related inquiries, contact our Data Protection Officer at privacy@springfield.edu.</p></div>
    </div>
  );
}
