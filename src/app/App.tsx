import { useState } from 'react';
import { PipelineTab } from './components/PipelineTab';
import { PluginsTab } from './components/PluginsTab';
import { SettingsTab } from './components/SettingsTab';
import { FileText, Puzzle, Settings } from 'lucide-react';

type TabType = 'pipeline' | 'plugins' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline');

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Menu Bar */}
      <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <FileText className="size-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">AI Meeting Manager</span>
        </div>
        <div className="flex gap-4 text-sm text-gray-600">
          <button className="hover:text-gray-900">File</button>
          <button className="hover:text-gray-900">Edit</button>
          <button className="hover:text-gray-900">View</button>
          <button className="hover:text-gray-900">Help</button>
        </div>
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
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="size-4" />
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
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600">
        <span>Ready</span>
        <div className="flex items-center gap-4">
          <span>Version 2.5.1</span>
          <span>•</span>
          <span>Python 3.11 | PySide6</span>
        </div>
      </div>
    </div>
  );
}
