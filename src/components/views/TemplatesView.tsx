'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function TemplatesView() {
  const { variant } = useVariant();

  return (
    <div className={cn(
      "flex flex-col v-gap v-padding h-full overflow-hidden",
      variant === 'V4' ? "bg-gray-50/30" : "",
      variant === 'V6' ? "text-white" : ""
    )}>
      {/* Filters */}
      <div className={cn(
        "flex items-center gap-4 shrink-0",
        ['V4', 'V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "pb-2 border-b border-gray-100" : ""
      )}>
        <h3 className={cn("text-sm font-bold uppercase", variant === 'V6' ? "text-white" : "text-gray-700")}>Templates</h3>
        <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['All', 'N', 'V', 'S', 'A', 'P', 'Q'].map((filter) => (
             <button key={filter} className={cn(
               "px-3 py-1 text-xs font-bold rounded transition-colors",
               filter === 'All' 
                 ? "bg-[#ff8a00] text-white" 
                 : (variant === 'V6' ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200")
             )}>
                {filter}
             </button>
          ))}
        </div>
      </div>

      <div className={cn(
        "flex v-gap flex-1 min-h-0",
        ['V4', 'V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "flex-col lg:flex-row overflow-hidden" : "flex-col overflow-y-auto"
      )}>
        {/* Template Grid */}
        <div className={cn(
          variant === 'V2' ? "bg-transparent border-b border-gray-100 rounded-none p-0 pb-4" : 
          variant === 'V4' ? "bg-white border border-gray-100 rounded shadow-sm p-4 w-1/4 flex flex-col overflow-hidden" :
          "bg-white border border-gray-100 rounded shadow-sm p-4"
        )}>
          <div className={cn(
            "flex items-center gap-4",
            variant === 'V4' ? "flex-col overflow-y-auto pr-2 scrollable-pane h-full" : "overflow-x-auto pb-2"
          )}>
              {[86, 71, 65, 42, 58, 34, 29, 67].map((val, i) => (
                <div key={i} className={cn(
                  "flex-shrink-0 w-24 h-24 border rounded flex flex-col items-center justify-center gap-2 p-2",
                  i === 3 ? "border-[#ff8a00] bg-[#fffaf5]" : "border-gray-50 bg-[#fafafa]"
                )}>
                  <svg className="w-full flex-1" viewBox="0 0 40 40">
                    <path d="M0,20 L15,20 L18,5 L22,35 L25,20 L40,20" stroke={i === 3 ? "#ef4444" : "#1a1a1a"} fill="none" strokeWidth="1" />
                  </svg>
                  <span className="text-[9px] font-bold text-gray-400">N {val}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className={cn(
          "flex flex-col",
          variant === 'V2' ? "bg-transparent p-0 pt-4 rounded-none" : 
          variant === 'V4' ? "bg-white border border-gray-100 rounded shadow-sm p-4 flex-1 overflow-hidden" :
          "bg-white border border-gray-100 rounded shadow-sm p-4"
        )}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-bold text-gray-800">Title</h4>
              <span className="text-[10px] font-bold text-gray-400">1.250 items</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <button className="p-1 border border-gray-200 rounded text-gray-400"><ChevronLeft size={14} /></button>
                <button className="p-1 border border-gray-200 rounded text-gray-400"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "grid gap-4",
            variant === 'V4' ? "grid-cols-2 lg:grid-cols-4 overflow-y-auto flex-1 scrollable-pane" : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
          )}>
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="border border-gray-100 rounded bg-[#fefefe] flex flex-col overflow-hidden">
                <div className="h-16 bg-[#fff5f5] relative flex items-center justify-center border-b border-gray-50">
                    <span className="absolute bottom-0 left-0 px-1 bg-white text-[8px] font-bold text-[#f87171]">12:10:10</span>
                    <svg className="w-full h-full opacity-60" viewBox="0 0 100 40">
                      <path d="M0,20 L5,20 L10,5 L15,35 L20,20 L25,20 L30,5 L35,35 L40,20 L45,20 L50,5 L55,35 L60,20 L65,20 L70,5 L75,35 L80,20 L85,20 L90,5 L95,35 L100,20" stroke="#f87171" fill="none" strokeWidth="0.5" />
                    </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
