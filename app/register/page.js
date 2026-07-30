export default function RegisterPage({ searchParams }) {
  const error = searchParams?.error || null;
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="form-card">
        <h1>Create Account</h1>
        <p className="lead" style={{ color: '#5a6577', textAlign: 'center', marginBottom: 24 }}>Register for a student account</p>
        {error && <div className="error-box">{error}</div>}
        <form method="POST" action="/api/register">
          <div className="form-group"><label>Username *</label><input type="text" name="username" required /></div>
          <div className="form-group"><label>Password *</label><input type="password" name="password" required /></div>
          <div className="form-group"><label>Full Name</label><input type="text" name="fullName" /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@springfield.edu" /></div>
          <button type="submit" className="btn btn-primary btn-block">Create Account</button>
        </form>
        <div className="form-footer">Already have an account? <a href="/login">Sign in</a></div>
      </div>
    </div>
  );
}
