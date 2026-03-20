'use client';

interface CorkSurfaceProps {
  children: React.ReactNode;
}

export default function CorkSurface({ children }: CorkSurfaceProps) {
  return <div className="cork-surface">{children}</div>;
}
