"use client";

import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  Image as ImageIcon, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  HardDrive, 
  CornerLeftUp,
  X,
  ExternalLink
} from 'lucide-react';
import { message, Modal } from 'antd';
import Link from 'next/link';

interface DirectoryItem {
  name: string;
  path: string;
  isDirectory: boolean;
}

interface ImageConverterCardProps {
  block: any;
  className?: string;
}

export const ImageConverterCard: React.FC<ImageConverterCardProps> = ({ block, className }) => {
  const [directory, setDirectory] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [browserPath, setBrowserPath] = useState('');
  const [browserItems, setBrowserItems] = useState<DirectoryItem[]>([]);
  const [browserLoading, setBrowserLoading] = useState(false);

  // Initialize browser path when modal opens
  useEffect(() => {
    if (isModalOpen && !browserPath) {
        fetchDirectories('');
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

  const handleProcess = async () => {
    if (!directory) {
      message.error('请选择文件夹');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/tools/image-converter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '处理失败');
      }

      const convertedCount = result.results.filter((r: any) => r.status === 'converted').length;
      const errorCount = result.results.filter((r: any) => r.status === 'error').length;
      
      if (errorCount > 0) {
          message.warning(`处理完成: ${convertedCount} 个文件已转换, ${errorCount} 个出错`);
      } else {
          message.success(`处理完成: ${convertedCount} 个文件已转换`);
      }

    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
      fetchDirectories(path);
  };

  const handleGoUp = () => {
      // Simple parent path calculation
      // On Windows, if path is "C:\", parent should be empty string (root drive list)
      if (!browserPath || browserPath.endsWith(':\\')) {
          fetchDirectories('');
          return;
      }
      // Handle both forward and back slashes just in case
      const separator = browserPath.includes('\\') ? '\\' : '/';
      const parts = browserPath.split(separator);
      parts.pop();
      // If we popped everything (e.g. from "C:"), go to root
      if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
          fetchDirectories('');
      } else {
          let newPath = parts.join(separator);
          // Windows drive fix: "C:" -> "C:\"
          if (newPath.match(/^[a-zA-Z]:$/)) newPath += '\\';
          fetchDirectories(newPath);
      }
  };

  return (
    <>
    <div className={`rounded-2xl shadow-xl backdrop-blur-sm bg-white bg-opacity-90 border border-white border-opacity-20 p-6 flex flex-col justify-between h-full ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{block.title}</h3>
            </div>
            {block.url && (
                <Link href={block.url} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="打开完整页面">
                    <ExternalLink className="w-5 h-5" />
                </Link>
            )}
        </div>
        
        <p className="text-sm text-slate-500 mb-4">{block.description}</p>
        
        <div className="space-y-3">
            <div className="flex gap-2">
                <div 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 truncate cursor-pointer hover:border-blue-400 transition-colors flex items-center gap-2"
                    title={directory || "点击选择文件夹"}
                >
                    <Folder className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {directory || "点击选择文件夹..."}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
         <button
            onClick={handleProcess}
            disabled={loading || !directory}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                loading || !directory
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
            }`}
        >
            {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {loading ? '处理中...' : '开始处理'}
        </button>
      </div>
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
                    setDirectory(browserPath);
                    setIsModalOpen(false);
                }}
                disabled={!browserPath}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                选择当前目录
            </button>
        ]}
        width={600}
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
