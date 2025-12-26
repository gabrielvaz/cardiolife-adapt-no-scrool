'use client';

import { TabId, TabNavigation } from '@/components/layout/TabNavigation';
import { useVariant } from '@/context/VariantContext';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Views
import TrendsView from '@/components/views/TrendsView';
import EventsView from '@/components/views/EventsView';
import TimelineView from '@/components/views/TimelineView';
import TemplatesView from '@/components/views/TemplatesView';
import TableView from '@/components/views/TableView';
import ReportView from '@/components/views/ReportView';

import { useRouter, useParams } from 'next/navigation';

export default function ECGDashboard({ initialTab }: { initialTab?: TabId }) {
  const router = useRouter();
  const params = useParams();
  const { variant } = useVariant();
  
  const activeTab = initialTab || (params.tab as TabId) || 'trends';
  const currentVariant = (params.variant as string) || variant.toLowerCase();

  const handleTabChange = (tab: TabId) => {
    router.push(`/${currentVariant}/${tab}`);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'trends': return <TrendsView />;
      case 'events': return <EventsView />;
      case 'timeline': return <TimelineView />;
      case 'templates': return <TemplatesView />;
      case 'table': return <TableView />;
      case 'report': return <ReportView />;
      case 'annotations': return <div className="p-10 text-center text-gray-400">Annotations view coming soon...</div>;
      default: return <TrendsView />;
    }
  };

  return (
    <div className={cn(
      "flex-1 flex overflow-hidden bg-[#f4f6f8]",
      variant === 'V5' ? "flex-row" : "flex-col"
    )}>
      {/* V5 Sidebar */}
      {variant === 'V5' && (
        <aside className="w-56 bg-white border-r border-gray-200 text-gray-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Andrea Matias</h1>
            <p className="text-[10px] text-gray-400">ID: 31235674 • 46y • Male</p>
          </div>
          
          <nav className="flex-1 flex flex-col py-4 px-2 gap-1">
             {[
               { id: 'trends', label: 'Dashboard Trends' },
               { id: 'events', label: 'Clinical Events' },
               { id: 'timeline', label: 'Full Disclosure' },
               { id: 'templates', label: 'Beat Templates' },
               { id: 'table', label: 'Tabular Data' },
               { id: 'report', label: 'Medical Report' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => handleTabChange(tab.id as TabId)}
                 className={cn(
                   "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                   activeTab === tab.id 
                     ? "bg-[#ff8a00] text-white shadow-lg shadow-orange-900/20" 
                     : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                 )}
               >
                 {tab.label}
               </button>
             ))}
          </nav>

          <div className="p-6 border-t border-gray-100 mt-auto">
             <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                   <span>Exam ID</span>
                   <span className="text-gray-700">2253145</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                   <span>Duration</span>
                   <span className="text-gray-700">85h 57m</span>
                </div>
             </div>
          </div>
        </aside>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative">
        
        {/* Standard Header (V1-V4 Only) */}
        {!['V5', 'V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) && (
          <>
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 px-3 py-1 text-xs border border-gray-200 rounded text-gray-600 hover:bg-gray-50">
                  <ChevronLeft size={14} /> Back
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Andrea Matias</h1>
                  <p className="text-[10px] text-gray-400">Exam Captured: 19/03/2023 13:59 • Reviewed: 01/01/2023 19:32</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                {[
                  { label: 'Patient ID', value: '31235674' },
                  { label: 'Age', value: '46' },
                  { label: 'Gender', value: 'Male' },
                  { label: 'CRS', value: '3' },
                  { label: 'Date', value: '19/05/2025' },
                  { label: 'Exam ID', value: '2253145' },
                  { label: 'Duration', value: '85h 57m' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-[10px] uppercase text-gray-400 font-bold whitespace-nowrap">{item.label}</p>
                    <p className="text-sm font-bold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-8 px-6 h-10 bg-white border-b border-gray-100">
               <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-400 uppercase">Options:</span>
                 <select className="text-xs border-none font-medium bg-transparent text-gray-600 outline-none"><option>Leads: ch1, ch2</option></select>
                 <select className="text-xs border-none font-medium bg-transparent text-gray-600 outline-none"><option>Show: 2 min</option></select>
                 <select className="text-xs border-none font-medium bg-transparent text-gray-600 outline-none"><option>Gain: 5</option></select>
               </div>
            </div>

            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </>
        )}

        {/* V6 Shell - Light Mode Cinematic */}
        {variant === 'V6' && (
           <div className="flex-1 flex flex-col overflow-hidden bg-white text-gray-900">
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/95 to-transparent z-20 flex items-center justify-between px-8 pointer-events-none sticky-header">
                 <div className="flex items-center gap-4 pointer-events-auto">
                    <h1 className="text-lg font-bold tracking-tight text-gray-900">Andrea Matias</h1>
                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">ID: 31235674</span>
                 </div>
                 <div className="flex items-center gap-6 pointer-events-auto text-xs font-medium text-gray-500">
                    <span>19/05/2025</span>
                    <span>85h 57m</span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">AM</div>
                 </div>
              </div>
              <div className="flex-1 overflow-hidden relative pt-16">
                 {renderActiveTab()}
              </div>
              <div className="h-14 bg-white border-t border-gray-100 flex items-center justify-center gap-8 shrink-0 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                 {['trends', 'events', 'timeline', 'templates', 'table', 'report'].map((id) => (
                    <button
                        key={id}
                        onClick={() => handleTabChange(id as TabId)}
                        className={cn(
                           "text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all",
                           activeTab === id ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-400 hover:text-gray-800"
                        )}
                    >
                        {id}
                    </button>
                 ))}
              </div>
           </div>
        )}

        {/* V7 Shell */}
        {variant === 'V7' && (
          <div className="flex-1 flex overflow-hidden bg-gray-50">
             <aside className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-6 shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="w-10 h-10 bg-[#ff8a00] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">C</div>
                <nav className="flex flex-col gap-4 w-full px-2">
                   {[
                     { id: 'trends', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                     { id: 'events', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }, // Fixed info/alert icon
                     { id: 'timeline', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }, // Clock
                     { id: 'templates', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' }, // Grid
                     { id: 'table', icon: 'M3 10h18M3 14h18m-9-4v8m-7-8v8m14-8v8M3 6l0 12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2z' }, // Table
                     { id: 'report', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }, // File
                   ].map((tab) => (
                      <button key={id} onClick={() => handleTabChange(tab.id as TabId)} title={tab.id} className={cn("w-14 h-14 rounded-xl flex items-center justify-center transition-all mx-auto", activeTab === tab.id ? "bg-[#fff7ed] text-[#ff8a00] shadow-sm shadow-orange-100" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600")}>
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                             <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                         </svg>
                      </button>
                   ))}
                </nav>
             </aside>
             <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white mx-4 my-4 rounded-2xl shadow-sm border border-gray-100/50 relative">
                <div className="absolute top-4 left-6 z-10"><h1 className="text-2xl font-bold text-gray-800 tracking-tight">Andrea Matias</h1></div>
                <div className="flex-1 overflow-hidden pt-16">{renderActiveTab()}</div>
             </main>
             <aside className="w-72 bg-white border-l border-gray-100 flex flex-col shrink-0 z-20">
                <div className="p-6 border-b border-gray-50"><h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Exam Details</h3></div>
             </aside>
          </div>
        )}

        {/* V8 Bento Shell */}
        {variant === 'V8' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-6">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">AM</div>
                   <div><h1 className="text-sm font-bold text-gray-800">Andrea Matias</h1></div>
                </div>
                <div className="flex bg-white p-1 rounded-xl shadow-sm">
                  {['trends', 'events', 'timeline', 'report'].map((id) => (
                    <button key={id} onClick={() => handleTabChange(id as TabId)} className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-wider", activeTab === id ? "bg-gray-900 text-white shadow-md" : "text-gray-400 hover:text-gray-600")}>{id}</button>
                  ))}
                </div>
             </div>
             <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden ring-4 ring-white/50">{renderActiveTab()}</div>
          </div>
        )}

        {/* V9 Compact Shell */}
        {variant === 'V9' && (
           <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <header className="h-10 border-b border-gray-200 flex items-center px-4 bg-gray-50/50 justify-between shrink-0">
                 <div className="flex items-center gap-4">
                    <span className="font-bold text-xs text-gray-900">Andrea Matias</span>
                    <div className="h-3 w-px bg-gray-300" />
                    <nav className="flex items-center gap-1">
                       {['trends', 'events', 'timeline', 'table'].map((id) => (
                          <button key={id} onClick={() => handleTabChange(id as TabId)} className={cn("px-2 py-0.5 text-[10px] font-bold uppercase rounded hover:bg-gray-200 transition-colors", activeTab === id ? "text-blue-600 bg-blue-50" : "text-gray-500")}>{id}</button>
                       ))}
                    </nav>
                 </div>
              </header>
              <div className="flex-1 overflow-hidden">{renderActiveTab()}</div>
           </div>
        )}

        {/* V10 Data-Left Shell */}
        {variant === 'V10' && (
           <div className="flex-1 flex overflow-hidden bg-white">
              <aside className="w-64 border-r border-gray-100 bg-[#fbfbfb] flex flex-col shrink-0 overflow-hidden">
                 <div className="p-6 border-b border-gray-100"><h1 className="text-xl font-black tracking-tighter text-gray-900 mb-1">CARDIOLIFE</h1></div>
                 <div className="p-6 flex-1 overflow-y-auto">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6"><h4 className="text-xs font-bold text-gray-900">Andrea Matias</h4></div>
                    <div className="flex flex-col gap-1">
                       {['trends', 'events', 'timeline', 'report'].map((id) => (
                          <button key={id} onClick={() => handleTabChange(id as TabId)} className={cn("flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all text-left uppercase tracking-wide", activeTab === id ? "bg-gray-900 text-white shadow-lg shadow-gray-200 translate-x-2" : "text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm")}>{id}</button>
                       ))}
                    </div>
                 </div>
              </aside>
              <div className="flex-1 flex flex-col min-w-0">
                 <div className="flex-1 overflow-hidden relative">{renderActiveTab()}</div>
              </div>
           </div>
        )}

        {/* Standard View (V1-V4) & V5 Content */}
        {!['V6', 'V7', 'V8', 'V9', 'V10'].includes(variant) && (
            <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white relative">
               {variant === 'V5' && (
                  <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
                     <h1 className="text-xl font-bold text-gray-800">Exam Analysis</h1>
                     <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block"><p className="text-sm font-bold text-gray-900">Dr. Sarah Wilson</p><p className="text-xs text-gray-500">Cardiologist</p></div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">SW</div>
                     </div>
                  </div>
               )}
               <div className={cn("flex-1 overflow-hidden relative", variant === 'V5' && "p-8")}>
                  {renderActiveTab()}
               </div>
            </div>
        )}

      </div>
    </div>
  );
}
