import { useState } from 'react';
import { FileSelector } from './pipeline/FileSelector';
import { StageStatus } from './pipeline/StageStatus';
import { TranscriptionConfig } from './pipeline/TranscriptionConfig';
import { TextProcessingConfig } from './pipeline/TextProcessingConfig';
import { LLMConfig } from './pipeline/LLMConfig';
import { HistoryPanel } from './pipeline/HistoryPanel';
import { ArtifactsPanel } from './pipeline/ArtifactsPanel';
import { LogsPanel } from './pipeline/LogsPanel';
import { Play, Sparkles } from 'lucide-react';

export function PipelineTab() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

  const handleRunPipeline = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedMeeting('2026-01-13_10-15-00_meeting');
    }, 5000);
  };

  return (
    <div className="h-full flex">
      {/* Left Column - Configuration & Control */}
      <div className="w-[400px] border-r border-gray-200 bg-white overflow-auto">
        <div className="p-4 space-y-4">
          {/* File Selection */}
          <FileSelector 
            selectedFiles={selectedFiles}
            onFilesChange={setSelectedFiles}
          />

          {/* Run Pipeline Button with Gradient */}
          <button
            onClick={handleRunPipeline}
            disabled={selectedFiles.length === 0 || isProcessing}
            className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 disabled:shadow-none"
          >
            {isProcessing ? (
              <>
                <Sparkles className="size-4 animate-pulse" />
                Processing...
              </>
            ) : (
              <>
                <Play className="size-4" />
                Run Pipeline
              </>
            )}
          </button>

          {/* Stage Status */}
          <StageStatus isProcessing={isProcessing} />

          {/* Configuration Sections */}
          <TranscriptionConfig />
          <TextProcessingConfig />
          <LLMConfig />
        </div>
      </div>

      {/* Right Column - Outputs & Feedback */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex-1 grid grid-rows-2 overflow-hidden">
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-4 p-4 overflow-hidden">
            <HistoryPanel 
              selectedMeeting={selectedMeeting}
              onSelectMeeting={setSelectedMeeting}
            />
            <ArtifactsPanel selectedMeeting={selectedMeeting} />
          </div>

          {/* Bottom Row */}
          <div className="border-t border-gray-200 p-4 overflow-hidden">
            <LogsPanel isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
}
