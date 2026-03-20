'use client';

interface ToggleProps {
  on?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export default function Toggle({ on = false, onChange, className = '' }: ToggleProps) {
  return (
    <button
      type="button"
      className={`toggle ${on ? 'on' : ''} ${className}`}
      onClick={() => onChange?.(!on)}
      aria-pressed={on}
    />
  );
}
