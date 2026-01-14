import { useState } from 'react';
import { Search, Database, Activity, Zap } from 'lucide-react';

interface SidebarProps {
  selectedMeeting: string | null;
  onSelectMeeting: (id: string) => void;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: 'active' | 'processed' | 'archived';
  aiScore: number;
}

export function Sidebar({ selectedMeeting, onSelectMeeting }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const meetings: Meeting[] = [
    {
      id: '2026-01-13_10-15-00_meeting',
      title: 'PRODUCT_STRATEGY_Q1_2026',
      date: '2026.01.13',
      duration: '84:32',
      status: 'processed',
      aiScore: 94,
    },
    {
      id: '2026-01-12_14-30-00_team-sync',
      title: 'ENGINEERING_TEAM_SYNC',
      date: '2026.01.12',
      duration: '45:18',
      status: 'processed',
      aiScore: 87,
    },
    {
      id: '2026-01-11_09-00-00_standup',
      title: 'DAILY_STANDUP_SESSION',
      date: '2026.01.11',
      duration: '15:22',
      status: 'archived',
      aiScore: 76,
    },
  ];

  const filteredMeetings = meetings.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-cyan-400';
      case 'processed': return 'text-green-400';
      case 'archived': return 'text-amber-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-80 border-r border-cyan-500/30 bg-black/80 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/30">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="size-5 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm font-bold tracking-wider">
              DATABASE
            </span>
          </div>
          <div className="text-cyan-400/60 font-mono text-xs">
            MEETING RECORDS
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-cyan-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH..."
            className="w-full pl-10 pr-4 py-2 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400 font-mono text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-cyan-500/30 grid grid-cols-3 gap-2">
        <div className="bg-cyan-950/30 border border-cyan-500/30 rounded p-2">
          <div className="text-cyan-400/60 font-mono text-[10px] mb-1">TOTAL</div>
          <div className="text-cyan-400 font-mono text-xl font-bold">{meetings.length}</div>
        </div>
        <div className="bg-cyan-950/30 border border-cyan-500/30 rounded p-2">
          <div className="text-green-400/60 font-mono text-[10px] mb-1">ACTIVE</div>
          <div className="text-green-400 font-mono text-xl font-bold">
            {meetings.filter(m => m.status === 'processed').length}
          </div>
        </div>
        <div className="bg-cyan-950/30 border border-cyan-500/30 rounded p-2">
          <div className="text-amber-400/60 font-mono text-[10px] mb-1">ARCHIVE</div>
          <div className="text-amber-400 font-mono text-xl font-bold">
            {meetings.filter(m => m.status === 'archived').length}
          </div>
        </div>
      </div>

      {/* Meetings List */}
      <div className="flex-1 overflow-auto p-2 space-y-2">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            onClick={() => onSelectMeeting(meeting.id)}
            className={`group relative cursor-pointer transition-all ${
              selectedMeeting === meeting.id
                ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400/50'
            } border rounded p-3`}
          >
            {/* OLED Display Effect */}
            <div className="absolute inset-0 bg-black/60 rounded" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(0, 255, 255, 0.1) 50%)',
              backgroundSize: '100% 2px'
            }} />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-cyan-400 mb-1 truncate">
                    {meeting.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-cyan-400/60">{meeting.date}</span>
                    <span className="text-cyan-400/40">|</span>
                    <span className="text-cyan-400/60">{meeting.duration}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className={`w-2 h-2 rounded-full ${
                    meeting.status === 'processed' ? 'bg-green-400' :
                    meeting.status === 'active' ? 'bg-cyan-400' :
                    'bg-amber-400'
                  } animate-pulse`} />
                </div>
              </div>

              {/* AI Score Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400/60">AI SCORE</span>
                  <span className="text-cyan-400">{meeting.aiScore}%</span>
                </div>
                <div className="h-1 bg-cyan-950/50 rounded-full overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-green-400 shadow-lg shadow-cyan-500/50"
                    style={{ width: `${meeting.aiScore}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="mt-2 flex items-center gap-1">
                <Activity className="size-3 text-cyan-400/60" />
                <span className={`font-mono text-[10px] ${getStatusColor(meeting.status)}`}>
                  {meeting.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Panel */}
      <div className="p-4 border-t border-cyan-500/30 space-y-2">
        <button className="w-full py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-mono text-sm font-bold tracking-wider rounded transition-all shadow-lg shadow-cyan-500/50">
          + NEW RECORD
        </button>
        <div className="flex items-center justify-center gap-2 text-cyan-400/60 font-mono text-xs">
          <Zap className="size-3" />
          <span>PRESS ⌘K FOR COMMANDS</span>
        </div>
      </div>
    </div>
  );
}
