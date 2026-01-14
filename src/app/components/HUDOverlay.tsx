import { Activity, Cpu, HardDrive, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HUDOverlayProps {
  meetingId: string | null;
}

export function HUDOverlay({ meetingId }: HUDOverlayProps) {
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memUsage, setMemUsage] = useState(42);
  const [aiScore, setAiScore] = useState(94);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(15, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setMemUsage(prev => Math.max(30, Math.min(85, prev + (Math.random() - 0.5) * 5)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!meetingId) return null;

  return (
    <div className="fixed right-4 top-20 w-64 space-y-3 pointer-events-none">
      {/* AI Score Display */}
      <div className="bg-black/90 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="size-4 text-cyan-400" />
          <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
            AI ANALYSIS SCORE
          </span>
        </div>
        
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgba(0, 255, 255, 0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - aiScore / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#00ff00" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono text-cyan-400" style={{
                textShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
              }}>
                {aiScore}
              </div>
              <div className="text-xs font-mono text-cyan-400/60">PERCENT</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-black/90 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="size-4 text-cyan-400" />
          <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
            SYSTEM METRICS
          </span>
        </div>

        <div className="space-y-3">
          {/* CPU */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Cpu className="size-3 text-green-400" />
                <span className="text-cyan-400/80 font-mono text-xs">CPU</span>
              </div>
              <span className="text-cyan-400 font-mono text-xs font-bold">{cpuUsage.toFixed(0)}%</span>
            </div>
            <div className="h-1 bg-cyan-950/50 rounded-full overflow-hidden border border-cyan-500/30">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-1000 shadow-lg shadow-cyan-500/50"
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>

          {/* Memory */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <HardDrive className="size-3 text-green-400" />
                <span className="text-cyan-400/80 font-mono text-xs">MEMORY</span>
              </div>
              <span className="text-cyan-400 font-mono text-xs font-bold">{memUsage.toFixed(0)}%</span>
            </div>
            <div className="h-1 bg-cyan-950/50 rounded-full overflow-hidden border border-cyan-500/30">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-1000 shadow-lg shadow-cyan-500/50"
                style={{ width: `${memUsage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-black/90 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-cyan-400/60">INSIGHTS:</span>
            <span className="text-green-400 font-bold">14</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-400/60">ACTIONS:</span>
            <span className="text-green-400 font-bold">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-400/60">SEGMENTS:</span>
            <span className="text-green-400 font-bold">247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-400/60">CONFIDENCE:</span>
            <span className="text-green-400 font-bold">92%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
