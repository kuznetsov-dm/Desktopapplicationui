import { useState } from 'react';
import { PipelineTab } from './components/PipelineTab';
import { PluginsTab } from './components/PluginsTab';
import { SettingsTab } from './components/SettingsTab';
import { BrandGuide } from './components/brand/BrandGuide';
import { BrandLogo } from './components/brand/BrandLogo';
import { FileText, Puzzle, Settings, Palette } from 'lucide-react';

type TabType = 'pipeline' | 'plugins' | 'settings' | 'brand';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline');

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Menu Bar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <BrandLogo variant="compact" size="sm" />
          <div className="flex gap-4 text-sm text-gray-600">
            <button className="hover:text-gray-900 transition-colors">File</button>
            <button className="hover:text-gray-900 transition-colors">Edit</button>
            <button className="hover:text-gray-900 transition-colors">View</button>
            <button className="hover:text-gray-900 transition-colors">Help</button>
          </div>
        </div>
        <div className="text-xs text-gray-500">v2.5.1</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex gap-1 px-4">
            {[
              { id: 'pipeline' as TabType, label: 'Pipeline', icon: FileText },
              { id: 'plugins' as TabType, label: 'Plugins', icon: Puzzle },
              { id: 'settings' as TabType, label: 'Settings', icon: Settings },
              { id: 'brand' as TabType, label: 'Brand Guide', icon: Palette },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                  activeTab === id
                    ? 'border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === id ? {
                  borderImage: 'linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899) 1',
                  borderImageSlice: '0 0 1 0'
                } : {}}
              >
                <Icon className={`size-4 ${activeTab === id ? 'text-purple-500' : ''}`} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'pipeline' && <PipelineTab />}
          {activeTab === 'plugins' && <PluginsTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'brand' && <BrandGuide />}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600">
        <span>Ready</span>
        <div className="flex items-center gap-4">
          <span>Python 3.11 | PySide6</span>
          <span>•</span>
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
            AI Meeting Manager
          </span>
        </div>
      </div>
    </div>
  );
}
