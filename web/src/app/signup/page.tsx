'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { generateId } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const inputClass =
    'font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-light py-2 px-3 border border-[var(--border)] rounded bg-[var(--cream)] outline-none focus:border-[var(--sky)] w-full transition-[border-color] duration-200 text-[var(--dark)]';

  function handleSignup() {
    setError('');

    if (!displayName.trim() || !username.trim()) {
      setError('display name and username are required');
      return;
    }

    const existing = db.getUsers().find((u) => u.username === username.trim());
    if (existing) {
      setError('username already taken');
      return;
    }

    const user = db.createUser({
      id: generateId(),
      displayName: displayName.trim(),
      username: username.trim(),
      email: email.trim(),
      bio: bio.trim(),
      avatarLetter: displayName.trim().charAt(0),
      attendedCount: 0,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem('lob_currentUser', JSON.stringify(user));
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-[var(--border)] rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] max-w-[400px] w-full p-7">
        <div className="text-[14px] font-medium mb-5 pb-[10px] border-b border-[var(--border)]">
          sign up
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">display name</label>
          <input
            type="text"
            className={inputClass}
            placeholder="your name..."
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">username</label>
          <input
            type="text"
            className={inputClass}
            placeholder="pick a username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">email</label>
          <input
            type="email"
            className={inputClass}
            placeholder="you@bilkent.edu.tr..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </div>

        <div className="mb-4">
          <label className="text-[10px] font-normal text-[var(--dark)] mb-1 block">bio</label>
          <textarea
            className={`${inputClass} resize-y min-h-[60px]`}
            placeholder="tell us about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-[10px] text-[#e57373] font-light mb-3">{error}</div>
        )}

        <Button variant="primary" className="w-full" onClick={handleSignup}>
          create account
        </Button>

        <div className="text-[10px] text-[var(--muted)] font-light mt-4 text-center">
          already have an account?{' '}
          <span
            className="text-[var(--sky)] cursor-pointer hover:underline"
            onClick={() => router.push('/login')}
          >
            log in
          </span>
        </div>
      </div>
    </div>
  );
}
