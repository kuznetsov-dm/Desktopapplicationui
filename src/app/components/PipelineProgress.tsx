import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle, Loader2, Clock } from 'lucide-react';

interface PipelineProgressProps {
  files: Array<{ id: string; name: string }>;
  forceRun: boolean;
}

type StageStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped' | 'cache-hit';

interface Stage {
  id: string;
  label: string;
  status: StageStatus;
  duration?: number;
  message?: string;
}

export function PipelineProgress({ files, forceRun }: PipelineProgressProps) {
  const [stages, setStages] = useState<Stage[]>([
    { id: 'validate', label: 'Validate Inputs', status: 'pending' },
    { id: 'convert', label: 'Audio Conversion', status: 'pending' },
    { id: 'transcription', label: 'Transcription (whispercpp)', status: 'pending' },
    { id: 'text', label: 'Text Processing (cleanup)', status: 'pending' },
    { id: 'llm', label: 'LLM Processing (deepseek)', status: 'pending' },
    { id: 'management', label: 'Management (tasks)', status: 'pending' },
    { id: 'service', label: 'Service (search)', status: 'pending' },
    { id: 'artifacts', label: 'Write Artifacts', status: 'pending' },
    { id: 'meeting', label: 'Update Meeting Passport', status: 'pending' },
  ]);

  const [logs, setLogs] = useState<string[]>([
    `Starting pipeline for ${files.length} file(s)...`,
    forceRun ? 'Force run enabled - ignoring cache' : 'Cache-hit enabled',
  ]);

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // Simulate pipeline execution
    const stageTimings = [500, 800, 3000, 1200, 1500, 600, 400, 300, 200];
    let elapsed = 0;

    stageTimings.forEach((duration, index) => {
      setTimeout(() => {
        setStages(prev => {
          const updated = [...prev];
          if (index > 0) {
            updated[index - 1].status = index === 3 && !forceRun ? 'cache-hit' : 'success';
            updated[index - 1].duration = stageTimings[index - 1];
          }
          updated[index].status = 'running';
          return updated;
        });

        const stage = stages[index];
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting ${stage.label}...`]);
        
        if (index === 2) {
          setTimeout(() => {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Detected language: en`]);
          }, 500);
          setTimeout(() => {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Processing 243 segments...`]);
          }, 1500);
        }

        if (index === 3 && !forceRun) {
          setTimeout(() => {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Cache-hit: fingerprint matched, skipping execution`]);
          }, 200);
        }

        setCurrentProgress(((index + 1) / stages.length) * 100);
      }, elapsed);

      elapsed += duration;
    });

    // Final completion
    setTimeout(() => {
      setStages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].status = 'success';
        updated[updated.length - 1].duration = stageTimings[stageTimings.length - 1];
        return updated;
      });
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Pipeline completed successfully`]);
      setCurrentProgress(100);
    }, elapsed);
  }, []);

  const getStatusIcon = (status: StageStatus) => {
    switch (status) {
      case 'pending':
        return <Circle className="size-5 text-gray-300" />;
      case 'running':
        return <Loader2 className="size-5 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle2 className="size-5 text-green-600" />;
      case 'cache-hit':
        return <Clock className="size-5 text-orange-600" />;
      case 'failed':
        return <AlertCircle className="size-5 text-red-600" />;
      case 'skipped':
        return <Circle className="size-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case 'running':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'cache-hit':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      case 'skipped':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Processing Pipeline</h2>
            <span className="text-sm text-gray-500">
              {Math.round(currentProgress)}% complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        {/* Stage List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="font-semibold text-gray-900">Pipeline Stages</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {stages.map((stage) => (
              <div key={stage.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(stage.status)}
                  <div>
                    <div className={`font-medium ${getStatusColor(stage.status)}`}>
                      {stage.label}
                    </div>
                    {stage.message && (
                      <div className="text-sm text-gray-500 mt-0.5">{stage.message}</div>
                    )}
                  </div>
                </div>
                {stage.duration && (
                  <div className="text-sm text-gray-500">
                    {(stage.duration / 1000).toFixed(1)}s
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="border-b border-gray-700 px-6 py-3 bg-gray-800">
            <h3 className="font-semibold text-gray-100 text-sm">Logs</h3>
          </div>
          <div className="p-4 font-mono text-sm text-gray-300 max-h-64 overflow-auto">
            {logs.map((log, index) => (
              <div key={index} className="py-0.5">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
