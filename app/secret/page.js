export default function SecretPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>🔒 Restricted</h1>
      <p>This area contains sensitive institutional data.</p>
      <p style={{ color: '#2ecc71', fontWeight: 600 }}>FLAG{hidden_secret_dir}</p>
      {/* dev note: env file at /.env */}
    </div>
  );
}
