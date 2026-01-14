import { Clock, FileText } from 'lucide-react';

interface HistoryPanelProps {
  selectedMeeting: string | null;
  onSelectMeeting: (id: string) => void;
}

export function HistoryPanel({ selectedMeeting, onSelectMeeting }: HistoryPanelProps) {
  const meetings = [
    { id: '2026-01-13_10-15-00_meeting', name: 'Product Strategy Q1', date: '2026-01-13 10:15' },
    { id: '2026-01-12_14-30-00_team-sync', name: 'Engineering Sync', date: '2026-01-12 14:30' },
    { id: '2026-01-11_09-00-00_standup', name: 'Daily Standup', date: '2026-01-11 09:00' },
  ];

  return (
    <div className="border border-gray-200 rounded-lg bg-white flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
        <Clock className="size-4 text-gray-600" />
        <h3 className="font-semibold text-gray-900 text-sm">History</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-100">
          {meetings.map((meeting) => (
            <button
              key={meeting.id}
              onClick={() => onSelectMeeting(meeting.id)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                selectedMeeting === meeting.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
              }`}
            >
              <div className="font-medium text-sm text-gray-900 mb-1">
                {meeting.name}
              </div>
              <div className="text-xs text-gray-500">
                {meeting.date}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
