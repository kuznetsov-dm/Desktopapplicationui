import { useState } from 'react';
import { Search, Plus, Star, Clock, Tag, Sparkles, Sun, Moon, Filter } from 'lucide-react';

interface SidebarProps {
  selectedMeeting: string | null;
  onSelectMeeting: (id: string) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  tags: string[];
  starred: boolean;
  hasAI: boolean;
  thumbnail?: string;
}

export function Sidebar({ selectedMeeting, onSelectMeeting, theme, onThemeToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'starred' | 'recent'>('all');

  const meetings: Meeting[] = [
    {
      id: '2026-01-13_10-15-00_meeting',
      title: 'Product Strategy Q1 2026',
      date: 'Today, 10:15',
      duration: '1h 24m',
      participants: 8,
      tags: ['strategy', 'product'],
      starred: true,
      hasAI: true,
    },
    {
      id: '2026-01-12_14-30-00_team-sync',
      title: 'Engineering Team Sync',
      date: 'Yesterday, 14:30',
      duration: '45m',
      participants: 12,
      tags: ['engineering', 'weekly'],
      starred: false,
      hasAI: true,
    },
    {
      id: '2026-01-11_09-00-00_standup',
      title: 'Daily Standup',
      date: 'Jan 11, 09:00',
      duration: '15m',
      participants: 6,
      tags: ['daily'],
      starred: false,
      hasAI: true,
    },
    {
      id: '2026-01-10_16-00-00_design',
      title: 'Design Review Session',
      date: 'Jan 10, 16:00',
      duration: '2h 10m',
      participants: 5,
      tags: ['design', 'review'],
      starred: true,
      hasAI: true,
    },
  ];

  const filteredMeetings = meetings.filter(m => {
    if (filter === 'starred' && !m.starred) return false;
    if (searchQuery && !m.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-80 border-r border-white/10 backdrop-blur-xl bg-white/5 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">AI Meetings</div>
              <div className="text-xs text-gray-400">Ultra Edition</div>
            </div>
          </div>
          <button
            onClick={onThemeToggle}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            {theme === 'dark' ? <Sun className="size-4 text-gray-400" /> : <Moon className="size-4 text-gray-400" />}
          </button>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meetings... (⌘K)"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All', icon: Clock },
            { id: 'starred', label: 'Starred', icon: Star },
            { id: 'recent', label: 'Recent', icon: Filter },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setFilter(id as any)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
                filter === id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Meetings List */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-2">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            onClick={() => onSelectMeeting(meeting.id)}
            className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedMeeting === meeting.id
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
            }`}
          >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{meeting.title}</h3>
                    {meeting.hasAI && (
                      <div className="flex-shrink-0 w-5 h-5 rounded-md bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <Sparkles className="size-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>{meeting.date}</span>
                    <span>•</span>
                    <span>{meeting.duration}</span>
                    <span>•</span>
                    <span>{meeting.participants} people</span>
                  </div>
                </div>
                {meeting.starred && (
                  <Star className="size-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {meeting.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-xs text-gray-300"
                  >
                    <Tag className="size-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Meeting Button */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2 group">
          <Plus className="size-5 group-hover:rotate-90 transition-transform duration-200" />
          New Meeting
        </button>
      </div>
    </div>
  );
}
