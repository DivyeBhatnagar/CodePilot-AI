'use client';

import { useState } from 'react';
import { Package, BookOpen, Terminal } from 'lucide-react';

interface ProjectTabsProps {
  dependencies: string[];
  setupInstructions: string[];
  runCommands: string[];
}

export default function ProjectTabs({ dependencies, setupInstructions, runCommands }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState<'dependencies' | 'setup' | 'run'>('dependencies');

  const tabs = [
    { id: 'dependencies' as const, label: 'Dependencies', icon: Package },
    { id: 'setup' as const, label: 'Setup Guide', icon: BookOpen },
    { id: 'run' as const, label: 'Run Commands', icon: Terminal },
  ];

  return (
    <div className="bg-white border-t border-gray-200">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 max-h-48 overflow-y-auto">
        {activeTab === 'dependencies' && (
          <div className="space-y-2">
            {dependencies.length > 0 ? (
              dependencies.map((dep, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">{dep}</code>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No dependencies</p>
            )}
          </div>
        )}

        {activeTab === 'setup' && (
          <div className="space-y-3">
            {setupInstructions.length > 0 ? (
              setupInstructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 pt-0.5">{instruction}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No setup instructions</p>
            )}
          </div>
        )}

        {activeTab === 'run' && (
          <div className="space-y-2">
            {runCommands.length > 0 ? (
              runCommands.map((cmd, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-3">
                  <code className="text-green-400 text-sm font-mono">{cmd}</code>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No run commands</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
