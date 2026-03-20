'use client';

import { EventTag } from '@/lib/types';

type TagOption = EventTag | 'all';

const TAGS: TagOption[] = ['all', 'music', 'sports', 'study', 'arts', 'food', 'tech'];

interface TagBarProps {
  activeTag?: TagOption;
  onTagSelect?: (tag: TagOption) => void;
}

export default function TagBar({ activeTag = 'all', onTagSelect }: TagBarProps) {
  return (
    <div className="flex gap-1 mb-[18px] flex-wrap">
      {TAGS.map((tag) => (
        <button
          key={tag}
          className={`font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-light py-[3px] px-2 border-none rounded-[3px] bg-transparent text-[var(--muted)] cursor-pointer transition-all duration-150 hover:text-[var(--dark)] hover:bg-[var(--baby-light)] ${
            activeTag === tag
              ? 'text-[var(--dark)] bg-[var(--baby-light)] font-normal'
              : ''
          }`}
          onClick={() => onTagSelect?.(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
