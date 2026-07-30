'use client';

export default function Error({ error, reset }) {
  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 60, textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p style={{ fontSize: 18, color: '#5a6577', marginBottom: 20 }}>{error?.message || 'An unexpected error occurred.'}</p>
      <button onClick={() => reset()} className="btn btn-primary">Try again</button>
    </div>
  );
}
