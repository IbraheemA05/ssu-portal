import { getCurrentUser } from '../../lib/getUser';

export default async function AccessibilityPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Accessibility</h1>
      <p className="lead">Springfield State University is committed to ensuring digital accessibility for all users, including those with disabilities.</p>
      <div className="info-section"><h2>Accessibility Standards</h2><p>We strive to conform to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. Our portal is designed to be compatible with screen readers, keyboard navigation, and assistive technologies.</p></div>
      <div className="info-section"><h2>Accessibility Features</h2><p>Features include semantic HTML structure, ARIA landmarks, skip navigation links, and high-contrast color schemes. We continuously test and improve our accessibility.</p></div>
      <div className="info-section"><h2>Report an Accessibility Issue</h2><p>If you experience any accessibility barriers, please contact our Disability Services Office at disability@springfield.edu or (217) 555-4004.</p></div>
    </div>
  );
}
