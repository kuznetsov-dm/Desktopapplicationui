import { Download, Trash2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function TranscriptionConfig() {
  const [provider, setProvider] = useState('whisper.cpp');
  const [model, setModel] = useState('base');
  const [languageMode, setLanguageMode] = useState('auto');
  const [languageCode, setLanguageCode] = useState('en');
  const [modelInstalled, setModelInstalled] = useState(true);

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900 text-sm">Transcription</h3>
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
            <option value="whisper.cpp">Whisper.cpp</option>
            <option value="whisper.fake">Whisper Fake</option>
            <option value="whisper.mock">Whisper Mock</option>
          </select>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Model
          </label>
          <div className="flex gap-2">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tiny">Tiny (75 MB)</option>
              <option value="base">Base (142 MB)</option>
              <option value="small">Small (466 MB)</option>
              <option value="medium">Medium (1.5 GB)</option>
              <option value="large-v3">Large v3 (2.9 GB)</option>
            </select>
            {modelInstalled ? (
              <button
                onClick={() => setModelInstalled(false)}
                className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded flex items-center gap-1 transition-colors"
                title="Remove Model"
              >
                <Trash2 className="size-4" />
              </button>
            ) : (
              <button
                onClick={() => setModelInstalled(true)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-1 transition-colors"
                title="Download Model"
              >
                <Download className="size-4" />
              </button>
            )}
          </div>
          {modelInstalled && (
            <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="size-3" />
              Model installed
            </div>
          )}
        </div>

        {/* Language Mode */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Language Mode
          </label>
          <select
            value={languageMode}
            onChange={(e) => setLanguageMode(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="auto">Auto-detect</option>
            <option value="none">None</option>
            <option value="forced">Forced</option>
          </select>
        </div>

        {/* Language Code (only for forced) */}
        {languageMode === 'forced' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Language Code
            </label>
            <input
              type="text"
              value={languageCode}
              onChange={(e) => setLanguageCode(e.target.value)}
              placeholder="e.g., en, ru, es"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
