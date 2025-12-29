'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { ECGStrip } from '@/components/ui/ECGStrip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TableView() {
  const { variant } = useVariant();

  const data = Array.from({length: 24}).map((_, i) => ({
    hour: `${String(i).padStart(2, '0')}h 00m 00s`,
    beats: '151.416',
    mean: '23',
    min: '1',
    max: '3',
    pauses: '5',
    perHour: '2',
    maxPause: '2'
  }));

  return (
    <div className={cn(
      "flex flex-col v-gap v-padding h-full overflow-hidden",
      variant === 'V4' ? "bg-gray-50/30" : "",
      variant === 'V6' ? "text-white" : ""
    )}>
      {/* ECG Strip at top (Except V4 which has it at the bottom) */}
      {['V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) && (
        <ECGStrip height={180} className={cn("shrink-0", (['V7', 'V8', 'V9', 'V10'].includes(variant) ? "border border-gray-100 rounded bg-white shadow-sm" : "border-b border-white/10 bg-transparent"))} dark={variant === 'V6'} />
      )}
      {variant === 'V4' && (
        <div className="flex-1 flex flex-col min-h-0">
           <div className="flex-none h-1/3 bg-white border border-gray-100 rounded shadow-sm overflow-hidden mb-4">
              {/* Table section for V4 top */}
              <div className="h-full overflow-auto">
                 <TableContent variant={variant} data={data} />
              </div>
           </div>
           <ECGStrip height={500} className="flex-1 border border-gray-100 rounded bg-white shadow-sm" />
        </div>
      )}

      <div className={cn(
        "flex v-gap flex-1 min-h-0",
        variant === 'V4' ? "hidden" : (['V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "flex-col overflow-hidden" : "flex-row")
      )}>
        {/* Left Table Section */}
        <div className={cn(
          variant === 'V1' ? "w-1/3" : "flex-1",
          "flex flex-col overflow-hidden",
          variant === 'V2' ? "bg-transparent border-r border-gray-100 rounded-none pr-4" : 
            "bg-white border border-gray-100 rounded shadow-sm"
        )}>
          <div className={cn(
            "flex items-center justify-between p-4 border-b border-gray-50",
          )}>
            <div className="flex gap-1">
               {['HR', 'S', 'V', 'R'].map((b) => (
                 <button key={b} className={cn(
                   "px-3 py-1 text-[10px] font-bold rounded border transition-all",
                   b === 'HR' 
                     ? "bg-[#fff7ed] border-[#ff8a00] text-[#ff8a00]" 
                     : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"
                 )}>{b}</button>
               ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Page 1 of 400</span>
              
              {/* V7 Button Group */}
              {variant === 'V7' ? (
                 <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                    <button className="p-1 px-2 hover:bg-white hover:shadow-sm rounded transition-all text-gray-400 hover:text-gray-700"><ChevronLeft size={14} /></button>
                    <div className="w-[1px] bg-gray-200 my-1 mx-0.5" />
                    <button className="p-1 px-2 hover:bg-white hover:shadow-sm rounded transition-all text-gray-400 hover:text-gray-700"><ChevronRight size={14} /></button>
                 </div>
              ) : (
                 <div className="flex gap-1">
                    <button className="p-1 border rounded border-gray-200 text-gray-400"><ChevronLeft size={14} /></button>
                    <button className="p-1 border rounded border-gray-200 text-gray-400"><ChevronRight size={14} /></button>
                 </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-auto scrollable-pane">
            {variant === 'V10' ? (
              // Transposed Table for V10
              <table className="w-full text-xs text-left border-collapse">
                 <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                       <th className="p-2 border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold sticky left-0 bg-gray-50 z-20 shadow-[4px_0_12px_rgba(0,0,0,0.02)] min-w-[100px]">Metric</th>
                       {data.map((d, i) => (
                          <th key={i} className="p-2 border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold whitespace-nowrap">{d.hour.split(' ')[0]}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {['Beats', 'Mean', 'Min', 'Max', 'Pauses'].map((metric, idx) => (
                       <tr key={metric} className="hover:bg-gray-50">
                          <td className="p-2 font-bold text-gray-700 sticky left-0 bg-white shadow-[4px_0_12px_rgba(0,0,0,0.02)]">{metric}</td>
                          {data.map((d, i) => (
                             <td key={i} className="p-2 text-gray-500 whitespace-nowrap">
                                {metric === 'Beats' ? d.beats : metric === 'Mean' ? d.mean : metric === 'Min' ? d.min : metric === 'Max' ? d.max : d.pauses}
                             </td>
                          ))}
                       </tr>
                    ))}
                 </tbody>
              </table>
            ) : (
              // Standard Table Component extracted
              <TableContent variant={variant} data={data} />
            )}
          </div>
        </div>

        {/* Right Strip Section for Non-V4 */}
        {!['V4', 'V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) && (
          <div className={cn(
            variant === 'V1' ? "w-2/3" : "w-1/2",
            "flex flex-col overflow-hidden",
            variant === 'V2' ? "bg-transparent pl-4 rounded-none" : "bg-white border border-gray-100 rounded shadow-sm"
          )}>
            <ECGStrip height={600} className="flex-1" />
          </div>
        )}
      </div>
    </div>
  );
}

function TableContent({ variant, data }: { variant: string, data: any[] }) {
  const rowCount = variant === 'V2' ? 7 : 50; // Requested 7 items for V2, keeping more for others as scrollable
  
  return (
    <table className="w-full text-xs text-left table-fixed">
      <thead className="text-[10px] font-bold text-gray-400 uppercase sticky top-0 bg-[#f8f9fa] border-b border-gray-100">
        <tr>
           <th className="px-2 py-2 w-20">Time</th>
           <th className="px-2 py-2 w-12">Label</th>
           <th className="px-2 py-2 w-16 text-right">HR</th>
           <th className="px-2 py-2 w-16 text-right">RR</th>
           <th className="px-2 py-2 w-16 text-right">ST</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {Array.from({length: rowCount}).map((_, i) => (
          <tr key={i} className={cn("cursor-pointer hover:bg-gray-50", i === 1 ? "bg-blue-50/50" : "", variant === 'V2' ? "h-8" : "h-10")}>
            <td className="px-2 py-1 font-medium text-gray-600 truncate">08:10:04</td>
            <td className="px-2 py-1"><span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold text-[8px]">N</span></td>
            <td className="px-2 py-1 font-bold text-gray-700 text-right">72</td>
            <td className="px-2 py-1 text-gray-500 text-right">833</td>
            <td className="px-2 py-1 text-gray-500 text-right">0.0</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

