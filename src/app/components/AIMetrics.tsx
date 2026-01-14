import { Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';

interface AIMetricsProps {
  meetingId: string;
}

export function AIMetrics({ meetingId }: AIMetricsProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Metric Cards */}
        {[
          { icon: Brain, label: 'AI CONFIDENCE', value: '92%', color: 'cyan' },
          { icon: TrendingUp, label: 'SENTIMENT', value: '+78%', color: 'green' },
          { icon: AlertTriangle, label: 'RISKS', value: '3', color: 'amber' },
          { icon: Target, label: 'ACCURACY', value: '94%', color: 'cyan' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-black/80 border border-cyan-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`size-4 text-${metric.color}-400`} />
                <span className={`text-${metric.color}-400/60 font-mono text-xs`}>
                  {metric.label}
                </span>
              </div>
              <div className={`text-${metric.color}-400 font-mono text-3xl font-bold`}>
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
