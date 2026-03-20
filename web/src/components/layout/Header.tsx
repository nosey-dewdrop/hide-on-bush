'use client';

import SearchBox from '@/components/ui/SearchBox';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCalendarToggle?: () => void;
  onCreatePin?: () => void;
  onAvatarClick?: () => void;
  calendarActive?: boolean;
  userLetter?: string;
}

export default function Header({
  onSearch,
  onCalendarToggle,
  onCreatePin,
  onAvatarClick,
  calendarActive = false,
  userLetter = 'D',
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-7">
      <span className="text-[15px] font-medium text-[var(--dark)]">
        <em className="not-italic text-[var(--sky)]">league</em> of bilkent
      </span>

      <SearchBox onChange={(e) => onSearch?.(e.currentTarget.value)} />

      <div className="flex items-center gap-[10px]">
        <button
          className={`font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-light py-[5px] px-[10px] border border-[var(--border)] rounded-[3px] bg-transparent text-[var(--muted)] cursor-pointer transition-all duration-200 hover:border-[var(--sky)] hover:text-[var(--dark)] ${
            calendarActive ? 'bg-[var(--baby-light)] text-[var(--dark)]' : ''
          }`}
          onClick={onCalendarToggle}
        >
          calendar
        </button>

        <Button variant="pin" onClick={onCreatePin}>
          + pin
        </Button>

        <Avatar letter={userLetter} size="md" onClick={onAvatarClick} />
      </div>
    </div>
  );
}
