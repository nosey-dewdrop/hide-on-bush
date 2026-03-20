'use client';

interface BackButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function BackButton({ label, onClick, className = '' }: BackButtonProps) {
  return (
    <button
      className={`font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-light py-1 px-[10px] border border-[var(--border)] rounded-[3px] bg-transparent text-[var(--muted)] cursor-pointer mb-4 transition-all duration-200 hover:border-[var(--sky)] hover:text-[var(--dark)] ${className}`}
      onClick={onClick}
    >
      &larr; back to {label}
    </button>
  );
}
