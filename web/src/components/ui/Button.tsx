'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'pin';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--sky)] text-white border-none text-[11px] font-normal px-6 py-2 rounded hover:bg-[#6dbfdf]',
  secondary:
    'bg-transparent border border-[var(--border)] text-[var(--muted)] text-[11px] font-light px-4 py-[5px] rounded-[3px] hover:border-[var(--sky)] hover:text-[var(--dark)]',
  danger:
    'bg-transparent border border-[#e57373] text-[#e57373] text-[10px] font-normal px-[14px] py-[6px] rounded-[3px] hover:bg-[#e57373] hover:text-white',
  pin:
    'bg-[var(--sky)] text-white border-none text-[10px] font-normal px-3 py-[5px] rounded-[3px] hover:bg-[#6dbfdf]',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer transition-all duration-200 font-[family-name:var(--font-ibm-plex-mono)] ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
