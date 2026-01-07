'use client'
import React, { useState } from "react";

export default function Dosc() {
  const [svgInput, setSvgInput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      if (!svgInput.trim()) {
        setError("请输入SVG代码");
        return;
      }

      // 验证SVG格式
      if (!svgInput.startsWith("<svg")) {
        setError("请输入有效的SVG代码");
        return;
      }

      // 转换为base64
      const encoded = btoa(unescape(encodeURIComponent(svgInput)));
      const base64 = `data:image/svg+xml;base64,${encoded}`;
      setBase64Output(base64);
      setError("");
    } catch (err) {
      setError("转换失败，请检查SVG代码格式");
      console.error("转换错误:", err);
    }
  };

  const handleCopy = () => {
    if (base64Output) {
      navigator.clipboard.writeText(base64Output);
      alert("已复制到剪贴板");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">SVG 转 Base64</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">SVG 代码输入</h2>
            <textarea
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="请输入SVG代码..."
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleConvert}
            >
              转换为 Base64
            </button>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Base64 输出</h2>
            {base64Output ? (
              <>
                <div className="relative">
                  <textarea
                    className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={base64Output}
                    readOnly
                  />
                  <button
                    className="absolute top-2 right-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    onClick={handleCopy}
                  >
                    复制
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">预览:</h3>
                  <div className="w-full h-48 border-2 border-gray-200 rounded-lg p-2 flex items-center justify-center">
                    <img src={base64Output} alt="SVG 预览" className="max-w-full max-h-full" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">转换结果将显示在这里</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
