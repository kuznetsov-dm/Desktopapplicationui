import { useState } from 'react';
import { Search, FileText, Sparkles, Download, Share2, Settings, Zap } from 'lucide-react';

interface CommandPaletteProps {
  onClose: () => void;
  onSelectMeeting: (id: string) => void;
}

export function CommandPalette({ onClose, onSelectMeeting }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'new', icon: FileText, label: 'New Meeting', action: 'Create new meeting', shortcut: '⌘N' },
    { id: 'export', icon: Download, label: 'Export Current', action: 'Export to PDF/MD', shortcut: '⌘E' },
    { id: 'share', icon: Share2, label: 'Share Meeting', action: 'Generate share link', shortcut: '⌘S' },
    { id: 'insights', icon: Sparkles, label: 'AI Insights', action: 'Show AI analysis', shortcut: '⌘I' },
    { id: 'settings', icon: Settings, label: 'Settings', action: 'Open settings', shortcut: '⌘,' },
  ];

  const meetings = [
    { id: '1', title: 'Product Strategy Q1 2026', date: 'Today' },
    { id: '2', title: 'Engineering Team Sync', date: 'Yesterday' },
    { id: '3', title: 'Design Review Session', date: 'Jan 10' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredMeetings = meetings.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search meetings..."
              autoFocus
              className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto">
          {filteredCommands.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">Commands</div>
              {filteredCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                      <Icon className="size-4 text-gray-400 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{cmd.label}</div>
                      <div className="text-xs text-gray-400">{cmd.action}</div>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{cmd.shortcut}</div>
                  </button>
                );
              })}
            </div>
          )}

          {filteredMeetings.length > 0 && (
            <div className="p-2 border-t border-white/10">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">Recent Meetings</div>
              {filteredMeetings.map((meeting) => (
                <button
                  key={meeting.id}
                  onClick={() => {
                    onSelectMeeting(meeting.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <FileText className="size-4 text-gray-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{meeting.title}</div>
                    <div className="text-xs text-gray-400">{meeting.date}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {query && filteredCommands.length === 0 && filteredMeetings.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded">⏎</kbd> Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}
