// ============================================================================
// League of Bilkent - Utility Functions
// Pure helper functions used across the application.
// ============================================================================

import { PosterColor, PinColor } from './types';

/**
 * Generates a random unique ID string.
 * Uses crypto API when available, falls back to Math.random.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

/**
 * Returns a human-readable relative time string (e.g. "2h ago", "3d ago").
 * Accepts an ISO date string.
 */
export function timeAgo(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${weeks}w ago`;
}

/**
 * Formats an ISO date string into a short display format.
 * Example: "2026-03-22" -> "mar 22"
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  const months = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

/**
 * Returns a slight rotation in degrees for poster cards on the cork board.
 * Creates a natural, hand-pinned look by cycling through preset angles.
 */
export function getRotation(index: number): number {
  const rotations = [-2, 1.5, -1, 2.5, -0.5, 1.8, -1.5, 0.8];
  return rotations[index % rotations.length];
}

/**
 * Maps a PosterColor name to its CSS hex background value.
 */
export function getPosterColorHex(color: PosterColor): string {
  const map: Record<PosterColor, string> = {
    mint: '#e8f5e9',
    lavender: '#ede7f6',
    peach: '#fce4ec',
    sky: '#e3f2fd',
    butter: '#fff8e1',
    coral: '#fbe9e7',
    sage: '#e8f5e9',
    rose: '#fce4ec',
  };
  return map[color];
}

/**
 * Maps a PinColor name to its CSS hex value.
 */
export function getPinColorHex(color: PinColor): string {
  const map: Record<PinColor, string> = {
    red: '#d94040',
    blue: '#4078d9',
    green: '#3ba55d',
    yellow: '#e8a825',
  };
  return map[color];
}
