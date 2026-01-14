import { FolderOpen, X, File } from 'lucide-react';

interface FileSelectorProps {
  selectedFiles: string[];
  onFilesChange: (files: string[]) => void;
}

export function FileSelector({ selectedFiles, onFilesChange }: FileSelectorProps) {
  const handleAddFiles = () => {
    // Simulate file selection
    const mockFiles = [
      'meeting_recording_2024.mp3',
      'client_call_jan13.wav',
    ];
    onFilesChange([...selectedFiles, ...mockFiles]);
  };

  const handleRemoveFile = (index: number) => {
    onFilesChange(selectedFiles.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    onFilesChange([]);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900 text-sm">File Selection</h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <button
            onClick={handleAddFiles}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors"
          >
            <FolderOpen className="size-4" />
            Add Files
          </button>
          <button
            onClick={handleClear}
            disabled={selectedFiles.length === 0}
            className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 text-sm font-medium rounded transition-colors"
          >
            Clear
          </button>
        </div>

        {/* File List */}
        <div className="border border-gray-200 rounded min-h-[120px] max-h-[200px] overflow-auto bg-white">
          {selectedFiles.length === 0 ? (
            <div className="h-[120px] flex items-center justify-center text-gray-400 text-sm">
              No files selected
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="px-3 py-2 flex items-center justify-between hover:bg-gray-50 group"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <File className="size-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900 truncate">{file}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded transition-opacity"
                  >
                    <X className="size-3 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
