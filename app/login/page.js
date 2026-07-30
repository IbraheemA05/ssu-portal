export default function LoginPage({ searchParams }) {
  const error = searchParams?.error || null;
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="form-card">
        <h1>Student Portal Login</h1>
        <p className="lead" style={{ color: '#5a6577', textAlign: 'center', marginBottom: 24 }}>Sign in to access your courses and grades</p>
        {error && <div className="error-box">{error}</div>}
        <form method="POST" action="/api/login">
          <div className="form-group"><label>Username</label><input type="text" name="username" required autoComplete="username" /></div>
          <div className="form-group"><label>Password</label><input type="password" name="password" required autoComplete="current-password" /></div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" name="remember" id="remember" value="1" style={{ width: 'auto' }} />
            <label htmlFor="remember" style={{ margin: 0, fontSize: 14 }}>Remember my login</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>
        <div className="form-footer"><a href="/forgot-password">Forgot password?</a></div>
        <div className="form-footer">Don&apos;t have an account? <a href="/register">Register here</a></div>
      </div>
    </div>
  );
}
