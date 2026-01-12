import { useState } from 'react';
import { Upload, FileAudio, X, Settings, Play } from 'lucide-react';
import { PipelineProgress } from './PipelineProgress';

interface ProcessingPanelProps {
  onMeetingCreated: (meetingId: string) => void;
}

interface SelectedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function ProcessingPanel({ onMeetingCreated }: ProcessingPanelProps) {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [forceRun, setForceRun] = useState(false);
  const [selectedPlugins, setSelectedPlugins] = useState({
    transcription: 'whispercpp',
    textProcessing: 'cleanup',
    llm: 'deepseek',
    management: 'tasks',
    service: 'search',
  });

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFiles(files);
    }
  };

  const addFiles = (files: File[]) => {
    const newFiles: SelectedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const startProcessing = () => {
    setIsProcessing(true);
    // Simulate processing completion
    setTimeout(() => {
      setIsProcessing(false);
      onMeetingCreated('2026-01-12_14-30-00_team-sync');
      setSelectedFiles([]);
    }, 8000);
  };

  if (isProcessing) {
    return <PipelineProgress files={selectedFiles} forceRun={forceRun} />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* File Selection Area */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Select Files</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Choose audio/video files or drag them here
            </p>
          </div>

          <div className="p-6">
            {selectedFiles.length === 0 ? (
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="size-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  Supports: MP3, MP4, WAV, M4A, OGG, WEBM
                </p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="audio/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {selectedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <FileAudio className="size-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">{file.name}</div>
                        <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="size-4 text-gray-600" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => document.getElementById('file-input')?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  + Add more files
                </button>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="audio/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* Pipeline Configuration */}
        {selectedFiles.length > 0 && (
          <>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">Pipeline Configuration</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Select plugins for each stage
                  </p>
                </div>
                <Settings className="size-5 text-gray-400" />
              </div>

              <div className="p-6 space-y-4">
                {[
                  { id: 'transcription', label: 'Transcription', options: ['whispercpp', 'whisper-fake', 'whisper-mock'] },
                  { id: 'textProcessing', label: 'Text Processing', options: ['cleanup', 'segmentation', 'text-fake'] },
                  { id: 'llm', label: 'LLM Processing', options: ['deepseek', 'ollama', 'llm-fake'] },
                  { id: 'management', label: 'Management', options: ['tasks', 'projects', 'management-fake'] },
                  { id: 'service', label: 'Service', options: ['search', 'smart-search', 'service-fake'] },
                ].map((stage) => (
                  <div key={stage.id} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {stage.label}
                    </label>
                    <select
                      value={selectedPlugins[stage.id as keyof typeof selectedPlugins]}
                      onChange={(e) =>
                        setSelectedPlugins(prev => ({ ...prev, [stage.id]: e.target.value }))
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {stage.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={forceRun}
                      onChange={(e) => setForceRun(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Force run (ignore cache-hit)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startProcessing}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="size-5" />
              Start Processing {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
