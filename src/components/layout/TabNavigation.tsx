'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

export type TabId = 'trends' | 'events' | 'timeline' | 'templates' | 'table' | 'report' | 'annotations';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'trends', label: 'Trends' },
  { id: 'events', label: 'Events' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'templates', label: 'Templates' },
  { id: 'table', label: 'Table' },
  { id: 'report', label: 'Report' },
  { id: 'annotations', label: 'Annotations' },
];

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="flex items-center gap-6 px-6 h-12 bg-white border-b border-gray-200">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "h-full text-sm font-medium border-b-2 transition-colors flex items-center",
            activeTab === tab.id
              ? "border-[#ff8a00] text-[#ff8a00]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
