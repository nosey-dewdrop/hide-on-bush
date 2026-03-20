'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';

const SETTINGS_KEY = 'lob_settings';

interface Settings {
  notifyFollowedEvents: boolean;
  notifyReminders: boolean;
  notifyThreadReplies: boolean;
  notifyNewFollowers: boolean;
  darkMode: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  notifyFollowedEvents: true,
  notifyReminders: true,
  notifyThreadReplies: true,
  notifyNewFollowers: false,
  darkMode: false,
};

function loadSettings(): Settings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(s: Settings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem('lob_currentUser');
    if (stored) setUser(JSON.parse(stored));
    setSettings(loadSettings());
  }, []);

  function update(key: keyof Settings, value: boolean) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  }

  function handleLogout() {
    localStorage.removeItem('lob_currentUser');
    router.push('/login');
  }

  function handleDelete() {
    if (!confirm('are you sure? this cannot be undone.')) return;
    localStorage.removeItem('lob_currentUser');
    router.push('/login');
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] max-w-[700px] mx-auto p-7">
      <BackButton
        label="profile"
        onClick={() => router.push(user ? `/profile/${user.username}` : '/')}
      />

      <div className="text-[14px] font-medium mb-5 pb-[10px] border-b border-[var(--border)]">
        settings
      </div>

      {/* Account */}
      <div className="mb-6">
        <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.08em] mb-[10px]">
          account
        </div>
        <div className="flex items-center justify-between py-[10px] border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-normal">display name</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">how others see you</div>
          </div>
          <div className="text-[11px] text-[var(--muted)] font-light">{user?.displayName || '—'}</div>
        </div>
        <div className="flex items-center justify-between py-[10px] border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-normal">username</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">your unique handle</div>
          </div>
          <div className="text-[11px] text-[var(--muted)] font-light">@{user?.username || '—'}</div>
        </div>
        <div className="flex items-center justify-between py-[10px]">
          <div>
            <div className="text-[11px] font-normal">email</div>
          </div>
          <div className="text-[11px] text-[var(--muted)] font-light">{user?.email || '—'}</div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.08em] mb-[10px]">
          notifications
        </div>
        <div className="flex items-center justify-between py-[10px] border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-normal">new events from followed</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">when someone you follow pins an event</div>
          </div>
          <Toggle on={settings.notifyFollowedEvents} onChange={(v) => update('notifyFollowedEvents', v)} />
        </div>
        <div className="flex items-center justify-between py-[10px] border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-normal">event reminders</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">1 hour before events you joined</div>
          </div>
          <Toggle on={settings.notifyReminders} onChange={(v) => update('notifyReminders', v)} />
        </div>
        <div className="flex items-center justify-between py-[10px] border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-normal">thread replies</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">when someone replies to your thread</div>
          </div>
          <Toggle on={settings.notifyThreadReplies} onChange={(v) => update('notifyThreadReplies', v)} />
        </div>
        <div className="flex items-center justify-between py-[10px]">
          <div>
            <div className="text-[11px] font-normal">new followers</div>
          </div>
          <Toggle on={settings.notifyNewFollowers} onChange={(v) => update('notifyNewFollowers', v)} />
        </div>
      </div>

      {/* Appearance */}
      <div className="mb-6">
        <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.08em] mb-[10px]">
          appearance
        </div>
        <div className="flex items-center justify-between py-[10px]">
          <div>
            <div className="text-[11px] font-normal">dark mode</div>
          </div>
          <Toggle on={settings.darkMode} onChange={(v) => update('darkMode', v)} />
        </div>
      </div>

      {/* Danger zone */}
      <div className="mb-2">
        <div className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.08em] mb-[10px]">
          danger zone
        </div>
        <div className="flex items-center justify-between py-[10px] border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-normal">log out</div>
          </div>
          <Button variant="danger" onClick={handleLogout}>log out</Button>
        </div>
        <div className="flex items-center justify-between py-[10px]">
          <div>
            <div className="text-[11px] font-normal">delete account</div>
            <div className="text-[9px] text-[var(--muted)] font-light mt-[2px]">this cannot be undone</div>
          </div>
          <Button variant="danger" onClick={handleDelete}>delete</Button>
        </div>
      </div>
    </div>
  );
}
