import { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Share2, 
  Copy, 
  Search,
  Bookmark,
  MessageSquare,
  MoreVertical,
  Zap,
  Clock,
  Users,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { ArtifactViewer } from './ArtifactViewer';
import { AIInsights } from './AIInsights';
import { Timeline } from './Timeline';

interface MeetingWorkspaceProps {
  meetingId: string | null;
  onOpenCommandPalette: () => void;
}

export function MeetingWorkspace({ meetingId, onOpenCommandPalette }: MeetingWorkspaceProps) {
  const [activeView, setActiveView] = useState<'artifacts' | 'insights' | 'timeline'>('artifacts');
  const [showSearch, setShowSearch] = useState(false);

  if (!meetingId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <FileText className="size-10 text-gray-400" />
          </div>
          <p className="text-gray-400 text-lg mb-2">No meeting selected</p>
          <p className="text-gray-500 text-sm">Select a meeting from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">Product Strategy Q1 2026</h1>
                <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Processed
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  Today at 10:15 AM
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  8 participants
                </span>
                <span className="flex items-center gap-1.5">
                  <Play className="size-4" />
                  1h 24m
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                title="Search in meeting (⌘F)"
              >
                <Search className="size-4 text-gray-400 group-hover:text-white" />
              </button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group">
                <Bookmark className="size-4 text-gray-400 group-hover:text-yellow-400" />
              </button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group">
                <MessageSquare className="size-4 text-gray-400 group-hover:text-blue-400" />
              </button>
              <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white">
                <Share2 className="size-4" />
                Share
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25">
                <Download className="size-4" />
                Export
              </button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group">
                <MoreVertical className="size-4 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
              <Zap className="size-4 text-yellow-400" />
              <span className="text-sm text-gray-300">14 AI Insights</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
              <FileText className="size-4 text-blue-400" />
              <span className="text-sm text-gray-300">3,847 words</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
              <MessageSquare className="size-4 text-purple-400" />
              <span className="text-sm text-gray-300">23 action items</span>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="px-8 flex gap-1">
          {[
            { id: 'artifacts', label: 'Artifacts', icon: FileText },
            { id: 'insights', label: 'AI Insights', icon: Sparkles },
            { id: 'timeline', label: 'Timeline', icon: Clock },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as any)}
              className={`px-4 py-3 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-all duration-200 relative ${
                activeView === id
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="size-4" />
              {label}
              {activeView === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-8 py-4 bg-white/5 border-b border-white/10 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in this meeting..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'artifacts' && <ArtifactViewer meetingId={meetingId} />}
        {activeView === 'insights' && <AIInsights meetingId={meetingId} />}
        {activeView === 'timeline' && <Timeline meetingId={meetingId} />}
      </div>
    </div>
  );
}
