'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Square, 
  Settings2, 
  FileText, 
  Plus, 
  ChevronsLeft, 
  ChevronsRight, 
  Type, 
  MoveHorizontal, 
  Grid, 
  Zap,
  Scissors
} from 'lucide-react';

export function ECGStrip({ height = 300, className, dark = false }: { height?: number, className?: string, dark?: boolean }) {
  const { variant } = useVariant();
  const actualHeight = variant === 'V10' ? Math.max(height, 400) : height;

  return (
    <div className={cn("flex flex-col", dark ? "bg-transparent border-t border-white/10" : "bg-white border-t border-gray-200", className)}>
      <div className={cn(
        "flex items-center justify-between px-4 h-9 border-b",
        dark ? "border-white/10 bg-transparent text-gray-300" : "border-gray-100 bg-[#fefefe] text-gray-600"
      )}>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="text-[10px] whitespace-nowrap">Time: 21:09:50 • HR: 78bpm</span>
          <div className="flex gap-1">
            <button className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", dark ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-[#fff7ed] text-[#ea580c] border-[#fdba74]")}>F1</button>
            <button className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", dark ? "bg-white/10 text-gray-400 border-white/10" : "bg-gray-50 text-gray-500 border-gray-200")}>F2</button>
          </div>
          <div className={cn("flex gap-3 ml-2", dark ? "text-gray-500" : "text-gray-400")}>
            <span title="Pacer"><Zap size={14} className="text-[#ff8a00]" /></span>
            <span title="Measure"><MoveHorizontal size={14} /></span>
            <span title="Text"><Type size={14} /></span>
            <span title="Grid Toggle"><Grid size={14} /></span>
            <span title="Cut/Segmentation"><Scissors size={14} /></span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button className={cn("text-[10px] font-bold py-1 px-3 border rounded uppercase transition-colors", dark ? "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10" : "bg-[#f8f9fa] border-gray-200 text-gray-600 hover:bg-gray-100")}>Segmentation</button>
            <button className={cn("text-[10px] font-bold py-1 px-3 border rounded uppercase flex items-center gap-1 transition-colors", dark ? "border-white/10 text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50")}>
              <FileText size={12} /> Add a report
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-0.5">
          {variant === 'V1' ? (
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 flex items-center justify-center shadow-sm"><ChevronsLeft size={14} /></button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 flex items-center justify-center shadow-sm"><ChevronLeft size={14} /></button>
              <button className="px-4 py-1 bg-[#ff8a00] border border-[#ff8a00] rounded text-white hover:bg-[#e67e00] flex items-center justify-center shadow-md active:scale-95 transition-transform"><Play size={14} fill="currentColor" /></button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 flex items-center justify-center shadow-sm"><ChevronRight size={14} /></button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 flex items-center justify-center shadow-sm"><ChevronsRight size={14} /></button>
            </div>
          ) : (
            <>
              <button className={cn("p-1 rounded", dark ? "hover:bg-white/10 text-gray-500" : "hover:bg-gray-100 text-gray-400")}><ChevronsLeft size={16} /></button>
              <button className={cn("p-1 rounded", dark ? "hover:bg-white/10 text-gray-500" : "hover:bg-gray-100 text-gray-400")}><ChevronLeft size={16} /></button>
              <button className={cn("p-1 rounded", dark ? "hover:bg-orange-500/10 text-[#ff8a00]" : "hover:bg-orange-50 text-[#ff8a00]")}><Play size={18} fill="currentColor" /></button>
              <button className={cn("p-1 rounded", dark ? "hover:bg-white/10 text-gray-500" : "hover:bg-gray-100 text-gray-400")}><ChevronRight size={16} /></button>
              <button className={cn("p-1 rounded", dark ? "hover:bg-white/10 text-gray-500" : "hover:bg-gray-100 text-gray-400")}><ChevronsRight size={16} /></button>
            </>
          )}
        </div>
      </div>
      
      <div 
        className={cn("relative overflow-hidden bg-repeat", dark ? "bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] invert brightness-0 opacity-20" : "bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]")}
        style={{ height: `${actualHeight}px` }}
      >
        {/* Mock ECG Trace */}
        <div className={cn("absolute inset-0 flex flex-col justify-around py-4", dark ? "opacity-100" : "opacity-80")}>
          {[1, 2, 3].map((ch) => (
            <div key={ch} className="relative h-24 w-full flex items-center px-12 group">
              <span className={cn("absolute left-4 text-[10px] font-bold", dark ? "text-gray-500" : "text-gray-400")}>ch{ch}</span>
              
              {/* Beat Annotations */}
              <div className="absolute top-0 left-12 right-12 flex justify-between px-4">
                {Array.from({length: 8}).map((_, i) => {
                  const types = ['N', 'N', 'S', 'S', 'N', 'N', 'V', 'N'];
                  const colors = { N: dark ? 'text-gray-400' : 'text-gray-800', S: 'text-green-600', V: 'text-red-500' };
                  const type = types[i] as keyof typeof colors;
                  return (
                    <span key={i} className={cn("text-[10px] font-bold", colors[type])}>{type}</span>
                  );
                })}
              </div>

              <svg className="w-full h-full" viewBox="0 0 1000 100">
                <path 
                  d="M0,50 L50,50 L55,40 L60,60 L65,50 L100,50 L110,20 L120,80 L130,50 L200,50 L205,40 L210,60 L215,50 L300,50 L310,20 L320,80 L330,50 L400,50 L405,40 L410,60 L415,50 L500,50 L510,20 L520,80 L530,50 L600,50 L605,40 L610,60 L615,50 L700,50 L710,20 L720,80 L730,50 L800,50 L805,40 L810,60 L815,50 L900,50 L910,20 L920,80 L930,50 L1000,50" 
                  stroke={dark ? (ch === 1 ? "#00ff88" : "#4ade80") : (ch === 1 ? "#1a1a1a" : "#2d3748")} 
                  strokeWidth="1" 
                  fill="none" 
                />
              </svg>
              
              {/* Event Highlight */}
              <div className={cn("absolute top-0 bottom-0 left-[35%] w-[10%] opacity-5 border-l border-r pointer-events-none", dark ? "bg-[#338be5] border-[#338be5]" : "bg-[#338be5] border-[#338be5]")} />
              <div className={cn("absolute top-0 bottom-0 left-[60%] w-[15%] opacity-5 border-l border-r pointer-events-none", dark ? "bg-[#338be5] border-[#338be5]" : "bg-[#338be5] border-[#338be5]")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
