import { getCurrentUser } from '../../lib/getUser';

export default async function TermsPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Terms of Use</h1>
      <p className="lead">By accessing and using the Springfield State University portal, you agree to the following terms and conditions.</p>
      <div className="info-section"><h2>Acceptance of Terms</h2><p>By accessing this portal, you agree to be bound by these terms. If you do not agree, do not use the portal.</p></div>
      <div className="info-section"><h2>User Responsibilities</h2><p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p></div>
      <div className="info-section"><h2>Acceptable Use</h2><p>The portal may only be used for lawful purposes. Prohibited activities include unauthorized access, data scraping, and any action that disrupts university operations.</p></div>
      <div className="info-section"><h2>Intellectual Property</h2><p>All content on this portal is the property of Springfield State University unless otherwise noted and may not be reproduced without permission.</p></div>
      <div className="info-section"><h2>Limitation of Liability</h2><p>Springfield State University shall not be liable for any damages arising from the use or inability to use this portal.</p></div>
    </div>
  );
}
