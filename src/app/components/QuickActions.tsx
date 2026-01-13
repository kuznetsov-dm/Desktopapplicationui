import { Zap, Copy, Download, Share2, Sparkles, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface QuickActionsProps {
  meetingId: string | null;
}

export function QuickActions({ meetingId }: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!meetingId) return null;

  const actions = [
    { id: 'copy', icon: Copy, label: 'Copy Summary', color: 'from-blue-500 to-cyan-500' },
    { id: 'download', icon: Download, label: 'Export PDF', color: 'from-purple-500 to-pink-500' },
    { id: 'share', icon: Share2, label: 'Share Link', color: 'from-green-500 to-emerald-500' },
    { id: 'insights', icon: Sparkles, label: 'AI Insights', color: 'from-yellow-500 to-orange-500' },
    { id: 'bookmark', icon: Bookmark, label: 'Bookmark', color: 'from-red-500 to-rose-500' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {/* Expanded Actions */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-2 mb-2">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  className="group flex items-center gap-3 px-4 py-3 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                    <Icon className="size-4 text-white" />
                  </div>
                  <span className="text-white font-medium whitespace-nowrap">{action.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/75 transition-all ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          <Zap className="size-7 text-white" />
        </button>
      </div>
    </div>
  );
}
