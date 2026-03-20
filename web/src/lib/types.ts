// ============================================================================
// League of Bilkent - Type Definitions
// All interfaces and type aliases for the data layer.
// ============================================================================

// ── Type Aliases ──

export type PosterColor =
  | 'mint'
  | 'lavender'
  | 'peach'
  | 'sky'
  | 'butter'
  | 'coral'
  | 'sage'
  | 'rose';

export type PinType = 'pin' | 'tape' | 'tape-alt';

export type PinColor = 'red' | 'blue' | 'green' | 'yellow';

export type EventTag = 'music' | 'sports' | 'study' | 'arts' | 'food' | 'tech';

// ── Interfaces ──

export interface User {
  id: string;
  displayName: string;
  username: string;
  email: string;
  bio: string;
  avatarLetter: string;
  attendedCount: number;
  createdAt: string;
}

export interface Event {
  id: string;
  emoji: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  posterColor: PosterColor;
  pinType: PinType;
  pinColor: PinColor;
  authorId: string;
  goingUserIds: string[];
  displayDate?: string; // optional override for recurring events like "every tue & thu"
  createdAt: string;
}

export interface Entry {
  id: string;
  eventId: string;
  authorId: string;
  body: string;
  parentEntryId: string | null;
  favCount: number;
  favedByUserIds: string[];
  createdAt: string;
}

export interface Follow {
  followerId: string;
  followingId: string;
  createdAt: string;
}
