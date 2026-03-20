// ============================================================================
// League of Bilkent - Database Abstraction Layer
// TODO: Replace MockDatabase with real DB implementation (Supabase/Firebase)
// import { SupabaseDatabase } from './supabase-db';
// ============================================================================

import { User, Event, Entry, Follow } from './types';

// ── Database Interface ──

export interface IDatabase {
  // Users
  getUsers(): User[];
  getUser(id: string): User | undefined;
  createUser(user: User): User;
  updateUser(id: string, updates: Partial<User>): User | undefined;

  // Events
  getEvents(): Event[];
  getEvent(id: string): Event | undefined;
  createEvent(event: Event): Event;
  updateEvent(id: string, updates: Partial<Event>): Event | undefined;
  deleteEvent(id: string): boolean;

  // Entries (thread comments)
  getEntries(eventId: string): Entry[];
  createEntry(entry: Entry): Entry;
  updateEntry(id: string, updates: Partial<Entry>): Entry | undefined;

  // Follows
  getFollows(userId: string): Follow[];
  createFollow(follow: Follow): Follow;
  deleteFollow(followerId: string, followingId: string): boolean;
}

// ── Storage Keys ──

const STORAGE_KEYS = {
  USERS: 'lob_users',
  EVENTS: 'lob_events',
  ENTRIES: 'lob_entries',
  FOLLOWS: 'lob_follows',
} as const;

// ── MockDatabase Implementation ──

export class MockDatabase implements IDatabase {
  // ── Private Helpers ──

  private read<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  }

  private write<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ── Users ──

  getUsers(): User[] {
    return this.read<User>(STORAGE_KEYS.USERS);
  }

  getUser(id: string): User | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  createUser(user: User): User {
    const users = this.getUsers();
    users.push(user);
    this.write(STORAGE_KEYS.USERS, users);
    return user;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    users[index] = { ...users[index], ...updates };
    this.write(STORAGE_KEYS.USERS, users);
    return users[index];
  }

  // ── Events ──

  getEvents(): Event[] {
    return this.read<Event>(STORAGE_KEYS.EVENTS);
  }

  getEvent(id: string): Event | undefined {
    return this.getEvents().find((e) => e.id === id);
  }

  createEvent(event: Event): Event {
    const events = this.getEvents();
    events.push(event);
    this.write(STORAGE_KEYS.EVENTS, events);
    return event;
  }

  updateEvent(id: string, updates: Partial<Event>): Event | undefined {
    const events = this.getEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    events[index] = { ...events[index], ...updates };
    this.write(STORAGE_KEYS.EVENTS, events);
    return events[index];
  }

  deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const filtered = events.filter((e) => e.id !== id);
    if (filtered.length === events.length) return false;
    this.write(STORAGE_KEYS.EVENTS, filtered);
    return true;
  }

  // ── Entries ──

  getEntries(eventId: string): Entry[] {
    return this.read<Entry>(STORAGE_KEYS.ENTRIES).filter(
      (e) => e.eventId === eventId
    );
  }

  createEntry(entry: Entry): Entry {
    const entries = this.read<Entry>(STORAGE_KEYS.ENTRIES);
    entries.push(entry);
    this.write(STORAGE_KEYS.ENTRIES, entries);
    return entry;
  }

  updateEntry(id: string, updates: Partial<Entry>): Entry | undefined {
    const entries = this.read<Entry>(STORAGE_KEYS.ENTRIES);
    const index = entries.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    entries[index] = { ...entries[index], ...updates };
    this.write(STORAGE_KEYS.ENTRIES, entries);
    return entries[index];
  }

  // ── Follows ──

  getFollows(userId: string): Follow[] {
    return this.read<Follow>(STORAGE_KEYS.FOLLOWS).filter(
      (f) => f.followerId === userId || f.followingId === userId
    );
  }

  createFollow(follow: Follow): Follow {
    const follows = this.read<Follow>(STORAGE_KEYS.FOLLOWS);
    // Prevent duplicates
    const exists = follows.some(
      (f) =>
        f.followerId === follow.followerId &&
        f.followingId === follow.followingId
    );
    if (!exists) {
      follows.push(follow);
      this.write(STORAGE_KEYS.FOLLOWS, follows);
    }
    return follow;
  }

  deleteFollow(followerId: string, followingId: string): boolean {
    const follows = this.read<Follow>(STORAGE_KEYS.FOLLOWS);
    const filtered = follows.filter(
      (f) => !(f.followerId === followerId && f.followingId === followingId)
    );
    if (filtered.length === follows.length) return false;
    this.write(STORAGE_KEYS.FOLLOWS, filtered);
    return true;
  }
}

// ── Singleton Export ──

export const db: IDatabase = new MockDatabase();
// export const db: IDatabase = new SupabaseDatabase();
