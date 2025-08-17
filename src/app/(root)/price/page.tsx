'use client'
import React, { useState, useEffect } from 'react'

interface ComponentItem {
  name: string
  price: number
  quantity?: number
  allowMultiple?: boolean
}

interface PcConfig {
  cpu: ComponentItem
  motherboard: ComponentItem
  memory: ComponentItem
  graphics: ComponentItem
  storage: ComponentItem
  power: ComponentItem
  case: ComponentItem
  cooling: ComponentItem
  monitor: ComponentItem
  keyboard: ComponentItem
  mouse: ComponentItem
  speaker: ComponentItem
}

export default function PcPriceCalculator() {
  const [config, setConfig] = useState<PcConfig>({
    cpu: { name: '', price: 0, quantity: 1, allowMultiple: false },
    motherboard: { name: '', price: 0, quantity: 1, allowMultiple: false },
    memory: { name: '', price: 0, quantity: 1, allowMultiple: true },
    graphics: { name: '', price: 0, quantity: 1, allowMultiple: true },
    storage: { name: '', price: 0, quantity: 1, allowMultiple: true },
    power: { name: '', price: 0, quantity: 1, allowMultiple: false },
    case: { name: '', price: 0, quantity: 1, allowMultiple: false },
    cooling: { name: '', price: 0, quantity: 1, allowMultiple: true },
    monitor: { name: '', price: 0, quantity: 1, allowMultiple: true },
    keyboard: { name: '', price: 0, quantity: 1, allowMultiple: true },
    mouse: { name: '', price: 0, quantity: 1, allowMultiple: true },
    speaker: { name: '', price: 0, quantity: 1, allowMultiple: true }
  })

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const total = Object.values(config).reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    setTotalPrice(total)
  }, [config])

  const updateComponent = (component: keyof PcConfig, field: 'name' | 'price' | 'quantity', value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [component]: {
        ...prev[component],
        [field]: value
      }
    }))
  }

  const componentLabels = {
    cpu: { label: 'CPU 处理器', icon: '🖥️', color: 'bg-blue-50 border-blue-200' },
    motherboard: { label: '主板', icon: '🔌', color: 'bg-green-50 border-green-200' },
    memory: { label: '内存', icon: '💾', color: 'bg-purple-50 border-purple-200' },
    graphics: { label: '显卡', icon: '🎮', color: 'bg-red-50 border-red-200' },
    storage: { label: '存储硬盘', icon: '💿', color: 'bg-yellow-50 border-yellow-200' },
    power: { label: '电源', icon: '⚡', color: 'bg-orange-50 border-orange-200' },
    case: { label: '机箱', icon: '📦', color: 'bg-gray-50 border-gray-200' },
    cooling: { label: '散热器', icon: '❄️', color: 'bg-cyan-50 border-cyan-200' },
    monitor: { label: '显示器', icon: '🖥️', color: 'bg-indigo-50 border-indigo-200' },
    keyboard: { label: '键盘', icon: '⌨️', color: 'bg-pink-50 border-pink-200' },
    mouse: { label: '鼠标', icon: '🖱️', color: 'bg-teal-50 border-teal-200' },
    speaker: { label: '音响', icon: '🔊', color: 'bg-emerald-50 border-emerald-200' }
  }

  const resetAll = () => {
    setConfig({
      cpu: { name: '', price: 0, quantity: 1, allowMultiple: false },
      motherboard: { name: '', price: 0, quantity: 1, allowMultiple: false },
      memory: { name: '', price: 0, quantity: 1, allowMultiple: true },
      graphics: { name: '', price: 0, quantity: 1, allowMultiple: true },
      storage: { name: '', price: 0, quantity: 1, allowMultiple: true },
      power: { name: '', price: 0, quantity: 1, allowMultiple: false },
      case: { name: '', price: 0, quantity: 1, allowMultiple: false },
      cooling: { name: '', price: 0, quantity: 1, allowMultiple: true },
      monitor: { name: '', price: 0, quantity: 1, allowMultiple: true },
      keyboard: { name: '', price: 0, quantity: 1, allowMultiple: true },
      mouse: { name: '', price: 0, quantity: 1, allowMultiple: true },
      speaker: { name: '', price: 0, quantity: 1, allowMultiple: true }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💻 电脑价格计算器</h1>
          <p className="text-gray-600">配置您的理想电脑，实时计算总价格</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Components Configuration */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🔧</span>
                硬件配置
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(componentLabels).slice(0, 8).map(([key, info]) => (
                  <div key={key} className={`p-4 rounded-lg border-2 ${info.color} transition-all hover:shadow-md`}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{info.icon}</span>
                      <h3 className="font-semibold text-gray-700">{info.label}</h3>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="输入型号名称"
                        value={config[key as keyof PcConfig].name}
                        onChange={(e) => updateComponent(key as keyof PcConfig, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2 text-gray-500">¥</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={config[key as keyof PcConfig].price || ''}
                            onChange={(e) => updateComponent(key as keyof PcConfig, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        {config[key as keyof PcConfig].allowMultiple && (
                          <div className="w-20">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              placeholder="数量"
                              value={config[key as keyof PcConfig].quantity || 1}
                              onChange={(e) => updateComponent(key as keyof PcConfig, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Components */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🎯</span>
                外设配件
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(componentLabels).slice(8).map(([key, info]) => (
                  <div key={key} className={`p-4 rounded-lg border-2 ${info.color} transition-all hover:shadow-md`}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{info.icon}</span>
                      <h3 className="font-semibold text-gray-700">{info.label}</h3>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="输入型号名称"
                        value={config[key as keyof PcConfig].name}
                        onChange={(e) => updateComponent(key as keyof PcConfig, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2 text-gray-500">¥</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={config[key as keyof PcConfig].price || ''}
                            onChange={(e) => updateComponent(key as keyof PcConfig, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        {config[key as keyof PcConfig].allowMultiple && (
                          <div className="w-20">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              placeholder="数量"
                              value={config[key as keyof PcConfig].quantity || 1}
                              onChange={(e) => updateComponent(key as keyof PcConfig, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">💰</span>
                价格汇总
              </h2>
              
              <div className="space-y-3 mb-6">
                {Object.entries(config).map(([key, item]) => {
                  if (!item.name && !item.price) return null
                  const totalItemPrice = item.price * (item.quantity || 1)
                  return (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{componentLabels[key as keyof typeof componentLabels].icon}</span>
                        <div>
                          <div className="font-medium text-gray-700">
                            {componentLabels[key as keyof typeof componentLabels].label}
                            {item.quantity && item.quantity > 1 && (
                              <span className="text-sm text-blue-600 ml-1">x{item.quantity}</span>
                            )}
                          </div>
                          {item.name && (
                            <div className="text-sm text-gray-500 truncate max-w-32">
                              {item.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-800">
                        {item.quantity && item.quantity > 1 ? (
                          <div className="text-right">
                            <div className="text-sm text-gray-500">¥{item.price.toLocaleString()} × {item.quantity}</div>
                            <div>¥{totalItemPrice.toLocaleString()}</div>
                          </div>
                        ) : (
                          <div>¥{item.price.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">总价格:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{totalPrice.toLocaleString()}
                  </span>
                </div>
                
                <button
                  onClick={resetAll}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">🔄</span>
                  重置所有配置
                </button>
              </div>
              
              {totalPrice > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">💡 价格建议</h3>
                  <div className="text-sm text-blue-700">
                    {totalPrice < 3000 && "入门级配置，适合办公和轻度娱乐"}
                    {totalPrice >= 3000 && totalPrice < 6000 && "中端配置，适合游戏和专业工作"}
                    {totalPrice >= 6000 && totalPrice < 10000 && "高端配置，适合高性能游戏和创作"}
                    {totalPrice >= 10000 && "顶级配置，适合专业工作站和发烧友"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
