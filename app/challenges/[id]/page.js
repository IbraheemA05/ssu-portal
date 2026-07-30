'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ChallengeDetailPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/challenges')
      .then(r => r.json())
      .then(list => {
        const c = list.find(x => x.id === id);
        if (c) {
          setChallenge(c);
          setCompleted(c.completed);
        }
      })
      .catch(() => {});
  }, [id]);

  const submitFlag = async () => {
    setMessage('');
    const res = await fetch('/api/submit-flag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeId: id, flag: flagInput.trim() }),
    });
    const data = await res.json();
    if (data.correct) {
      setCompleted(true);
      setMessage('Correct! Challenge completed.');
    } else {
      setMessage(data.error || 'Incorrect flag. Try again.');
    }
  };

  if (!challenge) {
    return (
      <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <p>Challenge not found.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 40, maxWidth: 700 }}>
      <p><a href="/challenges" style={{ color: '#7a8599' }}>&larr; Back to Challenges</a></p>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888',
          }}>{challenge.category}</span>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
            background: challenge.difficulty === 'Easy' ? '#d4edda' : '#fff3cd',
            color: challenge.difficulty === 'Easy' ? '#155724' : '#856404',
          }}>{challenge.difficulty}</span>
        </div>
        <h1 style={{ margin: '0 0 4px' }}>
          {challenge.title}
          {completed && <span style={{ marginLeft: 10, fontSize: 16, color: '#2ecc71' }}>&#10003;</span>}
        </h1>

        <p style={{ lineHeight: 1.6, color: '#333', marginTop: 16 }}>{challenge.description}</p>

        <div style={{ marginTop: 20 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setRevealedHints(prev => Math.min(prev + 1, challenge.hints.length))}
            style={{ marginBottom: 8 }}
          >
            Reveal Hint {revealedHints < challenge.hints.length ? (revealedHints + 1) + '/' + challenge.hints.length : '(all shown)'}
          </button>
          {challenge.hints.slice(0, revealedHints).map((hint, i) => (
            <div key={i} style={{
              padding: '8px 12px', marginTop: 6, background: '#fff8e1', borderRadius: 6,
              borderLeft: '3px solid #f0c040', fontSize: 14,
            }}>
              <strong>Hint {i + 1}:</strong> {hint}
            </div>
          ))}
        </div>

        <div className="card card-accent" style={{ marginTop: 24 }}>
          <h3>Submit Flag</h3>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input
              type="text"
              value={flagInput}
              onChange={e => setFlagInput(e.target.value)}
              placeholder="Enter flag..."
              style={{ flex: 1, padding: '8px 12px', fontFamily: 'monospace', fontSize: 14 }}
            />
            <button className="btn btn-primary" onClick={submitFlag}>Submit</button>
          </div>
          {message && (
            <p style={{
              marginTop: 10, fontWeight: 600,
              color: message.includes('Correct') ? '#155724' : '#721c24',
            }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
