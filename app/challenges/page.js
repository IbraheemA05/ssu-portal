'use client';

import { useState, useEffect } from 'react';

const categoryColors = {
  Reconnaissance: '#4a90d9',
  IDOR: '#e67e22',
  Authentication: '#9b59b6',
  'Broken Access Control': '#e74c3c',
  Misc: '#2ecc71',
};

const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/challenges')
      .then(r => r.json())
      .then(d => setChallenges(d))
      .catch(() => {});
  }, []);

  const filtered = filter === 'all'
    ? challenges
    : filter === 'completed'
    ? challenges.filter(c => c.completed)
    : challenges.filter(c => !c.completed);

  const sorted = [...filtered].sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40 }}>
      <h1>Security Challenges</h1>
      <p style={{ color: '#7a8599', marginBottom: 20 }}>
        Complete challenges by finding hidden flags across the university portal.
        {challenges.length > 0 && (
          <span> Found <strong>{challenges.filter(c => c.completed).length}</strong>/{challenges.length}</span>
        )}
      </p>

      <div className="card" style={{ marginBottom: 20, padding: '12px 16px' }}>
        <label style={{ fontWeight: 600, marginRight: 10 }}>Show:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '4px 8px' }}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="grid-2">
        {sorted.map(c => (
          <a
            key={c.id}
            href={'/challenges/' + c.id}
            className="card"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              borderLeft: '4px solid ' + (c.completed ? '#2ecc71' : categoryColors[c.category] || '#ccc'),
              opacity: c.completed ? 0.7 : 1,
              display: 'block',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                color: categoryColors[c.category] || '#888',
              }}>{c.category}</span>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                background: c.difficulty === 'Easy' ? '#d4edda' : c.difficulty === 'Medium' ? '#fff3cd' : '#f8d7da',
                color: c.difficulty === 'Easy' ? '#155724' : c.difficulty === 'Medium' ? '#856404' : '#721c24',
              }}>{c.difficulty}</span>
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: 18 }}>
              {c.title}
              {c.completed && <span style={{ marginLeft: 8 }}>&#10003;</span>}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: '#7a8599' }}>{c.description}</p>
          </a>
        ))}
      </div>

      <style>{`
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
