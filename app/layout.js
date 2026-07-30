import './globals.css';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getCurrentUser } from '../lib/getUser';

export const metadata = {
  title: 'Springfield State University — Excellence in Education Since 1932',
  description: 'Springfield State University — Deliberately vulnerable app for OWASP security education',
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <TopBar user={user} />
        <NavBar user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
