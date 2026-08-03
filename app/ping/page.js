'use client';

import { useState } from 'react';

export default function PingPage() {
  const [host, setHost] = useState('localhost');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runPing = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host }),
      });
      setOutput(await res.text());
    } catch {
      setOutput('Request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 700 }}>
      <h1>Network Diagnostics</h1>
      <p className="section-subtitle">Ping a host to test network connectivity from the server.</p>
      <div className="card">
        <form onSubmit={runPing} style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={host}
            onChange={e => setHost(e.target.value)}
            placeholder="Enter hostname or IP, e.g. 8.8.8.8"
            style={{ flex: 1, padding: '8px 12px', fontFamily: 'monospace' }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Pinging...' : 'Ping'}
          </button>
        </form>
        {output && (
          <pre style={{
            marginTop: 16, padding: 12, background: '#0f172a', color: '#a5f3fc',
            borderRadius: 6, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap',
          }}>{output}</pre>
        )}
      </div>
    </div>
  );
}
