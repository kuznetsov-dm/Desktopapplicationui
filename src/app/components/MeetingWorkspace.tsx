import { useState } from 'react';
import { 
  Terminal, 
  Activity,
  Cpu,
  Database,
  Zap
} from 'lucide-react';
import { OLEDTerminal } from './OLEDTerminal';
import { AIMetrics } from './AIMetrics';
import { ArtifactTabs } from './ArtifactTabs';

interface MeetingWorkspaceProps {
  meetingId: string | null;
  onOpenCommandPalette: () => void;
}

export function MeetingWorkspace({ meetingId, onOpenCommandPalette }: MeetingWorkspaceProps) {
  const [activePanel, setActivePanel] = useState<'terminal' | 'artifacts'>('artifacts');

  if (!meetingId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Terminal className="size-16 text-cyan-400/30 mx-auto mb-4" />
          <p className="text-cyan-400/60 font-mono text-sm">NO MEETING LOADED</p>
          <p className="text-cyan-400/40 font-mono text-xs mt-2">SELECT FROM DATABASE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Meeting Header */}
      <div className="border-b border-cyan-500/30 bg-cyan-950/20">
        <div className="px-6 py-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-cyan-400 font-mono text-lg font-bold tracking-wider">
                  PRODUCT_STRATEGY_Q1_2026
                </div>
                <div className="px-2 py-1 bg-green-500/20 border border-green-400/50 rounded text-green-400 font-mono text-xs">
                  PROCESSED
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-cyan-400/60">
                <span>2026.01.13 10:15:00</span>
                <span>|</span>
                <span>84:32 DURATION</span>
                <span>|</span>
                <span>8 PARTICIPANTS</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-black/60 border border-cyan-500/30 rounded p-2">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="size-3 text-cyan-400" />
                <span className="text-cyan-400/60 font-mono text-[10px]">AI INSIGHTS</span>
              </div>
              <div className="text-cyan-400 font-mono text-xl font-bold">14</div>
            </div>
            <div className="bg-black/60 border border-cyan-500/30 rounded p-2">
              <div className="flex items-center gap-2 mb-1">
                <Database className="size-3 text-cyan-400" />
                <span className="text-cyan-400/60 font-mono text-[10px]">WORD COUNT</span>
              </div>
              <div className="text-cyan-400 font-mono text-xl font-bold">3.8K</div>
            </div>
            <div className="bg-black/60 border border-cyan-500/30 rounded p-2">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="size-3 text-cyan-400" />
                <span className="text-cyan-400/60 font-mono text-[10px]">ACTIONS</span>
              </div>
              <div className="text-cyan-400 font-mono text-xl font-bold">23</div>
            </div>
            <div className="bg-black/60 border border-cyan-500/30 rounded p-2">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="size-3 text-cyan-400" />
                <span className="text-cyan-400/60 font-mono text-[10px]">AI SCORE</span>
              </div>
              <div className="text-green-400 font-mono text-xl font-bold">94%</div>
            </div>
          </div>
        </div>

        {/* Panel Tabs */}
        <div className="flex border-t border-cyan-500/30">
          <button
            onClick={() => setActivePanel('artifacts')}
            className={`px-6 py-2 font-mono text-xs font-bold tracking-wider transition-all relative ${
              activePanel === 'artifacts'
                ? 'text-cyan-400 bg-cyan-500/20'
                : 'text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10'
            }`}
          >
            [ARTIFACTS]
            {activePanel === 'artifacts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            )}
          </button>
          <button
            onClick={() => setActivePanel('terminal')}
            className={`px-6 py-2 font-mono text-xs font-bold tracking-wider transition-all relative ${
              activePanel === 'terminal'
                ? 'text-cyan-400 bg-cyan-500/20'
                : 'text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10'
            }`}
          >
            [TERMINAL OUTPUT]
            {activePanel === 'terminal' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1">
          {activePanel === 'artifacts' && <ArtifactTabs meetingId={meetingId} />}
          {activePanel === 'terminal' && <OLEDTerminal meetingId={meetingId} />}
        </div>
      </div>
    </div>
  );
}
