'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Zap, MoveHorizontal, Grid, Plus } from 'lucide-react';

export default function TimelineView() {
  const { variant } = useVariant();

  return (
    <div className={cn(
      "flex flex-col v-gap h-full overflow-hidden",
      variant === 'V1' ? "" : "v-padding",
      variant === 'V4' ? "bg-gray-50/30" : "",
      variant === 'V6' ? "text-white" : ""
    )}>
      {/* V4/V6/V7 ECG Strip at top (optional) */}
      {['V4', 'V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) && (
         <div className="shrink-0 flex items-center justify-between pb-2 border-b border-gray-100/50">
             <h3 className={cn("text-sm font-bold uppercase", variant === 'V6' ? "text-white" : "text-gray-700")}>Timeline Analysis</h3>
             <div className="flex gap-2">
                <button className="px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded">1 Hour</button>
                <button className="px-2 py-1 text-[10px] bg-gray-100 text-gray-600 rounded">24 Hours</button>
             </div>
         </div>
      )}

      {/* Navigate Bar */}
      <div className="flex items-center gap-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-gray-800">Navigate:</span>
           <div className="flex items-center gap-1">
             <button className="p-1 border border-gray-100 rounded bg-gray-50 text-gray-400"><ChevronLeft size={14} /></button>
             <div className="px-3 py-1 border border-gray-100 rounded text-xs text-gray-700">11/29/2022</div>
             <div className="px-3 py-1 border border-gray-100 rounded text-xs text-gray-700">19:06:47</div>
             <button className="p-1 border border-gray-100 rounded bg-gray-50 text-gray-400"><ChevronRight size={14} /></button>
           </div>
        </div>
        
        <div className="flex-1 px-8 relative flex items-center h-6">
           <div className="w-full h-1 bg-gray-200 rounded-full" />
           <div className="absolute left-1/3 w-3 h-3 bg-[#ff8a00] border-2 border-white rounded-full shadow-sm" />
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex items-center gap-4 py-2">
         <select className="text-[10px] font-bold border border-gray-200 rounded px-2 py-1 bg-white text-gray-600 outline-none uppercase">
           <option>3 leads</option>
         </select>
         <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-gray-400">Gain:</span>
            <select className="text-[10px] font-bold border border-gray-200 rounded px-2 py-1 bg-white text-gray-600 outline-none">
              <option>5</option>
            </select>
         </div>
         <div className="flex gap-1 ml-4 pr-4 border-r border-gray-100">
            <button className="px-3 py-1 text-[10px] font-bold rounded bg-[#fff7ed] text-[#ea580c] border border-[#ff8a00]">2min</button>
            <button className="px-3 py-1 text-[10px] font-bold rounded bg-white text-gray-400 border border-gray-100">1min</button>
         </div>
         <div className="flex items-center gap-3 text-gray-300 ml-2">
           <span title="Pacer"><Zap size={14} /></span>
           <span title="Measure"><MoveHorizontal size={14} /></span>
           <span title="Grid"><Grid size={14} /></span>
           <span title="Add"><Plus size={14} /></span>
         </div>
      </div>

      {/* Full Disclosure ECG Area */}
      <div className={cn(
        "flex-1 overflow-auto relative",
        variant === 'V2' ? "border-t border-gray-100 rounded-none" : "border border-gray-100 rounded"
      )}>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20" />
         <div className="flex flex-col gap-0 p-4 relative">
            {Array.from({length: 20}).map((_, i) => (
               <div key={i} className="h-16 border-b border-gray-50 flex items-center px-4 relative">
                  {i === 2 && (
                    <div className="absolute inset-0 bg-blue-100 opacity-30 border-l border-r border-[#3b82f6]" />
                  )}
                  <svg className="w-full h-full opacity-80" viewBox="0 0 1000 60">
                    <path d={`M0,30 ${Array.from({length: 50}).map((_, j) => `L${j*20+10},${20 + (Math.sin(j + i) * 10 + 10)} L${j*20+15},0 L${j*20+20},60 L${j*20+25},30`).join(' ')}`} stroke="#1a1a1a" fill="none" strokeWidth="0.5" />
                  </svg>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
