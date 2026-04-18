"use client";

import React, { useState } from 'react';
import { Image as ImageIcon, Play, RotateCcw, FileWarning, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { message, Tabs } from 'antd';
import { DirectoryPicker } from '@/components/common/DirectoryPicker';

export default function ImageConverterPage() {
  const [directory, setDirectory] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
      total: number;
      success: any[];
      failed: any[];
      skipped: any[];
      unchanged: any[];
  }>({ total: 0, success: [], failed: [], skipped: [], unchanged: [] });
  const [hasRun, setHasRun] = useState(false);

  const handleProcess = async () => {
    if (!directory) {
      message.error('请选择文件夹路径');
      return;
    }

    setLoading(true);
    setHasRun(false);
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

      const success = result.results.filter((r: any) => r.status === 'converted');
      const failed = result.results.filter((r: any) => r.status === 'error');
      const skipped = result.results.filter((r: any) => r.status === 'skipped');
      const unchanged = result.results.filter((r: any) => r.status === 'ok');

      setResults({
          total: result.results.length,
          success,
          failed,
          skipped,
          unchanged
      });
      setHasRun(true);
      message.success(`处理完成，共 ${result.results.length} 个文件`);

    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderList = (list: any[], type: 'success' | 'failed' | 'skipped' | 'unchanged') => {
      if (list.length === 0) {
          return <div className="p-8 text-center text-slate-400">没有相关记录</div>;
      }
      return (
          <div className="space-y-2 max-h-[500px] overflow-y-auto p-1">
              {list.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                      {type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                      {type === 'failed' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                      {type === 'skipped' && <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />}
                      {type === 'unchanged' && <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />}
                      
                      <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-700 truncate">{item.file}</div>
                          <div className="text-xs text-slate-500">
                              {type === 'success' && `转换为: ${item.to} (原格式: ${item.originalFormat})`}
                              {type === 'failed' && `错误: ${item.error}`}
                              {type === 'skipped' && `原因: ${item.reason}`}
                              {type === 'unchanged' && `格式: ${item.format}`}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      );
  };

  const items = [
    {
      key: '1',
      label: (
        <span className="flex items-center gap-2">
           <CheckCircle className="w-4 h-4 text-green-500" />
           成功 ({results.success.length})
        </span>
      ),
      children: renderList(results.success, 'success'),
    },
    {
      key: '2',
      label: (
        <span className="flex items-center gap-2">
           <XCircle className="w-4 h-4 text-red-500" />
           失败 ({results.failed.length})
        </span>
      ),
      children: renderList(results.failed, 'failed'),
    },
    {
      key: '3',
      label: (
        <span className="flex items-center gap-2">
           <CheckCircle className="w-4 h-4 text-blue-300" />
           无需处理 ({results.unchanged.length})
        </span>
      ),
      children: renderList(results.unchanged, 'unchanged'),
    },
    {
      key: '4',
      label: (
        <span className="flex items-center gap-2">
           <AlertCircle className="w-4 h-4 text-amber-500" />
           跳过 ({results.skipped.length})
        </span>
      ),
      children: renderList(results.skipped, 'skipped'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            图片格式转换工具
          </h1>
          <p className="text-slate-500 mt-2">
            自动扫描文件夹，将不符合要求（非jpg/png/gif/svg或虚假png）的图片转换为PNG格式。
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        选择文件夹
                    </label>
                    <DirectoryPicker 
                        value={directory} 
                        onChange={setDirectory} 
                        placeholder="点击选择服务器上的文件夹..."
                    />
                </div>
                <button
                    onClick={handleProcess}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-medium text-white flex items-center gap-2 transition-all h-[42px] ${
                        loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                    }`}
                >
                    {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    {loading ? '开始处理' : '开始处理'}
                </button>
            </div>
        </div>

        {hasRun && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800">处理结果</h2>
                    <div className="text-sm text-slate-500">
                        共扫描 {results.total} 个文件
                    </div>
                </div>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        )}
      </div>
    </div>
  );
}
