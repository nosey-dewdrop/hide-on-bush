'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const inputClass =
    'font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-light py-2 px-3 border border-[var(--border)] rounded bg-[var(--cream)] outline-none focus:border-[var(--sky)] w-full transition-[border-color] duration-200 text-[var(--dark)]';

  function handleLogin() {
    setError('');
    const users = db.getUsers();
    const found = users.find((u) => u.username === username.trim());
    if (!found) {
      setError('user not found');
      return;
    }
    localStorage.setItem('lob_currentUser', JSON.stringify(found));
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-[var(--border)] rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] max-w-[400px] w-full p-7">
        <div className="text-[14px] font-medium mb-5 pb-[10px] border-b border-[var(--border)]">
          log in
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">username</label>
          <input
            type="text"
            className={inputClass}
            placeholder="your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">password</label>
          <input
            type="password"
            className={inputClass}
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        {error && (
          <div className="text-[10px] text-[#e57373] font-light mb-3">{error}</div>
        )}

        <Button variant="primary" className="w-full" onClick={handleLogin}>
          log in
        </Button>

        <div className="text-[10px] text-[var(--muted)] font-light mt-4 text-center">
          don&apos;t have an account?{' '}
          <span
            className="text-[var(--sky)] cursor-pointer hover:underline"
            onClick={() => router.push('/signup')}
          >
            sign up
          </span>
        </div>
      </div>
    </div>
  );
}
