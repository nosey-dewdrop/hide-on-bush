'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Event, Entry, User } from '@/lib/types';
import { db } from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';
import { formatDate, timeAgo, generateId } from '@/lib/utils';
import BackButton from '@/components/ui/BackButton';
import Avatar from '@/components/ui/Avatar';
import EntryList from '@/components/event/EntryList';
import EntryInput from '@/components/event/EntryInput';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    seedIfEmpty();
    const ev = db.getEvent(eventId);
    if (!ev) return;
    setEvent(ev);
    setEntries(db.getEntries(eventId));
    setUsers(db.getUsers());
    setReady(true);
  }, [eventId]);

  if (!ready || !event) return null;

  const author = users.find((u) => u.id === event.authorId);

  const handleSendEntry = (body: string) => {
    const newEntry: Entry = {
      id: generateId(),
      eventId: event.id,
      authorId: 'user-damla',
      body,
      parentEntryId: null,
      favCount: 0,
      favedByUserIds: [],
      createdAt: new Date().toISOString(),
    };
    db.createEntry(newEntry);
    setEntries(db.getEntries(event.id));
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '28px 32px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <BackButton label="board" onClick={() => router.push('/')} />

      {/* Header: emoji + title + tags + join */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '36px' }}>{event.emoji}</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            {event.title}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--muted)',
              fontWeight: 300,
            }}
          >
            {event.tags.map((t) => `#${t}`).join(' ')}
          </div>
        </div>
        <button
          className="font-[family-name:var(--font-ibm-plex-mono)]"
          style={{
            fontSize: '11px',
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: '3px',
            border: '1px solid var(--sky)',
            background: 'none',
            color: 'var(--dark)',
            cursor: 'pointer',
          }}
        >
          + join
        </button>
      </div>

      {/* Date, location, going */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px',
          padding: '14px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <span style={{ opacity: 0.6 }}>&#x1F4C5;</span>
          {formatDate(event.date)} &middot; {event.time}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <span style={{ opacity: 0.6 }}>&#x1F4CD;</span>
          {event.location}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <span style={{ opacity: 0.6 }}>&#x1F465;</span>
          {event.goingUserIds.length} going
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'var(--dark)',
          marginBottom: '24px',
        }}
      >
        {event.description}
      </div>

      {/* Author + pinned time */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {author && (
          <>
            <Avatar letter={author.avatarLetter} size="sm" className="!w-[20px] !h-[20px] !text-[9px]" />
            <span style={{ fontSize: '10px', fontWeight: 400 }}>{author.displayName}</span>
          </>
        )}
        <span style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: 300 }}>
          pinned {timeAgo(event.createdAt)}
        </span>
      </div>

      {/* Thread section */}
      <div
        style={{
          fontSize: '10px',
          fontWeight: 500,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '10px',
        }}
      >
        thread
      </div>

      <EntryList entries={entries} users={users} />
      <EntryInput onSend={handleSendEntry} />
    </div>
  );
}
