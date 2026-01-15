import { Package, CheckCircle2, Download, Trash2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  stage: string;
  installed: boolean;
  enabled: boolean;
  featured?: boolean;
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
      featured: true,
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
      featured: true,
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
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
            Plugin Management
          </h2>
          <p className="text-sm text-gray-600">
            Install and configure plugins to extend functionality
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              className={`bg-white rounded-lg p-4 hover:shadow-lg transition-all relative ${
                plugin.featured
                  ? 'border-2 border-transparent bg-gradient-to-br from-white via-white to-purple-50'
                  : 'border border-gray-200'
              }`}
              style={plugin.featured ? {
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              } : {}}
            >
              {plugin.featured && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="size-3" />
                  Featured
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  plugin.featured
                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
                    : 'bg-blue-50'
                }`}>
                  <Package className={`size-5 ${
                    plugin.featured ? 'text-white' : 'text-blue-600'
                  }`} />
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
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Enabled</span>
                  </label>
                )}

                {/* Install/Remove Button */}
                <button
                  onClick={() => handleInstallToggle(plugin.id)}
                  className={`w-full py-2 rounded text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    plugin.installed
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : plugin.featured
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
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
