'use client';

import { useVariant } from '@/context/VariantContext';
import { cn } from '@/lib/utils';
import { MetricCard } from '@/components/ui/MetricCard';
import { ECGStrip } from '@/components/ui/ECGStrip';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function EventsView() {
  const { variant } = useVariant();

  const metrics = [
    { 
      title: 'Rhythm', 
      subtitle: 'Distribution of detected heart rhythms', 
      type: 'table',
      rows: [
        { label: 'SR', p: '76%', e: '--', l: '--' },
        { label: 'AFIB', p: '2%', e: '--', l: '39s' },
        { label: 'AFL', p: '0%', e: '34', l: '29s' },
      ]
    },
    { 
      title: 'HR', 
      subtitle: 'Heart rate and RR interval statistics', 
      type: 'grid',
      items: [
        { label: 'HR MEAN', v: '416ms' },
        { label: 'HR STD', v: '9' },
        { label: 'HR MIN', v: '366ms' },
        { label: 'HR MAX', v: '170' },
        { label: 'HRN MEAN', v: '434ms' },
        { label: 'HRN MIN', v: '12' },
        { label: 'HRN MAX', v: '170' },
      ]
    },
    { 
      title: 'HRV', 
      subtitle: 'Heart rate variability metrics overview', 
      type: 'grid',
      items: [
        { label: 'AVNN', v: '889' },
        { label: 'SDNN', v: '9' },
        { label: 'RMSSD', v: '566' },
        { label: 'PNN50', v: '170' },
        { label: 'SDNNI', v: '434' },
        { label: 'PNN20', v: '9' },
        { label: 'SDNNI', v: '170' },
        { label: 'HTI', v: '12' },
      ]
    },
    { 
      title: 'PAC', 
      subtitle: 'Premature atrial contraction summary', 
      type: 'grid',
      items: [
        { label: 'BEATS', v: '57,266' },
        { label: 'HOUR', v: '305,9' },
        { label: 'TRIG', v: '4.818' },
        { label: 'ISO', v: '2.000' },
        { label: 'COUP', v: '260' },
        { label: 'ABERR', v: '--' },
        { label: 'RUNS', v: '--' },
        { label: 'BIG', v: '--' },
      ]
    },
    { 
      title: 'PVC', 
      subtitle: 'Premature ventricular contraction summary', 
      type: 'grid',
      items: [
        { label: 'BEATS', v: '57,266' },
        { label: 'HOUR', v: '305,9' },
        { label: 'TRIG', v: '4.818' },
        { label: 'ISO', v: '2.000' },
        { label: 'COUP', v: '260' },
        { label: 'RUNS', v: '--' },
        { label: 'BIG', v: '--' },
      ]
    },
    { 
      title: 'Pauses', 
      subtitle: 'Detected cardiac pauses and duration', 
      type: 'grid',
      items: [
        { label: 'PAUSES', v: '85' },
        { label: 'LONGEST', v: '4.95s' },
        { label: 'PER HOUR', v: '3.5' },
      ]
    },
    { 
      title: 'Artifacts', 
      subtitle: 'Signal noise and recording artifacts', 
      type: 'grid',
      items: [
        { label: 'BEATS', v: '6.144' },
        { label: 'EPISODES', v: '3.449' },
        { label: 'LONGEST', v: '--' },
        { label: 'PERCENTAGE', v: '6%' },
      ]
    }
  ];

  return (
    <div className={cn(
      "flex flex-col v-gap v-padding h-full overflow-hidden",
      variant === 'V4' ? "bg-gray-50/30" : ""
    )}>
      {/* V4/V6/V7/V8/V9/V10 ECG Strip at top */}
      {(variant === 'V4' || variant === 'V6' || variant === 'V7' || variant === 'V8' || variant === 'V9' || variant === 'V10') && (
        <ECGStrip height={150} className={cn("shrink-0", ['V4', 'V8', 'V9', 'V10', 'V7'].includes(variant) ? "border-b border-gray-100 bg-white" : "border-b border-gray-100 rounded bg-white shadow-sm")} />
      )}

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 justify-items-center min-h-0",
        variant === 'V3' ? "flex flex-col v-gap w-full" : (
          ['V4', 'V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) ? "grid grid-cols-12 v-gap" : "flex flex-col v-gap w-full"
        )
      )}>
        {/* Metrics Grid */}
        <div className={cn(
          "grid gap-4",
          variant === 'V3' ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-7" : 
          variant === 'V4' ? "grid-cols-2 w-1/3 overflow-y-auto pr-2 scrollable-pane" :
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {metrics.map((m, idx) => (
            <MetricCard key={idx} title={m.title} subtitle={m.subtitle} className={cn(variant === 'V4' && "v-padding-sm", variant === 'V3' && "bg-gray-50/50")}>
              {m.type === 'table' ? (
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-4 text-[7px] font-bold text-gray-400 uppercase">
                    <span>Label</span>
                    <span>%</span>
                    <span>Epi</span>
                    <span>Long</span>
                  </div>
                  {m.rows?.map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-4 text-[9px] border-t border-gray-50 pt-1">
                      <span className="font-bold text-gray-700">{row.label}</span>
                      <span className="text-gray-500">{row.p}</span>
                      <span className="text-gray-500">{row.e}</span>
                      <span className="text-gray-500">{row.l}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                  {m.items?.map((item, iIdx) => (
                    <div key={iIdx}>
                      <p className="text-[7px] uppercase font-bold text-gray-400 leading-tight">{item.label}</p>
                      <p className="text-[9px] font-bold text-gray-700 leading-tight">{item.v}</p>
                    </div>
                  ))}
                </div>
              )}
            </MetricCard>
          ))}
        </div>

        {/* Examples Grid Section */}
        <div className={cn(
          "flex flex-col",
          variant === 'V2' ? "bg-transparent border-t border-gray-100 p-0 pt-4 rounded-none" : 
          variant === 'V4' ? "bg-white border border-gray-100 rounded shadow-sm p-4 flex-1 overflow-hidden" : 
          variant === 'V3' ? "flex-1 overflow-hidden bg-white border border-gray-100 rounded shadow-sm p-4" :
          "bg-white border border-gray-100 rounded shadow-sm p-4"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-800">HRN Min</h4>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase">20 examples</span>
              <div className="flex gap-1">
                <button className="p-1 border border-gray-200 rounded text-gray-400 hover:bg-gray-50"><ChevronLeft size={14} /></button>
                <button className="p-1 border border-gray-200 rounded text-gray-400 hover:bg-gray-50"><ChevronRight size={14} /></button>
              </div>
              <button className="p-1 text-gray-300 hover:text-gray-500"><X size={14} /></button>
            </div>
          </div>
          
          <div className={cn(
            "grid gap-4",
            variant === 'V4' || variant === 'V3' ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 overflow-y-auto flex-1 scrollable-pane" : "grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
          )}>
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="border border-gray-100 rounded bg-[#fefefe] flex flex-col overflow-hidden">
                 <div className="h-16 bg-[#fff5f5] relative flex items-center justify-center border-b border-gray-50">
                    <span className="absolute bottom-0 left-0 px-1 bg-white text-[8px] font-bold text-[#f87171]">12:10:10</span>
                    <svg className="w-full h-full opacity-60" viewBox="0 0 100 40">
                      <path d="M0,20 L5,20 L10,5 L15,35 L20,20 L25,20 L30,5 L35,35 L40,20 L45,20 L50,5 L55,35 L60,20 L65,20 L70,5 L75,35 L80,20 L85,20 L90,5 L95,35 L100,20" stroke="#f87171" fill="none" strokeWidth="0.5" />
                    </svg>
                 </div>
                 <div className="h-8 bg-white relative flex items-center justify-center">
                    <svg className="w-full h-full opacity-20" viewBox="0 0 100 20">
                      <path d="M0,10 L100,10" stroke="#f87171" fill="none" strokeWidth="0.2" strokeDasharray="1,1" />
                    </svg>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Strip at bottom for Non-V4 */}
      {variant !== 'V4' && variant !== 'V6' && variant !== 'V7' && variant !== 'V8' && variant !== 'V9' && variant !== 'V10' && <ECGStrip height={250} />}
    </div>
  );
}
