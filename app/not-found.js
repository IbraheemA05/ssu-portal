import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 60, textAlign: 'center' }}>
      <h1>404</h1>
      <p style={{ fontSize: 18, color: '#5a6577', marginBottom: 20 }}>Page not found</p>
      <Link href="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
}
