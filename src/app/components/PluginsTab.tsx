import { Package, CheckCircle2, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  stage: string;
  installed: boolean;
  enabled: boolean;
}

export function PluginsTab() {
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: 'whispercpp',
      name: 'Whisper.cpp',
      description: 'High-performance transcription using Whisper models',
      stage: 'Transcription',
      installed: true,
      enabled: true,
    },
    {
      id: 'whisper-fake',
      name: 'Whisper Fake',
      description: 'Deterministic fake transcription for testing',
      stage: 'Transcription',
      installed: true,
      enabled: false,
    },
    {
      id: 'sentence-transformers',
      name: 'Sentence Transformers',
      description: 'Text embedding and semantic analysis',
      stage: 'Text Processing',
      installed: true,
      enabled: true,
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      description: 'Access to multiple LLM providers',
      stage: 'LLM',
      installed: true,
      enabled: true,
    },
    {
      id: 'ollama',
      name: 'Ollama',
      description: 'Local LLM processing',
      stage: 'LLM',
      installed: false,
      enabled: false,
    },
    {
      id: 'task-manager',
      name: 'Task Manager',
      description: 'Extract and manage action items',
      stage: 'Management',
      installed: true,
      enabled: true,
    },
    {
      id: 'sqlite-search',
      name: 'SQLite Search',
      description: 'Full-text search using SQLite FTS',
      stage: 'Service',
      installed: true,
      enabled: true,
    },
  ]);

  const handleToggleEnabled = (id: string) => {
    setPlugins(prev =>
      prev.map(p => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleInstallToggle = (id: string) => {
    setPlugins(prev =>
      prev.map(p => (p.id === id ? { ...p, installed: !p.installed } : p))
    );
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Plugin Management</h2>
          <p className="text-sm text-gray-600">
            Install and configure plugins to extend functionality
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="size-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {plugin.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {plugin.description}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                    {plugin.stage}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {/* Status */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  {plugin.installed ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="size-3" />
                      Installed
                    </span>
                  ) : (
                    <span className="text-gray-400">Not Installed</span>
                  )}
                </div>

                {/* Enabled Toggle */}
                {plugin.installed && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={plugin.enabled}
                      onChange={() => handleToggleEnabled(plugin.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Enabled</span>
                  </label>
                )}

                {/* Install/Remove Button */}
                <button
                  onClick={() => handleInstallToggle(plugin.id)}
                  className={`w-full py-2 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    plugin.installed
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plugin.installed ? (
                    <>
                      <Trash2 className="size-4" />
                      Remove
                    </>
                  ) : (
                    <>
                      <Download className="size-4" />
                      Install
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
