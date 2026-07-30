import { getCurrentUser } from '../../lib/getUser';

export default async function ResearchPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>Research & Innovation</h1>
      <p className="lead">Springfield State is classified as a high-research-activity university, with over $50M in annual research expenditures.</p>
      <div className="info-grid">
        <div className="card"><h2>Cybersecurity Research Lab</h2><p>State-funded facility conducting cutting-edge research in network security, cryptography, threat intelligence, and secure software development. Partners with federal agencies and industry leaders.</p></div>
        <div className="card"><h2>Center for Sustainable Energy</h2><p>Interdisciplinary research center focused on renewable energy systems, energy storage, smart grid technology, and climate resilience.</p></div>
        <div className="card"><h2>Institute for Social Policy</h2><p>Conducts data-driven research on education policy, economic mobility, public health, and urban development in partnership with state and local government.</p></div>
        <div className="card"><h2>Innovation & Entrepreneurship Hub</h2><p>Provides startup incubation, technology transfer, and industry partnership support for faculty and student innovators.</p></div>
      </div>
    </div>
  );
}
