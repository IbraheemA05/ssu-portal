export default function BackupPage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>Legacy Backup Directory</h1>
      <ul><li><a href="/backup/config.json">config.json</a></li></ul>
      <p>This directory should be restricted.</p>
    </div>
  );
}
