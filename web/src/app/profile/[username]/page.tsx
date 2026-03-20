'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { User, Event, Follow } from '@/lib/types';
import BackButton from '@/components/ui/BackButton';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pinnedEvents, setPinnedEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('lob_currentUser');
    const cu = stored ? JSON.parse(stored) : null;
    setCurrentUser(cu);

    const users = db.getUsers();
    const found = users.find((u) => u.username === username);
    if (!found) return;
    setUser(found);

    const events = db.getEvents();
    setPinnedEvents(events.filter((e) => e.authorId === found.id));
    setJoinedEvents(events.filter((e) => e.goingUserIds.includes(found.id)));

    const follows = db.getFollows(found.id);
    setFollowerCount(follows.filter((f: Follow) => f.followingId === found.id).length);
    setFollowingCount(follows.filter((f: Follow) => f.followerId === found.id).length);

    if (cu && cu.id !== found.id) {
      setIsFollowing(
        follows.some((f: Follow) => f.followerId === cu.id && f.followingId === found.id)
      );
    }
  }, [username]);

  function handleFollow() {
    if (!currentUser || !user) return;
    if (isFollowing) {
      db.deleteFollow(currentUser.id, user.id);
      setIsFollowing(false);
      setFollowerCount((c) => c - 1);
    } else {
      db.createFollow({
        followerId: currentUser.id,
        followingId: user.id,
        createdAt: new Date().toISOString(),
      });
      setIsFollowing(true);
      setFollowerCount((c) => c + 1);
    }
  }

  if (!user) {
    return (
      <div className="bg-white border border-[var(--border)] rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] max-w-[700px] mx-auto p-7">
        <BackButton label="board" onClick={() => router.push('/')} />
        <div className="text-[11px] text-[var(--muted)] font-light">user not found</div>
      </div>
    );
  }

  const isOwn = currentUser?.id === user.id;

  return (
    <div className="bg-white border border-[var(--border)] rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] max-w-[700px] mx-auto p-7">
      <BackButton label="board" onClick={() => router.push('/')} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar letter={user.avatarLetter} size="lg" className="rounded-[6px]" />
        <div className="flex-1">
          <div className="text-[16px] font-medium mb-[2px]">{user.displayName}</div>
          <div className="text-[11px] text-[var(--muted)] font-light">@{user.username}</div>
          {user.bio && (
            <div className="text-[11px] text-[var(--dark)] font-light mt-[6px] leading-[1.5]">
              {user.bio}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-5">
        {isOwn ? (
          <Button variant="secondary" onClick={() => router.push('/settings')}>
            settings
          </Button>
        ) : (
          <Button
            variant={isFollowing ? 'secondary' : 'primary'}
            onClick={handleFollow}
          >
            {isFollowing ? 'following' : 'follow'}
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-5 mb-6 py-[14px] border-t border-b border-[var(--border)]">
        <div className="text-center">
          <span className="text-[16px] font-medium block">{pinnedEvents.length}</span>
          <span className="text-[9px] text-[var(--muted)] font-light uppercase tracking-[0.06em]">pinned</span>
        </div>
        <div className="text-center">
          <span className="text-[16px] font-medium block">{joinedEvents.length}</span>
          <span className="text-[9px] text-[var(--muted)] font-light uppercase tracking-[0.06em]">joined</span>
        </div>
        <div className="text-center">
          <span className="text-[16px] font-medium block">{followerCount}</span>
          <span className="text-[9px] text-[var(--muted)] font-light uppercase tracking-[0.06em]">followers</span>
        </div>
        <div className="text-center">
          <span className="text-[16px] font-medium block">{followingCount}</span>
          <span className="text-[9px] text-[var(--muted)] font-light uppercase tracking-[0.06em]">following</span>
        </div>
      </div>

      {/* Attended */}
      <div className="bg-[var(--cream)] border border-[var(--border)] rounded p-3 px-4 mb-5">
        <div className="text-[12px] font-normal text-[var(--dark)]">
          attended: {user.attendedCount}
        </div>
      </div>

      {/* Pinned events */}
      <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.08em] mb-[10px]">
        pinned events
      </div>
      <div className="grid grid-cols-2 gap-[10px] mb-5">
        {pinnedEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-[var(--cream)] border border-[var(--border)] rounded p-[10px] px-3 cursor-pointer transition-all duration-200 hover:shadow-[0_2px_8px_rgba(135,206,235,0.12)]"
            onClick={() => router.push(`/event/${ev.id}`)}
          >
            <span className="text-[16px] mb-1 block">{ev.emoji}</span>
            <div className="text-[11px] font-medium">{ev.title}</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">
              {formatDate(ev.date)} {ev.time && `\u00b7 ${ev.time}`}
            </div>
          </div>
        ))}
        {pinnedEvents.length === 0 && (
          <div className="text-[10px] text-[var(--muted)] font-light col-span-2">no pinned events yet</div>
        )}
      </div>

      {/* Joined events */}
      <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.08em] mb-[10px]">
        joined events
      </div>
      <div className="grid grid-cols-2 gap-[10px]">
        {joinedEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-[var(--cream)] border border-[var(--border)] rounded p-[10px] px-3 cursor-pointer transition-all duration-200 hover:shadow-[0_2px_8px_rgba(135,206,235,0.12)]"
            onClick={() => router.push(`/event/${ev.id}`)}
          >
            <span className="text-[16px] mb-1 block">{ev.emoji}</span>
            <div className="text-[11px] font-medium">{ev.title}</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">
              {formatDate(ev.date)} {ev.time && `\u00b7 ${ev.time}`}
            </div>
          </div>
        ))}
        {joinedEvents.length === 0 && (
          <div className="text-[10px] text-[var(--muted)] font-light col-span-2">no joined events yet</div>
        )}
      </div>
    </div>
  );
}
