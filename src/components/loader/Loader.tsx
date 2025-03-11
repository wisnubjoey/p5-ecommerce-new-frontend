'use client';

import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div 
      className={cn("loader", className)}
      {...props}
      style={{
        '--line-thickness': '10%'
      } as React.CSSProperties}
    />
  );
}
