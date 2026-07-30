export default function TopBar({ user }) {
  return (
    <div className="top-bar">
      <div className="container">
        <span>Springfield State University &mdash; Est. 1932</span>
        <div>
          {user ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <a href="/logout">Logout</a>
            </>
          ) : (
            <>
              <a href="/login">Student Portal</a>
              <a href="/register">Apply</a>
              <a href="/forgot-password">Help</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
