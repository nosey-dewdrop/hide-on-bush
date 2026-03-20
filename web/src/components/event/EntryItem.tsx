'use client';

import { useState } from 'react';
import { Entry, User } from '@/lib/types';
import { timeAgo } from '@/lib/utils';

interface EntryItemProps {
  entry: Entry;
  author: User | undefined;
}

export default function EntryItem({ entry, author }: EntryItemProps) {
  const [faved, setFaved] = useState(false);
  const favDisplay = faved ? entry.favCount + 1 : entry.favCount;

  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'var(--dark)',
        }}
      >
        {entry.body}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px',
          fontSize: '9px',
          color: 'var(--muted)',
          fontWeight: 300,
        }}
      >
        <span style={{ fontWeight: 400, color: 'var(--dark)' }}>
          {author?.displayName ?? 'unknown'}
        </span>
        <span>&middot;</span>
        <span>{timeAgo(entry.createdAt)}</span>
        <span>&middot;</span>
        <span style={{ cursor: 'pointer' }}>reply</span>
        <span>&middot;</span>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setFaved(!faved)}
        >
          {favDisplay > 0 ? `fav (${favDisplay})` : 'fav'}
        </span>
      </div>
    </div>
  );
}
