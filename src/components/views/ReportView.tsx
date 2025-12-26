'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { MetricCard } from '@/components/ui/MetricCard';
import { Edit2, Download, User } from 'lucide-react';

export default function ReportView() {
  const { variant } = useVariant();

  const metrics = [
    { title: 'Rhythm', subtitle: 'Distribution of detected heart rhythms', details: [ { label: 'SR', p: '76%', e: '--', l: '--' }, { label: 'AFIB', p: '2%', e: '--', l: '39' } ] },
    { title: 'HR', subtitle: 'Heart rate and RR interval statistics', details: [ { label: 'HR MEAN', v: '416ms' }, { label: 'HR MEAN', v: '434ms' } ] },
    { title: 'HRV', subtitle: 'Heart rate variability metrics overview', details: [ { label: 'ANN', v: '889' }, { label: 'SDNN', v: '9' } ] },
    { title: 'PAC', subtitle: 'Premature atrial contraction summary', details: [ { label: 'BEATS', v: '57,266' }, { label: 'HOUR', v: '303,9' } ] },
    { title: 'PVC', subtitle: 'Premature ventricular contraction summary', details: [ { label: 'BEATS', v: '57,266' }, { label: 'HOUR', v: '303,9' } ] },
    { title: 'Pauses', subtitle: 'Detected cardiac pauses and duration', details: [ { label: 'PAUSES', v: '85' }, { label: 'LONGEST', v: '4,95s' } ] },
    { title: 'Artifacts', subtitle: 'Signal noise and recording artifacts', details: [ { label: 'BEATS', v: '6144' }, { label: 'EPISODES', v: '3,449' } ] }
  ];

  return (
    <div className={cn(
      "flex flex-col v-gap v-padding overflow-y-auto h-full",
      variant === 'V4' ? "overflow-hidden" : "",
      variant === 'V6' ? "text-white" : ""
    )}>
      {/* Metrics Grid (only if not V4) */}
      {variant !== 'V4' && (
        <div className={cn(
          "grid gap-4",
          variant === 'V3' ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-7" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {metrics.map((m, idx) => (
            <MetricCard key={idx} title={m.title} subtitle={m.subtitle} className={cn(variant === 'V2' && "bg-transparent border-0 shadow-none p-0", variant === 'V6' && "bg-transparent border border-white/10")}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                {m.details.map((detail, dIdx) => (
                  <div key={dIdx}>
                    <p className={cn("text-[9px] uppercase font-bold", variant === 'V6' ? "text-white/50" : "text-gray-400")}>{detail.label}</p>
                    <p className={cn("text-xs font-bold", variant === 'V6' ? "text-white" : "text-gray-700")}>{(detail as any).p || (detail as any).v || '--'}</p>
                  </div>
                ))}
              </div>
            </MetricCard>
          ))}
        </div>
      )}

      {/* Main Content Sections */}
      <div className={cn(
        "flex v-gap flex-1 min-h-0",
        ['V4', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "flex-row overflow-hidden" : "flex-col overflow-y-auto"
      )}>
        {/* Editor Column */}
        <div className={cn(
          "flex flex-col v-gap", 
          ['V4', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "w-1/3 flex-1 overflow-hidden" : ""
        )}>
          <div className={cn(
            "flex flex-col gap-4 p-6",
            variant === 'V2' ? "bg-transparent border-b border-gray-100 rounded-none shadow-none" : "bg-white border border-gray-100 rounded shadow-sm",
            ['V4', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "flex-1 overflow-hidden" : "",
            variant === 'V6' ? "bg-transparent border border-white/10" : ""
          )}>
            <div className="flex items-center gap-2">
              <h4 className={cn("text-sm font-bold", variant === 'V6' ? "text-white" : "text-gray-800")}>Report</h4>
              <Edit2 size={12} className="text-[#ff8a00]" />
            </div>
            <textarea 
              placeholder="Fill the report"
              className={cn(
                "w-full p-4 border rounded outline-none transition-all italic",
                ['V4', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "flex-1 resize-none" : "h-32",
                variant === 'V6' ? "bg-white/5 border-white/10 text-gray-300 focus:border-[#ff8a00]" : "bg-[#fafafa] border-gray-100 text-gray-600 focus:border-[#ff8a00]"
              )}
            />
          </div>

          {variant !== 'V4' && (
            <div className={cn(
              "h-[200px] flex flex-col p-4",
              variant === 'V2' ? "bg-transparent border-b border-gray-100 rounded-none shadow-none" : "bg-white border border-gray-100 rounded shadow-sm"
            )}>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-4">Heart Rate</h4>
              <div className="flex-1 flex items-end gap-1 relative px-8">
                 {Array.from({length: 150}).map((_, i) => (
                   <div key={i} className="flex-1 bg-gray-400 opacity-20" style={{ height: `${10 + (Math.sin(i / 10) * 40 + 40)}%` }} />
                 ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle Column for V4 (HR Chart & Metrics) */}
        {variant === 'V4' && (
          <div className="w-1/3 flex flex-col v-gap overflow-hidden">
            <div className="bg-white border border-gray-100 rounded shadow-sm p-4 flex-1 flex flex-col overflow-hidden">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-4">Daily Heart Rate Trend</h4>
               <div className="flex-1 flex items-end gap-1 relative px-4">
                  {Array.from({length: 60}).map((_, i) => (
                    <div key={i} className="flex-1 bg-gray-600 opacity-40" style={{ height: `${20 + (i * 11 % 70)}%` }} />
                  ))}
               </div>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                {metrics.slice(0, 4).map((m, i) => (
                  <div key={i}>
                    <p className="text-[8px] font-bold text-gray-400 uppercase">{m.title}</p>
                    <p className="text-sm font-bold text-gray-800">{(m.details[0] as any).v || (m.details[0] as any).p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column (Burden Table) */}
        <div className={cn(
          "flex flex-col v-gap", 
          variant === 'V4' ? "w-1/3 flex-1 overflow-hidden" : ""
        )}>
          <div className={cn(
            "overflow-hidden flex flex-col",
            variant === 'V2' ? "bg-transparent rounded-none shadow-none" : "bg-white border border-gray-100 rounded shadow-sm",
            variant === 'V4' ? "flex-1 overflow-hidden" : ""
          )}>
            <div className="p-4 border-b border-gray-50 bg-[#f8f9fa]">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase">Findings & Burden</h4>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#fcfcfc] border-b border-gray-50 text-[10px] font-bold text-gray-300 uppercase sticky top-0">
                  <tr>
                    <th className="px-4 py-2">Label</th>
                    <th className="px-4 py-2 text-right">Beats</th>
                    <th className="px-4 py-2 text-right">Burden</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { label: 'SR', beats: '151,416', burden: '76.2%' },
                    { label: 'AFIB', beats: '4,141', burden: '2.1%' },
                    { label: 'PVC', beats: '21,512', burden: '10.5%' },
                    { label: 'PAC', beats: '7,078', burden: '3.4%' },
                    { label: 'Pauses', beats: '85', burden: '0.1%' },
                  ].map((row) => (
                    <tr key={row.label} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-gray-700">{row.label}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-600">{row.beats}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#ff8a00]" style={{ width: row.burden }} />
                          </div>
                          <span className="font-bold text-gray-800 w-8">{row.burden}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <button className="w-full py-3 bg-[#1a1a1a] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-200">
            Sign & Finalize
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-2">
         <button className="flex items-center gap-2 px-6 py-2 bg-[#ff8a00] text-white rounded font-bold text-xs shadow-md shadow-orange-200">
            <Download size={14} /> Export PDF
         </button>
      </div>
    </div>
  );
}
