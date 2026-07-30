import { getCurrentUser } from '../../lib/getUser';

export default async function AcademicsPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Academics</h1>
      <p className="lead">Springfield State offers over 60 undergraduate and 40 graduate programs across six academic schools.</p>
      <div className="info-grid">
        <div className="card"><h2>School of Engineering & Technology</h2><p>Programs in Computer Science, Cybersecurity, Data Science, Electrical Engineering, and Software Engineering. Home to the state-funded Cybersecurity Research Lab.</p></div>
        <div className="card"><h2>School of Business</h2><p>Undergraduate and MBA programs with concentrations in Finance, Marketing, Supply Chain Management, and Entrepreneurship.</p></div>
        <div className="card"><h2>School of Arts & Humanities</h2><p>Departments include English, History, Philosophy, Modern Languages, and Visual & Performing Arts.</p></div>
        <div className="card"><h2>School of Natural Sciences</h2><p>Programs in Biology, Chemistry, Physics, Mathematics, and Environmental Science with strong research output.</p></div>
        <div className="card"><h2>School of Education</h2><p>Teacher preparation, educational leadership, and counseling programs at undergraduate and graduate levels.</p></div>
        <div className="card"><h2>School of Health Sciences</h2><p>Nursing, Public Health, and Health Administration programs with clinical partnerships across the region.</p></div>
      </div>
    </div>
  );
}
