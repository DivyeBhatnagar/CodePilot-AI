'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface FileTreeProps {
  files: { path: string; content: string; language?: string }[];
  activeFile: string | null;
  onFileSelect: (path: string) => void;
}

export default function FileTree({ files, activeFile, onFileSelect }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));

  // Build tree structure from flat file list
  const buildTree = (): FileNode[] => {
    const root: FileNode[] = [];
    const folderMap = new Map<string, FileNode>();

    files.forEach(file => {
      const parts = file.path.split('/');
      let currentPath = '';

      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (index === parts.length - 1) {
          // It's a file
          const fileNode: FileNode = {
            name: part,
            path: file.path,
            type: 'file'
          };

          if (parentPath) {
            const parent = folderMap.get(parentPath);
            if (parent) {
              parent.children = parent.children || [];
              parent.children.push(fileNode);
            }
          } else {
            root.push(fileNode);
          }
        } else {
          // It's a folder
          if (!folderMap.has(currentPath)) {
            const folderNode: FileNode = {
              name: part,
              path: currentPath,
              type: 'folder',
              children: []
            };

            folderMap.set(currentPath, folderNode);

            if (parentPath) {
              const parent = folderMap.get(parentPath);
              if (parent) {
                parent.children = parent.children || [];
                parent.children.push(folderNode);
              }
            } else {
              root.push(folderNode);
            }
          }
        }
      });
    });

    return root;
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isActive = activeFile === node.path;

    if (node.type === 'folder') {
      return (
        <div key={node.path}>
          <div
            onClick={() => toggleFolder(node.path)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
            style={{ paddingLeft: `${depth * 12 + 12}px` }}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-sm text-gray-700 font-medium">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map(child => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.path}
        onClick={() => onFileSelect(node.path)}
        className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg transition-colors ${
          isActive ? 'bg-accent/10 text-accent' : 'hover:bg-gray-100 text-gray-700'
        }`}
        style={{ paddingLeft: `${depth * 12 + 28}px` }}
      >
        <File className="w-4 h-4" />
        <span className="text-sm">{node.name}</span>
      </div>
    );
  };

  const tree = buildTree();

  return (
    <div className="h-full overflow-y-auto py-2">
      {tree.length > 0 ? (
        tree.map(node => renderNode(node))
      ) : (
        <div className="text-center text-gray-500 text-sm py-8">
          No files yet
        </div>
      )}
    </div>
  );
}
