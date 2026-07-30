import Link from 'next/link';

export default function NavBar({ user }) {
  return (
    <div className="main-nav">
      <div className="container">
        <Link href="/" className="brand"><img src="/logo.svg" alt="Springfield State" /></Link>
        <nav>
          {user ? (
            <>
              <span className="nav-user">{user.full_name || user.username}</span>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/challenges">Challenges</Link>
              <Link href={'/profile/' + user.id}>Profile</Link>
              {(user.role === 'admin' || user.role === 'vc') && <Link href="/admin">Admin</Link>}
              {user.role === 'it_staff' && <Link href="/it/dashboard">IT Panel</Link>}
              {user.role === 'lecturer' && <Link href="/lecturer/grades">Grades</Link>}
              <Link href="/logout" className="btn-cta">Logout</Link>
            </>
          ) : (
            <>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/academics">Academics</Link>
              <Link href="/research">Research</Link>
              <Link href="/news">News</Link>
              <Link href="/register" className="btn-cta">Apply Now</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
