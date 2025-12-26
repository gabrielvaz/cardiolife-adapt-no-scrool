'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function MetricCard({ title, subtitle, children, className }: MetricCardProps) {
  const { variant } = useVariant();
  
  return (
    <div className={cn(
      "flex flex-col v-padding",
      variant === 'V2' ? "bg-transparent" : "bg-white border border-gray-100 rounded shadow-sm",
      className
    )}>
      <div className="mb-2">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-[10px] text-gray-500 uppercase tracking-tight leading-tight">{subtitle}</p>}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
