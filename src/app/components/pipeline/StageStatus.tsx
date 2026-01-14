import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StageStatusProps {
  isProcessing: boolean;
}

type StageState = 'pending' | 'running' | 'finished' | 'failed';

interface Stage {
  id: string;
  name: string;
  status: StageState;
}

export function StageStatus({ isProcessing }: StageStatusProps) {
  const [stages, setStages] = useState<Stage[]>([
    { id: 'media_convert', name: 'Media Convert', status: 'pending' },
    { id: 'transcription', name: 'Transcription', status: 'pending' },
    { id: 'text_processing', name: 'Text Processing', status: 'pending' },
    { id: 'llm_processing', name: 'LLM Processing', status: 'pending' },
    { id: 'management', name: 'Management', status: 'pending' },
    { id: 'service', name: 'Service', status: 'pending' },
  ]);

  useEffect(() => {
    if (isProcessing) {
      // Simulate stage progression
      const timings = [500, 1500, 2500, 3500, 4000, 4500];
      timings.forEach((delay, index) => {
        setTimeout(() => {
          setStages(prev => {
            const updated = [...prev];
            if (index > 0) {
              updated[index - 1].status = 'finished';
            }
            if (index < updated.length) {
              updated[index].status = 'running';
            }
            return updated;
          });
        }, delay);
      });

      setTimeout(() => {
        setStages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].status = 'finished';
          return updated;
        });
      }, 5000);
    } else {
      setStages(prev => prev.map(s => ({ ...s, status: 'pending' })));
    }
  }, [isProcessing]);

  const getStatusIcon = (status: StageState) => {
    switch (status) {
      case 'pending':
        return <Circle className="size-4 text-gray-400" />;
      case 'running':
        return <Loader2 className="size-4 text-blue-600 animate-spin" />;
      case 'finished':
        return <CheckCircle2 className="size-4 text-green-600" />;
      case 'failed':
        return <XCircle className="size-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: StageState) => {
    switch (status) {
      case 'pending':
        return 'text-gray-600';
      case 'running':
        return 'text-blue-600 font-medium';
      case 'finished':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900 text-sm">Stage Status</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50"
          >
            {getStatusIcon(stage.status)}
            <span className={`text-sm ${getStatusColor(stage.status)}`}>
              {stage.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
