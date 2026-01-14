import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LogsPanelProps {
  isProcessing: boolean;
}

export function LogsPanel({ isProcessing }: LogsPanelProps) {
  const [logs, setLogs] = useState<string[]>([
    '[10:15:00] Application started',
    '[10:15:00] Configuration loaded from config/plugins.toml',
    '[10:15:01] Ready to process files',
  ]);

  useEffect(() => {
    if (isProcessing) {
      const processingLogs = [
        '[10:15:05] Starting pipeline processing...',
        '[10:15:05] Stage: Media Convert - Starting',
        '[10:15:06] Stage: Media Convert - Completed',
        '[10:15:06] Stage: Transcription - Starting',
        '[10:15:06] Using Whisper.cpp with model: base',
        '[10:15:08] Transcription progress: 25%',
        '[10:15:09] Transcription progress: 50%',
        '[10:15:10] Transcription progress: 75%',
        '[10:15:11] Transcription progress: 100%',
        '[10:15:11] Stage: Transcription - Completed',
        '[10:15:11] Stage: Text Processing - Starting',
        '[10:15:12] Stage: Text Processing - Completed',
        '[10:15:12] Stage: LLM Processing - Starting',
        '[10:15:13] Using OpenRouter with model: gpt-4',
        '[10:15:14] Stage: LLM Processing - Completed',
        '[10:15:14] Stage: Management - Starting',
        '[10:15:14] Stage: Management - Completed',
        '[10:15:14] Stage: Service - Starting',
        '[10:15:15] Stage: Service - Completed',
        '[10:15:15] Pipeline processing completed successfully',
        '[10:15:15] Meeting saved: 2026-01-13_10-15-00_meeting',
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < processingLogs.length) {
          setLogs(prev => [...prev, processingLogs[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
        <Terminal className="size-4 text-gray-600" />
        <h3 className="font-semibold text-gray-900 text-sm">Logs</h3>
      </div>
      <div className="flex-1 overflow-auto bg-gray-900 p-4">
        <div className="font-mono text-xs text-green-400 space-y-1">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
