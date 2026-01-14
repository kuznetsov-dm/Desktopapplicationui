import { useState } from 'react';

export function LLMConfig() {
  const [provider, setProvider] = useState('openrouter');
  const [selectedModels, setSelectedModels] = useState<string[]>(['gpt-4', 'claude-3-opus']);

  const availableModels = {
    openrouter: [
      'anthropic/claude-3-opus',
      'anthropic/claude-3-sonnet',
      'openai/gpt-4-turbo',
      'openai/gpt-4',
      'openai/gpt-3.5-turbo',
      'google/gemini-pro',
      'deepseek/deepseek-chat',
    ],
    edit: [
      'TF-IDF Summary',
      'KeyBERT Extract',
      'TextRank Summary',
    ],
  };

  const models = provider === 'openrouter' 
    ? availableModels.openrouter 
    : availableModels.edit;

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900 text-sm">LLM / Edit Summary</h3>
      </div>
      <div className="p-4 space-y-3">
        {/* Provider Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Provider
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="edit">EDIT (Text Processing)</option>
            <option value="openrouter">OpenRouter</option>
            <option value="ollama">Ollama (Local)</option>
          </select>
        </div>

        {/* Model List */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Available Models
          </label>
          <div className="border border-gray-200 rounded max-h-[160px] overflow-auto bg-white">
            {models.map((model) => (
              <label
                key={model}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={selectedModels.includes(model)}
                  onChange={() => handleModelToggle(model)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-900">{model}</span>
              </label>
            ))}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {selectedModels.length} model(s) selected
          </div>
        </div>
      </div>
    </div>
  );
}
