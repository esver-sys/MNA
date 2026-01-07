"use client";

import React, { useState } from 'react';
import { Settings, Send, Server, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function PublishPage() {
  const [env, setEnv] = useState<'sandbox' | 'sandbox2' | 'sandbox3'>('sandbox');
  const [formData, setFormData] = useState({
    template: 'template-cleaner-product',
    version: 'v1.11.1'
  });
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<{ type: 'info' | 'success' | 'error', msg: string, time: string }[]>([]);

  const handlePublish = async () => {
    setLoading(true);
    
    // 创建新的日志数组，避免异步状态更新问题
    const newLogs: { type: 'info' | 'success' | 'error', msg: string, time: string }[] = [];
    
    const addLogImmediate = (type: 'info' | 'success' | 'error', msg: string) => {
      const time = new Date().toLocaleTimeString();
      const log = { type, msg, time };
      newLogs.push(log);
      setLogs([...newLogs]); //更新状态
      return log;
    };

    try {
      addLogImmediate('info', `正在请求环境 ${env} 进行发布...`);
      
      // 使用服务端 API 路由
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ env, formData })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || '发布失败');
      }

      // 安全地访问返回数据
      const status = result.data?.status || 'unknown';
      const template = result.data?.template || formData.template;
      const version = result.data?.version || formData.version;
      
      addLogImmediate('success', `发布成功！模板: ${template}, 版本: ${version}, 状态: ${status}`);
      
    } catch (error: any) {
      addLogImmediate('error', `操作失败: ${error.message}`);
      console.error('Publish error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-8 h-8 text-blue-600" />
            版本发布控制台
          </h1>
          <p className="text-slate-500 mt-2">管理并发布不同测试环境的模板版本</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧配置面板 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-slate-400" />
                发布配置
              </h2>
              
              {/* 环境选择 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">测试环境</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  {(['sandbox', 'sandbox2', 'sandbox3'] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setEnv(item)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium cursor-pointer transition-all ${
                        env === item 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* 表单输入 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Template</label>
                  <input
                    type="text"
                    value={formData.template}
                    onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* 发布按钮 */}
              <button
                onClick={handlePublish}
                disabled={loading}
                className={`w-full mt-8 py-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-semibold text-white transition-all ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
                }`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? '发布中...' : '立即发布'}
              </button>
            </div>
          </div>

          {/* 右侧日志面板 */}
          <div className="lg:col-span-2">
            <div className="bg-[#1e293b] rounded-xl shadow-xl border border-slate-800 h-[600px] flex flex-col">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">Activity Log</span>
                <span className="text-xs text-slate-500 italic">Target: {env.toUpperCase()}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
                {logs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600">
                    <p>等待操作指令...</p>
                  </div>
                )}
                {logs.map((log, index) => (
                  <div key={`${log.time}-${index}`} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    {log.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
                    {log.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />}
                    <span className={
                      log.type === 'success' ? 'text-emerald-400' : 
                      log.type === 'error' ? 'text-rose-400' : 
                      'text-slate-300'
                    }>
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}