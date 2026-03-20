'use client';

import { InputHTMLAttributes } from 'react';

interface SearchBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

export default function SearchBox({ className = '', ...props }: SearchBoxProps) {
  return (
    <input
      type="text"
      className={`font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-light py-[6px] px-[14px] border border-[var(--border)] rounded-[3px] bg-[var(--cream)] text-[var(--dark)] outline-none w-[260px] transition-[border-color] duration-200 placeholder:text-[var(--light)] focus:border-[var(--sky)] ${className}`}
      placeholder="search..."
      {...props}
    />
  );
}
