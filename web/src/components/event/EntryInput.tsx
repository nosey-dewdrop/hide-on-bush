'use client';

import { useState } from 'react';

interface EntryInputProps {
  onSend: (body: string) => void;
}

export default function EntryInput({ onSend }: EntryInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        className="font-[family-name:var(--font-ibm-plex-mono)]"
        type="text"
        placeholder="write an entry..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
        style={{
          flex: 1,
          fontSize: '11px',
          fontWeight: 300,
          padding: '8px 12px',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          background: 'var(--cream)',
          color: 'var(--dark)',
          outline: 'none',
        }}
      />
      <button
        className="font-[family-name:var(--font-ibm-plex-mono)]"
        onClick={handleSend}
        style={{
          fontSize: '10px',
          fontWeight: 400,
          padding: '8px 14px',
          borderRadius: '3px',
          border: 'none',
          background: 'var(--sky)',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        send
      </button>
    </div>
  );
}
