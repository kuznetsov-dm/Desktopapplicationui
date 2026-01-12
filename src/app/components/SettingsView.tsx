import { useState } from 'react';
import { Package, Download, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  stage: string;
  version: string;
  status: 'active' | 'inactive' | 'error';
  description: string;
}

interface Model {
  id: string;
  name: string;
  size: string;
  status: 'downloaded' | 'available';
  path?: string;
}

export function SettingsView() {
  const [activeSection, setActiveSection] = useState<'plugins' | 'models' | 'general'>('plugins');

  const [plugins] = useState<Plugin[]>([
    {
      id: 'whispercpp',
      name: 'Whisper.cpp',
      stage: 'Transcription',
      version: '1.0.0',
      status: 'active',
      description: 'High-performance transcription using Whisper.cpp',
    },
    {
      id: 'whisper-fake',
      name: 'Whisper Fake',
      stage: 'Transcription',
      version: '1.0.0',
      status: 'active',
      description: 'Deterministic fake transcription for testing',
    },
    {
      id: 'deepseek',
      name: 'DeepSeek LLM',
      stage: 'LLM Processing',
      version: '1.0.0',
      status: 'active',
      description: 'Online LLM provider for summaries and processing',
    },
    {
      id: 'ollama',
      name: 'Ollama',
      stage: 'LLM Processing',
      version: '1.0.0',
      status: 'inactive',
      description: 'Local LLM processing',
    },
    {
      id: 'cleanup',
      name: 'Text Cleanup',
      stage: 'Text Processing',
      version: '1.0.0',
      status: 'active',
      description: 'Text normalization and cleanup',
    },
    {
      id: 'tasks',
      name: 'Task Manager',
      stage: 'Management',
      version: '1.0.0',
      status: 'active',
      description: 'Extract and manage tasks from meetings',
    },
    {
      id: 'search',
      name: 'Full-Text Search',
      stage: 'Service',
      version: '1.0.0',
      status: 'active',
      description: 'SQLite-based full-text search',
    },
  ]);

  const [models] = useState<Model[]>([
    {
      id: 'large-v3',
      name: 'Whisper Large v3',
      size: '2.9 GB',
      status: 'downloaded',
      path: 'models/ggml-large-v3.bin',
    },
    {
      id: 'medium',
      name: 'Whisper Medium',
      size: '1.5 GB',
      status: 'downloaded',
      path: 'models/ggml-medium.bin',
    },
    {
      id: 'small',
      name: 'Whisper Small',
      size: '466 MB',
      status: 'available',
    },
    {
      id: 'base',
      name: 'Whisper Base',
      size: '142 MB',
      status: 'available',
    },
  ]);

  const getStatusIcon = (status: string) => {
    if (status === 'active' || status === 'downloaded') {
      return <CheckCircle2 className="size-5 text-green-600" />;
    }
    if (status === 'error') {
      return <AlertCircle className="size-5 text-red-600" />;
    }
    return <div className="size-5 rounded-full bg-gray-300" />;
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Section Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 flex gap-2">
          {['plugins', 'models', 'general'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as any)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Plugins Section */}
        {activeSection === 'plugins' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">Installed Plugins</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage pipeline stage plugins
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {plugins.map((plugin) => (
                <div key={plugin.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Package className="size-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{plugin.name}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {plugin.stage}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{plugin.description}</p>
                      <p className="text-xs text-gray-500">Version {plugin.version}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusIcon(plugin.status)}
                    <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Models Section */}
        {activeSection === 'models' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="font-semibold text-gray-900">Whisper Models</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Download and manage transcription models
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {models.map((model) => (
                  <div key={model.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(model.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{model.name}</h3>
                        <p className="text-sm text-gray-600">{model.size}</p>
                        {model.path && (
                          <p className="text-xs text-gray-500 mt-0.5 font-mono">{model.path}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {model.status === 'downloaded' ? (
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="size-4" />
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                          <Download className="size-4" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* General Section */}
        {activeSection === 'general' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">General Settings</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Directory
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="C:/Users/Documents/AI-Meeting-Manager/output"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Browse
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Models Directory
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="C:/Users/Documents/AI-Meeting-Manager/models"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Browse
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Enable cache-hit by default
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Auto-save meeting passports
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Enable debug logging
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
