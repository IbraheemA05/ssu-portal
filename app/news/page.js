import { getCurrentUser } from '../../lib/getUser';

const newsItems = [
  { date: 'March 15, 2026', title: 'SSU Receives $5M Grant for AI Research', body: 'The National Science Foundation has awarded Springfield State University a $5 million grant to establish a new research center focused on ethical artificial intelligence and machine learning applications.' },
  { date: 'February 28, 2026', title: 'Spring Enrollment Hits Record High', body: 'Springfield State University has announced a record enrollment of 8,450 students for the Spring 2026 semester, marking a 6% increase over the previous year.' },
  { date: 'February 10, 2026', title: 'New Cybersecurity Degree Program Launches', body: 'Starting Fall 2026, SSU will offer a new Bachelor of Science in Cybersecurity, designed to meet the growing demand for cybersecurity professionals.' },
  { date: 'January 22, 2026', title: 'University Partners with Tech Industry Leaders', body: 'Springfield State has formed strategic partnerships with five major technology companies to provide internship and research opportunities for students.' },
  { date: 'January 8, 2026', title: 'VC Thornton Announces Scholarship Program', body: 'Vice Chancellor James Thornton has announced a new merit-based scholarship program for students pursuing degrees in STEM fields.' },
  { date: 'December 5, 2025', title: 'SSU Ranked Top 50 for Online Programs', body: 'Springfield State has been ranked among the top 50 universities nationwide for online degree programs by U.S. News & World Report.' },
];

export default async function NewsPage() {
  await getCurrentUser();
  return (
    <div className="container info-page">
      <h1>News & Announcements</h1>
      <p className="lead">Stay up to date with the latest news from Springfield State University.</p>
      {newsItems.map((item, i) => (
        <div className="announcement" key={i}>
          <div className="date">{item.date}</div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
