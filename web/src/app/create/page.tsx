'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { EventTag, PosterColor, PinType, PinColor } from '@/lib/types';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';

const EMOJIS = ['📚', '🎷', '⚽', '📸', '🗣️', '🍳', '💻', '🧘', '🎨', '🎮', '🎤', '🏃'];

const TAGS: EventTag[] = ['music', 'sports', 'study', 'arts', 'food', 'tech'];

const POSTER_COLORS: { color: PosterColor; hex: string }[] = [
  { color: 'sky', hex: '#e3f2fd' },
  { color: 'lavender', hex: '#ede7f6' },
  { color: 'peach', hex: '#fce4ec' },
  { color: 'mint', hex: '#e8f5e9' },
  { color: 'butter', hex: '#fff8e1' },
  { color: 'coral', hex: '#fbe9e7' },
];

const PIN_TYPES: PinType[] = ['pin', 'tape', 'tape-alt'];
const PIN_COLORS: PinColor[] = ['red', 'blue', 'green', 'yellow'];

export default function CreatePage() {
  const router = useRouter();
  const [emoji, setEmoji] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState<EventTag[]>([]);
  const [posterColor, setPosterColor] = useState<PosterColor>('sky');

  const inputClass =
    'font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-light py-2 px-3 border border-[var(--border)] rounded bg-[var(--cream)] outline-none focus:border-[var(--sky)] w-full transition-[border-color] duration-200 text-[var(--dark)]';

  function toggleTag(tag: EventTag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSubmit() {
    if (!title.trim()) return;

    const currentUser = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('lob_currentUser') || 'null')
      : null;

    const pinType = PIN_TYPES[Math.floor(Math.random() * PIN_TYPES.length)];
    const pinColor = PIN_COLORS[Math.floor(Math.random() * PIN_COLORS.length)];

    db.createEvent({
      id: generateId(),
      emoji: emoji || '📌',
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim(),
      tags: selectedTags,
      posterColor,
      pinType,
      pinColor,
      authorId: currentUser?.id || '',
      goingUserIds: [],
      createdAt: new Date().toISOString(),
    });

    router.push('/');
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] max-w-[700px] mx-auto p-7">
      <BackButton label="board" onClick={() => router.push('/')} />

      <div className="text-[14px] font-medium mb-5 pb-[10px] border-b border-[var(--border)]">
        pin a new event
      </div>

      {/* Emoji picker */}
      <div className="mb-4">
        <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">emoji</label>
        <div className="flex gap-[6px] flex-wrap">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              className={`text-[20px] p-1 cursor-pointer rounded border-2 transition-all duration-150 bg-transparent ${
                emoji === e
                  ? 'border-[var(--sky)] bg-[var(--baby-light)]'
                  : 'border-transparent'
              } hover:bg-[var(--baby-light)]`}
              onClick={() => setEmoji(e)}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">title</label>
        <input
          type="text"
          className={inputClass}
          placeholder="event name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">description</label>
        <textarea
          className={`${inputClass} resize-y min-h-[80px]`}
          placeholder="what's it about..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Date + Time */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">date</label>
          <input
            type="date"
            className={inputClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">time</label>
          <input
            type="time"
            className={inputClass}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">location</label>
        <input
          type="text"
          className={inputClass}
          placeholder="where..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">tags</label>
        <div className="flex gap-[6px] flex-wrap">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-light py-[3px] px-2 rounded-[3px] border cursor-pointer transition-all duration-150 ${
                selectedTags.includes(tag)
                  ? 'bg-[var(--baby-light)] border-[var(--sky)] text-[var(--dark)] font-normal'
                  : 'bg-transparent border-[var(--border)] text-[var(--muted)]'
              } hover:border-[var(--sky)] hover:text-[var(--dark)]`}
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Poster color */}
      <div className="mb-4">
        <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">poster color</label>
        <div className="flex gap-[6px] flex-wrap">
          {POSTER_COLORS.map(({ color, hex }) => (
            <button
              key={color}
              type="button"
              className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-150 ${
                posterColor === color ? 'border-[var(--sky)]' : 'border-transparent'
              }`}
              style={{ background: hex }}
              onClick={() => setPosterColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button variant="primary" className="mt-2" onClick={handleSubmit}>
        pin to board
      </Button>
    </div>
  );
}
