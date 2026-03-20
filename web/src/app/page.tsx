'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Event, EventTag, User } from '@/lib/types';
import { db } from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';
import Header from '@/components/layout/Header';
import TagBar from '@/components/layout/TagBar';
import CorkSurface from '@/components/board/CorkSurface';
import BoardGrid from '@/components/board/BoardGrid';

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTag, setActiveTag] = useState<EventTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    seedIfEmpty();
    const loadedEvents = db.getEvents();
    const loadedUsers = db.getUsers();
    console.log('[LOB] events:', loadedEvents.length, 'users:', loadedUsers.length);
    setEvents(loadedEvents);
    setUsers(loadedUsers);
    setReady(true);
  }, []);

  const filtered = events.filter((e) => {
    const matchesTag = activeTag === 'all' || e.tags.includes(activeTag);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q));
    return matchesTag && matchesSearch;
  });

  if (!ready) return null;

  return (
    <>
      <Header
        onSearch={(q) => setSearchQuery(q)}
        onCalendarToggle={() => router.push('/calendar')}
        onCreatePin={() => router.push('/create')}
        onAvatarClick={() => router.push('/profile/damla')}
      />
      <TagBar
        activeTag={activeTag as EventTag}
        onTagSelect={(tag) => setActiveTag(tag)}
      />
      <CorkSurface>
        <BoardGrid events={filtered} users={users} />
      </CorkSurface>
    </>
  );
}
