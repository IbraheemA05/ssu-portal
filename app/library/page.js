import { getCurrentUser } from '../../lib/getUser';

export default async function LibraryPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>University Library</h1>
      <p className="lead">The Springfield State University Library serves as the intellectual heart of our campus, providing access to over 1.5 million volumes and extensive digital resources.</p>
      <div className="info-grid">
        <div className="card"><h2>Main Library</h2><p>Located at the center of campus, the Main Library houses the general collection, periodicals, and study spaces. Open 24/7 during exam periods.<br /><strong>Hours:</strong> Mon-Thu 7:30am-11pm, Fri 7:30am-8pm, Sat 9am-6pm, Sun 12pm-10pm</p></div>
        <div className="card"><h2>Digital Collections</h2><p>Access over 500,000 e-books, 100,000 journals, and specialized databases including IEEE Xplore, ACM Digital Library, JSTOR, and ProQuest. Remote access available for all currently enrolled students.</p></div>
        <div className="card"><h2>Research Support</h2><p>Librarians provide research consultations, citation management support, and instruction sessions. Subject specialists are available for in-depth research assistance in all academic disciplines.</p></div>
        <div className="card"><h2>Special Collections & Archives</h2><p>Houses rare books, university archives, and the Springfield Regional History Collection. Open by appointment for researchers.</p></div>
      </div>
    </div>
  );
}
