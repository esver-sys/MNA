"use client";

import React, { useState, useEffect } from 'react';
import { Folder, HardDrive, CornerLeftUp, ChevronRight, RotateCcw } from 'lucide-react';
import { Modal, message } from 'antd';

interface DirectoryItem {
  name: string;
  path: string;
  isDirectory: boolean;
}

interface DirectoryPickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DirectoryPicker: React.FC<DirectoryPickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "点击选择文件夹..." 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [browserPath, setBrowserPath] = useState('');
  const [browserItems, setBrowserItems] = useState<DirectoryItem[]>([]);
  const [browserLoading, setBrowserLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
        // If we have a value, try to start from there (or parent), otherwise root
        // For simplicity, start from root or last browsed for now, unless value is valid path
        // Here we just fetch root if browserPath is empty
        if (!browserPath) fetchDirectories('');
    }
  }, [isModalOpen]);

  const fetchDirectories = async (path: string) => {
    setBrowserLoading(true);
    try {
        const res = await fetch(`/api/fs/list-dirs?path=${encodeURIComponent(path)}`);
        if (!res.ok) throw new Error('Failed to list directories');
        const data = await res.json();
        setBrowserItems(data.items);
        setBrowserPath(data.currentPath || '');
    } catch (error) {
        message.error('无法加载目录');
    } finally {
        setBrowserLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
      fetchDirectories(path);
  };

  const handleGoUp = () => {
      if (!browserPath || browserPath.endsWith(':\\')) {
          fetchDirectories('');
          return;
      }
      const separator = browserPath.includes('\\') ? '\\' : '/';
      const parts = browserPath.split(separator);
      parts.pop();
      if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
          fetchDirectories('');
      } else {
          let newPath = parts.join(separator);
          if (newPath.match(/^[a-zA-Z]:$/)) newPath += '\\';
          fetchDirectories(newPath);
      }
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="relative cursor-pointer group"
      >
        <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
        <input
            type="text"
            readOnly
            value={value || ''}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white cursor-pointer hover:border-blue-400 focus:border-blue-500 outline-none transition-all text-slate-700"
        />
      </div>

      <Modal
        title="选择文件夹"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
            <button 
                key="cancel" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg mr-2"
            >
                取消
            </button>,
            <button 
                key="confirm" 
                onClick={() => {
                    onChange(browserPath);
                    setIsModalOpen(false);
                }}
                disabled={!browserPath}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                选择当前目录
            </button>
        ]}
        width={600}
        centered
      >
        <div className="h-[400px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 p-2 bg-slate-100 rounded-lg text-sm font-mono break-all">
                <HardDrive className="w-4 h-4 text-slate-500 flex-shrink-0" />
                {browserPath || "此电脑"}
            </div>
            
            <div className="flex-1 overflow-y-auto border border-slate-200 rounded-lg">
                {browserPath && (
                     <div 
                        onClick={handleGoUp}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100"
                     >
                        <CornerLeftUp className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-600">... (返回上级)</span>
                     </div>
                )}
                
                {browserLoading ? (
                    <div className="flex items-center justify-center h-20 text-slate-400">
                        <RotateCcw className="w-5 h-5 animate-spin mr-2" />
                        加载中...
                    </div>
                ) : browserItems.length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-slate-400 text-sm">
                        没有子文件夹
                    </div>
                ) : (
                    browserItems.map((item, idx) => (
                        <div 
                            key={idx}
                            onClick={() => handleNavigate(item.path)}
                            className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 group transition-colors"
                        >
                            <Folder className="w-5 h-5 text-yellow-400 group-hover:text-yellow-500" />
                            <span className="text-slate-700 flex-1">{item.name}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                    ))
                )}
            </div>
        </div>
      </Modal>
    </>
  );
};
