'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { MetricCard } from '@/components/ui/MetricCard';
import { ECGStrip } from '@/components/ui/ECGStrip';
import { ChevronLeft } from 'lucide-react';

const metrics = [
  { title: 'Heart Rate', subtitle: 'Avg. BPM', value: '72', change: '+5%' },
  { title: 'HRV', subtitle: 'SDNN (ms)', value: '45', change: '-2%' },
  { title: 'Arrhythmias', subtitle: 'Total Events', value: '120', change: '+10%' },
  { title: 'Burden', subtitle: '% of Time', value: '15%', change: '0%' },
  { title: 'PQ Interval', subtitle: 'Avg. ms', value: '160', change: '+3%' },
  { title: 'QRS Duration', subtitle: 'Avg. ms', value: '90', change: '-1%' },
  { title: 'QT Interval', subtitle: 'Avg. ms', value: '400', change: '+2%' },
  { title: 'ST Deviation', subtitle: 'Max mV', value: '0.1', change: '0%' },
];

export default function TrendsView() {
  const { variant } = useVariant();

  // V6 Cinematic Layout (Now Light)
  if (variant === 'V6') {
    return (
      <div className="flex flex-col h-full overflow-hidden text-gray-900 bg-white v-padding v-gap">
        <ECGStrip height={220} className="shrink-0 border-b border-gray-100 bg-transparent" />
        <div className="flex-1 grid grid-cols-4 gap-8 px-12 pb-12 items-center">
          {metrics.slice(0, 4).map((m, i) => (
            <div key={i} className="flex flex-col gap-2">
               <p className="text-4xl font-thin tracking-tighter text-gray-900">{m.value}</p>
               <p className="text-[10px] uppercase font-bold tracking-widest text-[#ff8a00]">{m.title}</p>
               <div className="h-24 mt-4 border-l border-gray-200 pl-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff8a00]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200" />
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // V4, V7, V8, V9, V10 Dashboards (Modern Layouts)
  if (['V4', 'V7', 'V8', 'V9', 'V10'].includes(variant)) {
     return (
        <div className={cn("flex flex-col h-full overflow-hidden v-padding v-gap", variant === 'V4' && "bg-gray-50/30")}>
           {/* Top Strip */}
           <ECGStrip 
             height={180} 
             className={cn("shrink-0", variant === 'V4' ? "border-b border-gray-100 bg-white" : "border border-gray-100 rounded bg-white shadow-sm")} 
           />

           {/* Main Grid */}
           <div className={cn("flex-1 grid gap-4 min-h-0", ['V4', 'V8', 'V9'].includes(variant) ? "grid-cols-12" : "grid-cols-12")}>
              
              {/* Col 1: Metrics (Left) */}
              <div className={cn("flex flex-col gap-4 overflow-y-auto pr-2", ['V4', 'V8', 'V9'].includes(variant) ? "col-span-3" : "col-span-4")}>
                 {metrics.slice(0, 4).map((m, i) => (
                    <MetricCard key={i} title={m.title} subtitle={m.subtitle} className={cn(['V7', 'V10'].includes(variant) && "border-l-4 border-l-[#ff8a00]")}>
                       <div className="flex justify-between items-end">
                          <div className="text-3xl font-bold text-gray-800 my-2">{m.value}</div>
                          <span className={cn("text-xs font-bold px-2 py-1 rounded mb-1", m.change.startsWith('+') ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50")}>{m.change}</span>
                       </div>
                    </MetricCard>
                 ))}
                 {/* V7 Extra Metrics to fill space since we have no right column */}
                 {variant === 'V7' && metrics.slice(4, 6).map((m, i) => (
                    <MetricCard key={'extra'+i} title={m.title} subtitle={m.subtitle} className="border-l-4 border-l-gray-200">
                       <div className="text-2xl font-bold text-gray-700 my-1">{m.value}</div>
                    </MetricCard>
                 ))}
              </div>

              {/* Col 2: Charts (Middle/Right) */}
              <div className={cn("flex flex-col gap-4 overflow-hidden", ['V4', 'V8', 'V9'].includes(variant) ? "col-span-6" : "col-span-8")}>
                 <div className="flex-1 bg-white p-4 rounded border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 z-10">
                       <h4 className="text-[10px] font-bold text-gray-400 uppercase">Heart Rate Trend</h4>
                       <div className="flex gap-2">
                          <button className="px-2 py-1 text-[10px] font-bold bg-gray-50 rounded text-gray-500 hover:bg-gray-100">1H</button>
                          <button className="px-2 py-1 text-[10px] font-bold bg-[#ff8a00] text-white rounded shadow-sm">24H</button>
                       </div>
                    </div>
                    {/* Placeholder Chart */}
                    <div className="absolute inset-0 top-12 flex items-end justify-between px-4 pb-0">
                        {Array.from({length: 40}).map((_, i) => (
                           <div key={i} className="flex-1 bg-blue-500/80 mx-[1px] rounded-t-sm opacity-60 hover:opacity-100 transition-opacity" style={{ height: `${20 + (i * 7 % 60)}%` }} />
                        ))}
                    </div>
                 </div>

                 {/* Histograms / Details */}
                 <div className="h-48 bg-white p-4 rounded border border-gray-100 shadow-sm flex flex-col">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">RR Interval Distribution</h4>
                    <div className="flex-1 flex items-end gap-1">
                    <div className="flex-1 flex items-end gap-1">
                        {Array.from({length: 30}).map((_, i) => (
                           <div key={i} className="flex-1 bg-purple-500/50 mx-[1px] rounded-t-sm" style={{ height: `${(i * 17 % 100)}%` }} />
                        ))}
                    </div>
                    </div>
                 </div>
              </div>

              {/* Col 3: Right (V4, V8, V9 Only) */}
              {['V4', 'V8', 'V9'].includes(variant) && (
                 <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pl-2">
                    {metrics.slice(4).map((m, i) => (
                       <MetricCard key={i} title={m.title} subtitle={m.subtitle}>
                          <div className="text-xl font-bold text-gray-700">{m.value}</div>
                       </MetricCard>
                    ))}
                    <div className="mt-auto bg-gray-50 p-4 rounded-lg border border-gray-100">
                       <h4 className="text-[10px] uppercase font-bold text-gray-400 mb-2">Exam Duration</h4>
                       <p className="text-xl font-bold text-gray-800">85h 57m</p>
                    </div>
                 </div>
              )}
           </div>
        </div>
     );
  }

  // Standard Views (V1, V2, V3, V5)
  return (
    <div className="flex flex-col v-gap v-padding h-full overflow-hidden">
      <div className={cn(
        "flex-1 justify-items-center",
        variant === 'V3' ? "grid grid-cols-12 grid-rows-6 v-gap" : "flex flex-col v-gap"
      )}>
        {/* Main Content Area */}
        <div className={cn(
           "flex flex-col v-gap",
           variant === 'V3' ? "col-span-3 row-span-6" : "flex-1"
        )}>
          {/* Top Metrics Row (Horizontal for V1/V2) */}
          {(variant === 'V1' || variant === 'V2') ? (
            <div className="grid grid-cols-3 gap-4">
              {metrics.slice(0, 3).map((m, i) => (
                <MetricCard key={i} title={m.title} subtitle={m.subtitle} className={cn(variant === 'V2' && "bg-transparent border-0 shadow-none p-0")}>
                  <div className="flex justify-between items-end">
                    <div className="text-3xl font-bold text-gray-800 my-2">{m.value}</div>
                    {i === 2 && <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded mb-1">{m.change}</span>}
                  </div>
                  <div className="h-12 bg-blue-50/50 rounded flex items-end pb-1 px-1">
                     <div className="w-full h-1/2 bg-blue-200/50 rounded-sm" />
                  </div>
                </MetricCard>
              ))}
            </div>
          ) : (
            metrics.slice(0, 2).map((m, i) => (
              <MetricCard key={i} title={m.title} subtitle={m.subtitle} className={cn(variant === 'V2' && "bg-transparent border-0 shadow-none p-0")}>
                <div className="text-3xl font-bold text-gray-800 my-2">{m.value}</div>
                <div className="h-16 bg-blue-50/50 rounded flex items-end pb-1 px-1">
                   <div className="w-full h-1/2 bg-blue-200/50 rounded-sm" />
                </div>
              </MetricCard>
            ))
          )}
        </div>

        {/* Center */}
        <div className={cn(
           "flex flex-col v-gap",
           variant === 'V3' ? "col-span-6 row-span-6" : ""
        )}>
           <div className={cn(
             "flex-1 p-4 flex flex-col",
             variant === 'V2' ? "bg-transparent" : "bg-white border border-gray-100 rounded shadow-sm"
           )}>
              <h3 className="text-sm font-bold text-gray-700 mb-4">Heart Rate Trend</h3>
              <div className="flex-1 bg-gray-50 rounded border border-gray-100 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                    {Array.from({length: 20}).map((_, i) => (
                      <div key={i} className="w-2 bg-blue-400 opacity-60 rounded-t" style={{ height: `${20 + (i * 13 % 60)}%` }} />
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Hidden Right Column for V1/V2 to give space to center/expanded layout */}
        {variant !== 'V1' && variant !== 'V2' && (
          <div className={cn(
             "flex flex-col v-gap",
             variant === 'V3' ? "col-span-3 row-span-6" : ""
          )}>
            {metrics.slice(2, 4).map((m, i) => (
              <MetricCard key={i} title={m.title} subtitle={m.subtitle} className={cn(variant === 'V2' && "bg-transparent border-0 shadow-none p-0")}>
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-bold text-gray-800">{m.value}</div>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded mb-1">{m.change}</span>
                </div>
              </MetricCard>
            ))}
          </div>
        )}
      </div>
      {/* Bottom Strip Area - Expanded for V1/V2 */}
      <ECGStrip height={variant === 'V1' || variant === 'V2' ? 250 : 150} className="shrink-0" />
    </div>
  );
}
