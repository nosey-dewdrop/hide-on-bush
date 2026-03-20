'use client';

import { Entry, User } from '@/lib/types';
import EntryItem from './EntryItem';

interface EntryListProps {
  entries: Entry[];
  users: User[];
}

export default function EntryList({ entries, users }: EntryListProps) {
  const userMap = new Map(users.map((u) => [u.id, u]));

  return (
    <div style={{ marginBottom: '16px' }}>
      {entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} author={userMap.get(entry.authorId)} />
      ))}
    </div>
  );
}
