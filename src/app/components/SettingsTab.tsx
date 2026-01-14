import { Key, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function SettingsTab() {
  const [apiKey, setApiKey] = useState('');
  const [authMode, setAuthMode] = useState('user-key');
  const [newModel, setNewModel] = useState('');
  const [models, setModels] = useState([
    { id: 'gpt-4', name: 'openai/gpt-4', status: 'available' as const },
    { id: 'gpt-4-turbo', name: 'openai/gpt-4-turbo', status: 'available' as const },
    { id: 'claude-3-opus', name: 'anthropic/claude-3-opus', status: 'available' as const },
    { id: 'gemini-pro', name: 'google/gemini-pro', status: 'testing' as const },
  ]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [managementPlugin, setManagementPlugin] = useState('task-manager');
  const [servicePlugin, setServicePlugin] = useState('sqlite-search');

  const handleAddModel = () => {
    if (newModel.trim()) {
      setModels(prev => [
        ...prev,
        { id: newModel.toLowerCase().replace(/\//g, '-'), name: newModel, status: 'available' as const },
      ]);
      setNewModel('');
    }
  };

  const handleTestModel = (id: string) => {
    setModels(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'testing' as const } : m))
    );
    setTimeout(() => {
      setModels(prev =>
        prev.map(m => (m.id === id ? { ...m, status: 'available' as const } : m))
      );
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle2 className="size-4 text-green-600" />;
      case 'unavailable':
        return <XCircle className="size-4 text-red-600" />;
      case 'testing':
        return <Loader2 className="size-4 text-blue-600 animate-spin" />;
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* OpenRouter Settings */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Key className="size-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">OpenRouter Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenRouter API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Auth Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authentication Mode
              </label>
              <select
                value={authMode}
                onChange={(e) => setAuthMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="user-key">User Key</option>
                <option value="free-key">Free Key</option>
                <option value="paid-key">Paid Key</option>
              </select>
            </div>

            {/* Model Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Models
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-2">
                <div className="max-h-64 overflow-auto">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`px-4 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedModel === model.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{model.name}</span>
                        {getStatusIcon(model.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Model */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="e.g., anthropic/claude-3-sonnet"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddModel}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Add Model
                </button>
              </div>

              {/* Test Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => selectedModel && handleTestModel(selectedModel)}
                  disabled={!selectedModel}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Test Selected
                </button>
                <button className="flex-1 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                  Test All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Management Plugin */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Management Plugin</h2>
          </div>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Plugin
            </label>
            <select
              value={managementPlugin}
              onChange={(e) => setManagementPlugin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="task-manager">Task Manager</option>
              <option value="project-tracker">Project Tracker</option>
              <option value="management-fake">Management Fake</option>
            </select>
          </div>
        </div>

        {/* Service Plugin */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Service Plugin</h2>
          </div>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Plugin
            </label>
            <select
              value={servicePlugin}
              onChange={(e) => setServicePlugin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="sqlite-search">SQLite Search</option>
              <option value="elasticsearch">Elasticsearch</option>
              <option value="vector-search">Vector Search</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
