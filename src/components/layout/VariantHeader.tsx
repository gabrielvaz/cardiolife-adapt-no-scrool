'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';

import { useRouter, useParams } from 'next/navigation';

export function VariantHeader() {
  const { variant, setVariant } = useVariant();
  const router = useRouter();
  const params = useParams();
  const variants = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10'] as const;

  const handleVariantChange = (v: typeof variants[number]) => {
    setVariant(v);
    const currentTab = params.tab || 'trends';
    router.push(`/${v.toLowerCase()}/${currentTab}`);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-10 px-4 bg-black text-white">
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Layout Variants</span>
        <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[80vw]">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => handleVariantChange(v)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap",
                variant === v
                  ? "bg-[#ff8a00] text-white"
                  : "hover:bg-gray-800 text-gray-300"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="text-[10px] text-gray-500 font-mono">
        RES: 1920x1080 OPTIMIZED
      </div>
    </header>
  );
}
