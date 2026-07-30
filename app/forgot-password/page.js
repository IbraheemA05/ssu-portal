export default function ForgotPasswordPage({ searchParams }) {
  const error = searchParams?.error || null;
  const success = searchParams?.success || null;
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="form-card">
        <h1>Forgot Password</h1>
        <p className="lead" style={{ color: '#5a6577', textAlign: 'center', marginBottom: 24 }}>Enter your username to receive a password reset link</p>
        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box" dangerouslySetInnerHTML={{ __html: success }} />}
        {!success && (
          <form method="POST" action="/api/forgot-password">
            <div className="form-group"><label>Username</label><input type="text" name="username" required /></div>
            <button type="submit" className="btn btn-primary btn-block">Send Reset Link</button>
          </form>
        )}
        <div className="form-footer"><a href="/login">Back to Login</a></div>
      </div>
    </div>
  );
}
