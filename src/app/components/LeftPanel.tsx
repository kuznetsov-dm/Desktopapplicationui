import { useState } from 'react';
import { FolderOpen, File, Play, Square } from 'lucide-react';

interface LeftPanelProps {
  isProcessing: boolean;
  onStartProcessing: (files: any[]) => void;
  logs: string[];
}

export function LeftPanel({ isProcessing, onStartProcessing, logs }: LeftPanelProps) {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [whisperModel, setWhisperModel] = useState('ggml-base.bin');
  const [provider, setProvider] = useState('EDIT (Local)');
  const [algorithm, setAlgorithm] = useState('TF-IDF');
  const [style, setStyle] = useState('Structured');
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');

  const handleFileSelect = () => {
    // Mock file selection
    const mockFiles = [
      { id: '1', name: 'test2.webm', size: '12.4 MB', duration: '18:32' },
    ];
    setSelectedFiles(mockFiles);
  };

  const handleAddFolder = () => {
    // Mock folder addition
    const mockFiles = [
      { id: '1', name: 'test2.webm', size: '12.4 MB', duration: '18:32' },
      { id: '2', name: 'meeting-2024-01-13.mp3', size: '45.2 MB', duration: '52:15' },
    ];
    setSelectedFiles(mockFiles);
  };

  const startProcessing = () => {
    if (selectedFiles.length > 0) {
      onStartProcessing(selectedFiles);
      
      // Simulate progress
      let prog = 0;
      const stages = [
        'Loading audio file...',
        'Whisper transcription (47%)',
        'Text processing (TF-IDF)',
        'AI summary generation',
        'Finalizing artifacts',
      ];
      let stageIndex = 0;
      
      const interval = setInterval(() => {
        prog += 3;
        setProgress(Math.min(prog, 100));
        
        if (prog % 20 === 0 && stageIndex < stages.length) {
          setCurrentStage(stages[stageIndex]);
          stageIndex++;
        }
        
        if (prog >= 100) {
          clearInterval(interval);
          setProgress(0);
          setCurrentStage('');
        }
      }, 100);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] dark:bg-[#1E293B] overflow-auto">
      <div className="p-4 space-y-4">
        {/* Processing Files Group */}
        <div className="bg-white dark:bg-[#334155] rounded border border-gray-300 dark:border-gray-600">
          <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748] font-semibold text-sm text-gray-900 dark:text-gray-100">
            🚀 Processing Files
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleFileSelect}
                className="flex-1 px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <File className="size-4" />
                📁 Select File
              </button>
              <button
                onClick={handleAddFolder}
                className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FolderOpen className="size-4" />
                📂 Add Folder
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Whisper Model:
              </label>
              <select
                value={whisperModel}
                onChange={(e) => setWhisperModel(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2D3748] border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100"
              >
                <option>ggml-base.bin</option>
                <option>ggml-small.bin</option>
                <option>ggml-medium.bin</option>
                <option>ggml-large-v3.bin</option>
              </select>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded p-2 min-h-[100px] max-h-[150px] overflow-auto bg-white dark:bg-[#2D3748]">
              {selectedFiles.length === 0 ? (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
                  Selected: 0 files
                </div>
              ) : (
                <div className="space-y-1">
                  {selectedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="px-2 py-1.5 bg-gray-50 dark:bg-[#1E293B] rounded text-sm"
                    >
                      <div className="font-medium text-gray-900 dark:text-gray-100">{file.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {file.size} • {file.duration}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={startProcessing}
              disabled={selectedFiles.length === 0 || isProcessing}
              className="w-full px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="size-4" />
              ▶ Process Selected
            </button>
          </div>
        </div>

        {/* AI Processing Group */}
        <div className="bg-white dark:bg-[#334155] rounded border border-gray-300 dark:border-gray-600">
          <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748] font-semibold text-sm text-gray-900 dark:text-gray-100">
            ⚙️ AI Processing
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Provider:
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2D3748] border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100"
              >
                <option>EDIT (Local)</option>
                <option>DeepSeek</option>
                <option>Ollama</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Algorithm:
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2D3748] border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100"
              >
                <option>TF-IDF</option>
                <option>KeyBERT</option>
                <option>TextRank</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Style:
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2D3748] border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-gray-100"
              >
                <option>Structured</option>
                <option>Concise</option>
                <option>Detailed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Progress Group */}
        {isProcessing && (
          <div className="bg-white dark:bg-[#334155] rounded border border-gray-300 dark:border-gray-600">
            <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748] font-semibold text-sm text-gray-900 dark:text-gray-100">
              📊 Progress
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentStage || 'Processing...'}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <button
                className="w-full px-4 py-2 bg-white dark:bg-[#2D3748] hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-[#EF4444] text-[#EF4444] rounded font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Square className="size-4" />
                ⏹ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Logs Group */}
        <div className="bg-white dark:bg-[#334155] rounded border border-gray-300 dark:border-gray-600 flex-1">
          <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748] font-semibold text-sm text-gray-900 dark:text-gray-100">
            📝 Logs
          </div>
          <div className="p-3 h-[200px] overflow-auto">
            <div className="font-mono text-xs text-gray-700 dark:text-gray-300 space-y-1">
              {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
