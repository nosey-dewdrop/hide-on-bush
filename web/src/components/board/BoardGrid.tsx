'use client';

import { Event, User } from '@/lib/types';
import PosterCard from './PosterCard';

interface BoardGridProps {
  events: Event[];
  users: User[];
}

export default function BoardGrid({ events, users }: BoardGridProps) {
  const userMap = new Map(users.map((u) => [u.id, u]));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
        gap: '22px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {events.map((event, index) => {
        const author = userMap.get(event.authorId);
        if (!author) return null;
        return <PosterCard key={event.id} event={event} index={index} author={author} />;
      })}
    </div>
  );
}
