import { Download, Trash2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function TextProcessingConfig() {
  const [provider, setProvider] = useState('sentence-transformers');
  const [model, setModel] = useState('all-MiniLM-L6-v2');
  const [modelInstalled, setModelInstalled] = useState(true);

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900 text-sm">Text Processing</h3>
      </div>
      <div className="p-4 space-y-3">
        {/* Provider Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Embedding Provider
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="sentence-transformers">Sentence Transformers</option>
            <option value="openai">OpenAI Embeddings</option>
            <option value="local">Local Embeddings</option>
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
              <option value="all-MiniLM-L6-v2">all-MiniLM-L6-v2</option>
              <option value="all-mpnet-base-v2">all-mpnet-base-v2</option>
              <option value="paraphrase-multilingual">paraphrase-multilingual</option>
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
      </div>
    </div>
  );
}
