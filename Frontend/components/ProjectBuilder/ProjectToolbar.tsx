'use client';

import { Download, RefreshCw, Sparkles } from 'lucide-react';

interface ProjectToolbarProps {
  projectName: string;
  onDownload: () => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export default function ProjectToolbar({ 
  projectName, 
  onDownload, 
  onRegenerate,
  isLoading = false 
}: ProjectToolbarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{projectName}</h2>
          <p className="text-xs text-gray-500">AI Generated Project</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
        <button
          onClick={onDownload}
          disabled={isLoading}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Download ZIP
        </button>
      </div>
    </div>
  );
}
