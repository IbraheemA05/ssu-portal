export default function ResetPasswordPage({ params, searchParams }) {
  const error = searchParams?.error || null;
  const token = params.token;
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="form-card">
        <h1>Reset Password</h1>
        {error && <div className="error-box">{error}</div>}
        <form method="POST" action={'/api/reset-password/' + token}>
          <div className="form-group"><label>New Password</label><input type="password" name="password" required /></div>
          <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
