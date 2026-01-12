import { useState } from 'react';
import { FileAudio, Calendar, Clock, CheckCircle2, GitBranch, Pin } from 'lucide-react';

interface Meeting {
  id: string;
  baseName: string;
  createdAt: string;
  duration: number;
  status: 'success' | 'partial' | 'failed';
  runsCount: number;
  hasBranches: boolean;
  isPinned: boolean;
  fileSize: string;
}

interface HistoryViewProps {
  onSelectMeeting: (meetingId: string) => void;
}

export function HistoryView({ onSelectMeeting }: HistoryViewProps) {
  const [meetings] = useState<Meeting[]>([
    {
      id: '2026-01-12_14-30-00_team-sync',
      baseName: '2026-01-12_14-30-00_team-sync',
      createdAt: '2026-01-12T14:30:00Z',
      duration: 3600,
      status: 'success',
      runsCount: 2,
      hasBranches: true,
      isPinned: true,
      fileSize: '45.2 MB',
    },
    {
      id: '2026-01-11_10-15-00_product-review',
      baseName: '2026-01-11_10-15-00_product-review',
      createdAt: '2026-01-11T10:15:00Z',
      duration: 5400,
      status: 'success',
      runsCount: 1,
      hasBranches: false,
      isPinned: false,
      fileSize: '62.8 MB',
    },
    {
      id: '2026-01-10_16-45-00_client-call',
      baseName: '2026-01-10_16-45-00_client-call',
      createdAt: '2026-01-10T16:45:00Z',
      duration: 2700,
      status: 'partial',
      runsCount: 3,
      hasBranches: true,
      isPinned: false,
      fileSize: '31.5 MB',
    },
    {
      id: '2026-01-09_09-00-00_standup',
      baseName: '2026-01-09_09-00-00_standup',
      createdAt: '2026-01-09T09:00:00Z',
      duration: 900,
      status: 'success',
      runsCount: 1,
      hasBranches: false,
      isPinned: false,
      fileSize: '10.2 MB',
    },
    {
      id: '2026-01-08_15-30-00_design-workshop',
      baseName: '2026-01-08_15-30-00_design-workshop',
      createdAt: '2026-01-08T15:30:00Z',
      duration: 7200,
      status: 'success',
      runsCount: 1,
      hasBranches: false,
      isPinned: false,
      fileSize: '84.1 MB',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'success' | 'partial' | 'failed'>('all');

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-700',
      partial: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || styles.success;
  };

  const filteredMeetings = meetings.filter(m => filter === 'all' || m.status === filter);

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({meetings.length})
            </button>
            <button
              onClick={() => setFilter('success')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'success'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Success ({meetings.filter(m => m.status === 'success').length})
            </button>
            <button
              onClick={() => setFilter('partial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'partial'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Partial ({meetings.filter(m => m.status === 'partial').length})
            </button>
          </div>
        </div>

        {/* Meeting List */}
        <div className="space-y-3">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => onSelectMeeting(meeting.id)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FileAudio className="size-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {meeting.baseName}
                      </h3>
                      {meeting.isPinned && (
                        <Pin className="size-4 text-orange-600 flex-shrink-0" />
                      )}
                      {meeting.hasBranches && (
                        <GitBranch className="size-4 text-purple-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        {formatDate(meeting.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {formatDuration(meeting.duration)}
                      </span>
                      <span>{meeting.fileSize}</span>
                      <span>{meeting.runsCount} {meeting.runsCount === 1 ? 'run' : 'runs'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(meeting.status)}`}>
                    {meeting.status}
                  </span>
                  {meeting.status === 'success' && (
                    <CheckCircle2 className="size-5 text-green-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
