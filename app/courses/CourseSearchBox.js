'use client';

import { useState } from 'react';

export default function CourseSearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const search = async e => {
    e.preventDefault();
    setError('');
    setSearched(true);
    try {
      const res = await fetch('/api/courses/search?q=' + encodeURIComponent(query));
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setError(data.error || 'Search failed.');
        setResults([]);
      }
    } catch {
      setError('Search failed.');
      setResults([]);
    }
  };

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <h3>Search Courses</h3>
      <p style={{ color: '#7a8599', fontSize: 13 }}>Find courses by code, title, or instructor.</p>
      <form onSubmit={search} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. CS, Security, Dr. Williams..."
          style={{ flex: 1, padding: '8px 12px' }}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {error && <p style={{ color: '#721c24', marginTop: 10 }}>{error}</p>}
      {searched && results.length === 0 && !error && (
        <p style={{ color: '#7a8599', marginTop: 10 }}>No courses found.</p>
      )}
      {results.length > 0 && (
        <table style={{ marginTop: 14 }}>
          <thead><tr><th>Code</th><th>Title</th><th>Instructor</th><th>Credits</th><th>Schedule</th></tr></thead>
          <tbody>
            {results.map(c => (
              <tr key={c.id}>
                <td><strong>{c.code}</strong></td>
                <td>{c.title}</td>
                <td>{c.instructor}</td>
                <td>{c.credits}</td>
                <td>{c.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
