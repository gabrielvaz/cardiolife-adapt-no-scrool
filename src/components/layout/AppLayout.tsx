'use client';

import { VariantHeader } from '@/components/layout/VariantHeader';
import { VariantProvider, useVariant } from '@/context/VariantContext';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

function ClientLayout({ children }: { children: ReactNode }) {
  const { variant } = useVariant();

  return (
    <div 
      data-variant={variant} 
      className={cn(
        "min-h-screen flex flex-col transition-all duration-300",
        variant === 'V2' && "text-[0.9rem]",
        variant === 'V3' && "text-[0.95rem]"
      )}
    >
      <VariantHeader />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <VariantProvider>
      <ClientLayout>{children}</ClientLayout>
    </VariantProvider>
  );
}
