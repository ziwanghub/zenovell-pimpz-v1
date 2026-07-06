import { ReactNode } from 'react';

interface IconWrapperProps {
  size?: number;
  className?: string;
  children: ReactNode;
}

export function IconWrapper({ size = 10, className = 'bg-white', children }: IconWrapperProps) {
  return (
    <div className={`flex size-${size} shrink-0 items-center justify-center rounded-full ${className}`}>
      {children}
    </div>
  );
}
