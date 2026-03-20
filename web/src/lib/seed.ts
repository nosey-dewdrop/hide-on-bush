// ============================================================================
// League of Bilkent - Seed Data
// Populates localStorage with realistic Bilkent campus data on first run.
// ============================================================================

import { User, Event, Entry, Follow } from './types';
import { db } from './db';

// ── Users ──

const users: User[] = [
  {
    id: 'user-damla',
    displayName: 'damla',
    username: 'damla',
    email: 'damla@bilkent.edu.tr',
    bio: 'cs student at bilkent. last ai bender. building things.',
    avatarLetter: 'D',
    attendedCount: 14,
    createdAt: '2025-09-01T10:00:00.000Z',
  },
  {
    id: 'user-ali',
    displayName: 'ali',
    username: 'ali',
    email: 'ali@bilkent.edu.tr',
    bio: 'algorithms nerd. ta for cs201. coffee addict.',
    avatarLetter: 'A',
    attendedCount: 22,
    createdAt: '2025-09-02T11:00:00.000Z',
  },
  {
    id: 'user-ece',
    displayName: 'ece',
    username: 'ece',
    email: 'ece@bilkent.edu.tr',
    bio: 'music club president. jazz is life.',
    avatarLetter: 'E',
    attendedCount: 31,
    createdAt: '2025-09-03T09:00:00.000Z',
  },
  {
    id: 'user-kerem',
    displayName: 'kerem',
    username: 'kerem',
    email: 'kerem@bilkent.edu.tr',
    bio: 'ee major. football captain. film photography on weekends.',
    avatarLetter: 'K',
    attendedCount: 18,
    createdAt: '2025-09-04T08:00:00.000Z',
  },
  {
    id: 'user-mert',
    displayName: 'mert',
    username: 'mert',
    email: 'mert@bilkent.edu.tr',
    bio: 'poli sci. debate club. opinions are my sport.',
    avatarLetter: 'M',
    attendedCount: 9,
    createdAt: '2025-09-05T12:00:00.000Z',
  },
  {
    id: 'user-selin',
    displayName: 'selin',
    username: 'selin',
    email: 'selin@bilkent.edu.tr',
    bio: 'molecular bio. feeds the whole dorm. pastry queen.',
    avatarLetter: 'S',
    attendedCount: 11,
    createdAt: '2025-09-06T14:00:00.000Z',
  },
  {
    id: 'user-berk',
    displayName: 'berk',
    username: 'berk',
    email: 'berk@bilkent.edu.tr',
    bio: 'cs102 survivor. hackathon organizer. builds weird stuff.',
    avatarLetter: 'B',
    attendedCount: 27,
    createdAt: '2025-09-07T15:00:00.000Z',
  },
  {
    id: 'user-zeynep',
    displayName: 'zeynep',
    username: 'zeynep',
    email: 'zeynep@bilkent.edu.tr',
    bio: 'psych major. yoga instructor. morning person somehow.',
    avatarLetter: 'Z',
    attendedCount: 20,
    createdAt: '2025-09-08T07:00:00.000Z',
  },
];

// ── Events (matching mock.html) ──

const events: Event[] = [
  {
    id: 'event-algorithms',
    emoji: '\u{1F4DA}',
    title: 'Algorithms Study Group',
    description:
      'weekly study session for cs202. we go through problem sets together and discuss approaches. all levels welcome, bring your laptop.',
    date: '2026-03-22',
    time: '14:00',
    location: 'EA-409',
    tags: ['study'],
    posterColor: 'sky',
    pinType: 'pin',
    pinColor: 'blue',
    authorId: 'user-ali',
    goingUserIds: ['user-ali', 'user-damla', 'user-berk', 'user-mert'],
    createdAt: '2026-03-18T09:00:00.000Z',
  },
  {
    id: 'event-jazz',
    emoji: '\u{1F3B7}',
    title: 'Jazz Night',
    description:
      'live jazz performance at the student center. featuring the bilkent jazz ensemble and guest musicians. free entry, drinks available.',
    date: '2026-03-24',
    time: '20:00',
    location: 'Student Center',
    tags: ['music'],
    posterColor: 'lavender',
    pinType: 'tape',
    pinColor: 'yellow',
    authorId: 'user-ece',
    goingUserIds: ['user-ece', 'user-damla', 'user-zeynep', 'user-selin', 'user-kerem'],
    createdAt: '2026-03-17T16:00:00.000Z',
  },
  {
    id: 'event-football',
    emoji: '\u26BD',
    title: 'Football Tournament',
    description:
      'inter-department 5-a-side tournament. sign up as a team or individually and we will match you. trophies for top 3.',
    date: '2026-03-28',
    time: '16:00',
    location: 'Main Field',
    tags: ['sports'],
    posterColor: 'mint',
    pinType: 'pin',
    pinColor: 'green',
    authorId: 'user-kerem',
    goingUserIds: ['user-kerem', 'user-ali', 'user-berk', 'user-mert', 'user-damla'],
    createdAt: '2026-03-16T10:00:00.000Z',
  },
  {
    id: 'event-photo',
    emoji: '\u{1F4F8}',
    title: 'Photography Walk',
    description:
      'meet at the main gate and we will walk around campus capturing spring vibes. bring any camera, phone is fine too. we will share a google photos album after.',
    date: '2026-03-30',
    time: '10:00',
    location: 'Main Gate',
    tags: ['arts'],
    posterColor: 'peach',
    pinType: 'pin',
    pinColor: 'yellow',
    authorId: 'user-damla',
    goingUserIds: ['user-damla', 'user-ece', 'user-kerem'],
    createdAt: '2026-03-20T08:00:00.000Z',
  },
  {
    id: 'event-debate',
    emoji: '\u{1F5E3}\uFE0F',
    title: 'Debate Club',
    description:
      'this week topic: should ai-generated art be eligible for competitions? come prepared with arguments for either side.',
    date: '2026-03-25',
    time: '18:00',
    location: 'G-101',
    tags: ['study'],
    posterColor: 'coral',
    pinType: 'tape-alt',
    pinColor: 'blue',
    authorId: 'user-mert',
    goingUserIds: ['user-mert', 'user-ali', 'user-damla', 'user-ece'],
    createdAt: '2026-03-15T14:00:00.000Z',
  },
  {
    id: 'event-cooking',
    emoji: '\u{1F373}',
    title: 'Cooking Workshop',
    description:
      'learn to make proper menemen and simit at home. all ingredients provided. limited to 15 spots so sign up early.',
    date: '2026-04-01',
    time: '15:00',
    location: 'Dorm 76 Kitchen',
    tags: ['food'],
    posterColor: 'butter',
    pinType: 'pin',
    pinColor: 'red',
    authorId: 'user-selin',
    goingUserIds: ['user-selin', 'user-zeynep', 'user-damla'],
    createdAt: '2026-03-19T11:00:00.000Z',
  },
  {
    id: 'event-hackathon',
    emoji: '\u{1F4BB}',
    title: 'Spring Hackathon 2026',
    description:
      '24-hour hackathon. theme announced at kickoff. teams of 2-4. prizes from bilkent cs department and sponsors. food and energy drinks provided.',
    date: '2026-04-05',
    time: '09:00',
    location: 'EE Building',
    tags: ['tech'],
    posterColor: 'sage',
    pinType: 'pin',
    pinColor: 'blue',
    authorId: 'user-berk',
    goingUserIds: ['user-berk', 'user-ali', 'user-damla', 'user-kerem', 'user-mert', 'user-ece'],
    createdAt: '2026-03-14T09:00:00.000Z',
  },
  {
    id: 'event-yoga',
    emoji: '\u{1F9D8}',
    title: 'Morning Yoga',
    description:
      'sunrise yoga sessions every tuesday and thursday. no experience needed. mats provided but bring your own if you have one. rain location: gym lobby.',
    date: '2026-03-25',
    time: '07:30',
    location: 'East Garden',
    tags: ['sports'],
    posterColor: 'rose',
    pinType: 'tape',
    pinColor: 'green',
    authorId: 'user-zeynep',
    goingUserIds: ['user-zeynep', 'user-damla', 'user-selin', 'user-ece'],
    createdAt: '2026-03-10T06:00:00.000Z',
  },
];

// ── Entries (thread comments) ──

const entries: Entry[] = [
  // Photography Walk thread
  {
    id: 'entry-1',
    eventId: 'event-photo',
    authorId: 'user-ece',
    body: 'can we also stop by the library garden? the light there is amazing in the morning',
    parentEntryId: null,
    favCount: 2,
    favedByUserIds: ['user-damla', 'user-kerem'],
    createdAt: '2026-03-20T09:00:00.000Z',
  },
  {
    id: 'entry-2',
    eventId: 'event-photo',
    authorId: 'user-kerem',
    body: 'i will bring my film camera too. should i bring extra rolls for anyone?',
    parentEntryId: null,
    favCount: 1,
    favedByUserIds: ['user-damla'],
    createdAt: '2026-03-20T09:30:00.000Z',
  },
  {
    id: 'entry-3',
    eventId: 'event-photo',
    authorId: 'user-damla',
    body: 'yes library garden is on the route! and kerem yes please bring extra film',
    parentEntryId: null,
    favCount: 0,
    favedByUserIds: [],
    createdAt: '2026-03-20T09:50:00.000Z',
  },
  // Algorithms Study Group thread
  {
    id: 'entry-4',
    eventId: 'event-algorithms',
    authorId: 'user-berk',
    body: 'are we covering dynamic programming this week? i need help with the knapsack variants',
    parentEntryId: null,
    favCount: 3,
    favedByUserIds: ['user-ali', 'user-damla', 'user-mert'],
    createdAt: '2026-03-19T20:00:00.000Z',
  },
  {
    id: 'entry-5',
    eventId: 'event-algorithms',
    authorId: 'user-ali',
    body: 'yes dp is the main topic. i prepared some examples from leetcode too',
    parentEntryId: 'entry-4',
    favCount: 1,
    favedByUserIds: ['user-berk'],
    createdAt: '2026-03-19T20:30:00.000Z',
  },
  // Jazz Night thread
  {
    id: 'entry-6',
    eventId: 'event-jazz',
    authorId: 'user-damla',
    body: 'will there be a vocalist this time? last month was instrumental only',
    parentEntryId: null,
    favCount: 2,
    favedByUserIds: ['user-ece', 'user-selin'],
    createdAt: '2026-03-18T15:00:00.000Z',
  },
  {
    id: 'entry-7',
    eventId: 'event-jazz',
    authorId: 'user-ece',
    body: 'yes! we have a guest vocalist from ankara jazz collective this time',
    parentEntryId: 'entry-6',
    favCount: 4,
    favedByUserIds: ['user-damla', 'user-selin', 'user-zeynep', 'user-kerem'],
    createdAt: '2026-03-18T15:20:00.000Z',
  },
  // Hackathon thread
  {
    id: 'entry-8',
    eventId: 'event-hackathon',
    authorId: 'user-ali',
    body: 'anyone looking for a teammate? i am strong on backend and ml',
    parentEntryId: null,
    favCount: 2,
    favedByUserIds: ['user-damla', 'user-kerem'],
    createdAt: '2026-03-17T10:00:00.000Z',
  },
  {
    id: 'entry-9',
    eventId: 'event-hackathon',
    authorId: 'user-damla',
    body: 'ali let us team up! i can handle frontend and design',
    parentEntryId: 'entry-8',
    favCount: 1,
    favedByUserIds: ['user-ali'],
    createdAt: '2026-03-17T10:30:00.000Z',
  },
];

// ── Follows ──

const follows: Follow[] = [
  { followerId: 'user-damla', followingId: 'user-ece', createdAt: '2025-10-01T10:00:00.000Z' },
  { followerId: 'user-damla', followingId: 'user-ali', createdAt: '2025-10-02T10:00:00.000Z' },
  { followerId: 'user-damla', followingId: 'user-kerem', createdAt: '2025-10-03T10:00:00.000Z' },
  { followerId: 'user-damla', followingId: 'user-berk', createdAt: '2025-10-04T10:00:00.000Z' },
  { followerId: 'user-damla', followingId: 'user-zeynep', createdAt: '2025-10-05T10:00:00.000Z' },
  { followerId: 'user-ece', followingId: 'user-damla', createdAt: '2025-10-06T10:00:00.000Z' },
  { followerId: 'user-ali', followingId: 'user-damla', createdAt: '2025-10-07T10:00:00.000Z' },
  { followerId: 'user-kerem', followingId: 'user-damla', createdAt: '2025-10-08T10:00:00.000Z' },
  { followerId: 'user-berk', followingId: 'user-damla', createdAt: '2025-10-09T10:00:00.000Z' },
  { followerId: 'user-berk', followingId: 'user-ali', createdAt: '2025-10-10T10:00:00.000Z' },
  { followerId: 'user-zeynep', followingId: 'user-selin', createdAt: '2025-10-11T10:00:00.000Z' },
  { followerId: 'user-selin', followingId: 'user-zeynep', createdAt: '2025-10-12T10:00:00.000Z' },
  { followerId: 'user-mert', followingId: 'user-ali', createdAt: '2025-10-13T10:00:00.000Z' },
  { followerId: 'user-ece', followingId: 'user-zeynep', createdAt: '2025-10-14T10:00:00.000Z' },
  { followerId: 'user-ali', followingId: 'user-berk', createdAt: '2025-10-15T10:00:00.000Z' },
  { followerId: 'user-kerem', followingId: 'user-ece', createdAt: '2025-10-16T10:00:00.000Z' },
];

// ── Seed Function ──

/**
 * Seeds localStorage with initial data if no data exists yet.
 * Call this once on app startup (e.g. in a layout or provider).
 */
export function seedIfEmpty(): void {
  if (typeof window === 'undefined') return;

  const existingUsers = localStorage.getItem('lob_users');
  if (existingUsers && JSON.parse(existingUsers).length > 0) return;

  // Seed all data
  users.forEach((user) => db.createUser(user));
  events.forEach((event) => db.createEvent(event));
  entries.forEach((entry) => db.createEntry(entry));
  follows.forEach((follow) => db.createFollow(follow));
}
