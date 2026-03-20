'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Event, User } from '@/lib/types';
import { formatDate, getRotation, timeAgo } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';

interface PosterCardProps {
  event: Event;
  index: number;
  author: User;
}

export default function PosterCard({ event, index, author }: PosterCardProps) {
  const router = useRouter();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPinned(true), index * 350);
    return () => clearTimeout(timer);
  }, [index]);

  const rotation = getRotation(index);
  const isNew =
    Date.now() - new Date(event.createdAt).getTime() < 1000 * 60 * 60 * 6;

  const pinColorVar =
    event.pinColor === 'red'
      ? 'var(--pin-red)'
      : event.pinColor === 'blue'
        ? 'var(--pin-blue)'
        : event.pinColor === 'green'
          ? 'var(--pin-green)'
          : 'var(--pin-yellow)';

  return (
    <div
      className={`poster poster-color-${event.posterColor} ${pinned ? 'pinned' : ''}`}
      style={{ '--rot': `${rotation}deg` } as React.CSSProperties}
      onClick={() => router.push(`/event/${event.id}`)}
    >
      {/* Attachment */}
      {event.pinType === 'pin' && (
        <div
          className="pin"
          style={
            {
              position: 'absolute',
              top: '-7px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
              '--pin-color': pinColorVar,
            } as React.CSSProperties
          }
        />
      )}
      {event.pinType === 'tape' && <div className="tape" />}
      {event.pinType === 'tape-alt' && <div className="tape tape-alt" />}

      {/* Just pinned badge */}
      {isNew && <span className="just-pinned-badge">just pinned!</span>}

      {/* Card */}
      <div className="poster-card">
        <div className="poster-header" style={{ padding: '16px 14px 10px' }}>
          <span style={{ fontSize: '22px', marginBottom: '6px', display: 'block' }}>
            {event.emoji}
          </span>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#1a1a1a',
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
            {event.tags.map((tag) => (
              <span
                key={tag}
                style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(0,0,0,0.4)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ padding: '0 14px 14px', fontSize: '10px', color: '#555' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 300 }}>
              <span style={{ fontSize: '10px', opacity: 0.6 }}>&#x1F4C5;</span>{' '}
              {formatDate(event.date)} &middot; {event.time}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 300 }}>
              <span style={{ fontSize: '10px', opacity: 0.6 }}>&#x1F4CD;</span> {event.location}
            </div>
          </div>
          <div
            style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontWeight: 500, color: 'var(--dark)', fontSize: '10px' }}>
              {event.goingUserIds.length} going
            </span>
            <button
              className="font-[family-name:var(--font-ibm-plex-mono)]"
              style={{
                fontSize: '9px',
                fontWeight: 500,
                padding: '3px 8px',
                borderRadius: '3px',
                border: '1px solid var(--sky)',
                background: 'none',
                color: 'var(--dark)',
                cursor: 'pointer',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              + join
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '8px',
              fontSize: '9px',
              color: '#888',
              fontWeight: 300,
            }}
          >
            <Avatar letter={author.avatarLetter} size="sm" />
            {author.displayName}
          </div>
        </div>
      </div>
    </div>
  );
}
