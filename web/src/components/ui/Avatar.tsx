'use client';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  letter: string;
  size?: AvatarSize;
  className?: string;
  onClick?: () => void;
}

const sizeStyles: Record<AvatarSize, { wrapper: string; text: string }> = {
  sm: { wrapper: 'w-[14px] h-[14px]', text: 'text-[7px]' },
  md: { wrapper: 'w-[26px] h-[26px]', text: 'text-[11px]' },
  lg: { wrapper: 'w-[56px] h-[56px]', text: 'text-[22px]' },
};

export default function Avatar({
  letter,
  size = 'md',
  className = '',
  onClick,
}: AvatarProps) {
  const s = sizeStyles[size];

  return (
    <div
      className={`${s.wrapper} rounded-[4px] bg-[var(--sky)] flex items-center justify-center ${s.text} text-white font-medium cursor-pointer ${className}`}
      onClick={onClick}
    >
      {letter.charAt(0).toUpperCase()}
    </div>
  );
}
