'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { Event, EventTag } from '@/lib/types';
import BackButton from '@/components/ui/BackButton';

const DAY_LABELS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  study: { bg: '#e3f2fd', text: '#1565c0' },
  music: { bg: '#ede7f6', text: '#6a1b9a' },
  sports: { bg: '#e8f5e9', text: '#2e7d32' },
  arts: { bg: '#fce4ec', text: '#c62828' },
  food: { bg: '#fff8e1', text: '#f57f17' },
  tech: { bg: '#e8f5e9', text: '#2e7d32' },
};

function getTagStyle(tags: EventTag[]) {
  const first = tags[0];
  if (first && TAG_COLORS[first]) return TAG_COLORS[first];
  return { bg: '#e3f2fd', text: '#1565c0' };
}

export default function CalendarPage() {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(db.getEvents());
  }, []);

  function goToday() {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  function goPrev() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function goNext() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    // Monday = 0, Sunday = 6
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days: { day: number; month: number; year: number; isOther: boolean }[] = [];

    // Previous month fill
    for (let i = startDow - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = month === 0 ? 11 : month - 1;
      const y = month === 0 ? year - 1 : year;
      days.push({ day: d, month: m, year: y, isOther: true });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, month, year, isOther: false });
    }

    // Next month fill
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        const m = month === 11 ? 0 : month + 1;
        const y = month === 11 ? year + 1 : year;
        days.push({ day: d, month: m, year: y, isOther: true });
      }
    }

    return days;
  }, [year, month]);

  // Map events by date string
  const eventsByDate = useMemo(() => {
    const map: Record<string, Event[]> = {};
    events.forEach((ev) => {
      if (!ev.date) return;
      const d = new Date(ev.date);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, [events]);

  const today = new Date();
  const isToday = (day: number, m: number, y: number) =>
    day === today.getDate() && m === today.getMonth() && y === today.getFullYear();

  return (
    <div className="max-w-[1000px] mx-auto">
      <BackButton label="board" onClick={() => router.push('/')} />

      {/* Header */}
      <div className="flex items-center justify-between mb-[14px]">
        <span className="text-[13px] font-medium">
          {MONTHS[month]} {year}
        </span>
        <div className="flex gap-1">
          <button
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] py-1 px-[10px] border border-[var(--border)] rounded-[3px] bg-transparent text-[var(--muted)] cursor-pointer hover:border-[var(--sky)] hover:text-[var(--dark)] transition-all duration-200"
            onClick={goPrev}
          >
            &larr;
          </button>
          <button
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] py-1 px-[10px] border border-[var(--border)] rounded-[3px] bg-transparent text-[var(--muted)] cursor-pointer hover:border-[var(--sky)] hover:text-[var(--dark)] transition-all duration-200"
            onClick={goToday}
          >
            today
          </button>
          <button
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] py-1 px-[10px] border border-[var(--border)] rounded-[3px] bg-transparent text-[var(--muted)] cursor-pointer hover:border-[var(--sky)] hover:text-[var(--dark)] transition-all duration-200"
            onClick={goNext}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-7 gap-px border border-[var(--border)] rounded-[6px] overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        {/* Day labels */}
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="bg-[var(--cream)] p-2 text-center text-[9px] font-medium text-[var(--muted)] uppercase tracking-[0.06em]"
          >
            {label}
          </div>
        ))}

        {/* Days */}
        {calendarDays.map((cell, i) => {
          const key = `${cell.year}-${cell.month}-${cell.day}`;
          const dayEvents = eventsByDate[key] || [];
          const todayCell = isToday(cell.day, cell.month, cell.year);

          return (
            <div
              key={i}
              className={`bg-white p-[6px] min-h-[72px] ${
                cell.isOther ? 'bg-[var(--cream)]' : ''
              } ${todayCell ? '!bg-[var(--baby-light)]' : ''}`}
            >
              <div
                className={`text-[10px] mb-[3px] ${
                  todayCell
                    ? 'text-[var(--sky)] font-semibold'
                    : 'text-[var(--muted)]'
                }`}
              >
                {cell.day}
              </div>
              {dayEvents.map((ev) => {
                const style = getTagStyle(ev.tags);
                return (
                  <div
                    key={ev.id}
                    className="text-[8px] py-[2px] px-1 rounded-[2px] mb-[2px] font-normal cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis hover:opacity-70"
                    style={{ background: style.bg, color: style.text }}
                    onClick={() => router.push(`/event/${ev.id}`)}
                  >
                    {ev.emoji} {ev.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
