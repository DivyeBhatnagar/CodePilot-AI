'use client';

import { useState, useEffect } from 'react';
import FileTree from './FileTree';
import MonacoEditor from './MonacoEditor';
import ProjectToolbar from './ProjectToolbar';
import ProjectTabs from './ProjectTabs';
import { Loader2 } from 'lucide-react';

interface ProjectData {
  project_name: string;
  description: string;
  files: Array<{
    path: string;
    content: string;
    language?: string;
  }>;
  dependencies: string[];
  run_commands: string[];
  setup_instructions: string[];
}

interface CodeEditorLayoutProps {
  projectData: ProjectData;
  onDownload: () => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export default function CodeEditorLayout({ 
  projectData, 
  onDownload, 
  onRegenerate,
  isLoading = false 
}: CodeEditorLayoutProps) {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [currentFileContent, setCurrentFileContent] = useState('');
  const [currentFileLanguage, setCurrentFileLanguage] = useState('plaintext');

  // Auto-select first file on load
  useEffect(() => {
    if (projectData.files.length > 0 && !activeFile) {
      const firstFile = projectData.files[0];
      setActiveFile(firstFile.path);
      setCurrentFileContent(firstFile.content);
      setCurrentFileLanguage(getLanguageFromPath(firstFile.path, firstFile.language));
    }
  }, [projectData.files]);

  const handleFileSelect = (path: string) => {
    const file = projectData.files.find(f => f.path === path);
    if (file) {
      setActiveFile(path);
      setCurrentFileContent(file.content);
      setCurrentFileLanguage(getLanguageFromPath(file.path, file.language));
    }
  };

  const getLanguageFromPath = (path: string, language?: string): string => {
    if (language) return language;

    const ext = path.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'json': 'json',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'md': 'markdown',
      'yaml': 'yaml',
      'yml': 'yaml',
      'sh': 'shell',
      'bash': 'shell',
      'sql': 'sql',
      'go': 'go',
      'rs': 'rust',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
    };

    return languageMap[ext || ''] || 'plaintext';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar */}
      <ProjectToolbar
        projectName={projectData.project_name}
        onDownload={onDownload}
        onRegenerate={onRegenerate}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - File Tree */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Project Files</h3>
          </div>
          <FileTree
            files={projectData.files}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
          />
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeFile ? (
            <>
              <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-mono border-b border-gray-700">
                {activeFile}
              </div>
              <div className="flex-1 overflow-hidden">
                <MonacoEditor
                  content={currentFileContent}
                  language={currentFileLanguage}
                  readOnly={true}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-500">
              <div className="text-center">
                <p className="text-lg mb-2">No file selected</p>
                <p className="text-sm">Select a file from the tree to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Tabs */}
      <ProjectTabs
        dependencies={projectData.dependencies}
        setupInstructions={projectData.setup_instructions}
        runCommands={projectData.run_commands}
      />
    </div>
  );
}
