import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface TimelineProps {
  meetingId: string;
}

export function Timeline({ meetingId }: TimelineProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const segments = [
    { start: 0, end: 300, title: 'Introduction & Agenda', speaker: 'Sarah Chen', topics: ['opening', 'agenda'] },
    { start: 300, end: 900, title: 'Q1 Performance Review', speaker: 'Marcus Rodriguez', topics: ['metrics', 'ai-features'] },
    { start: 900, end: 1800, title: 'User Feedback Analysis', speaker: 'Marcus Rodriguez', topics: ['feedback', 'satisfaction'] },
    { start: 1800, end: 2400, title: 'Technical Discussion', speaker: 'Elena Kowalski', topics: ['scalability', 'infrastructure'] },
    { start: 2400, end: 3300, title: 'Strategic Planning', speaker: 'Sarah Chen', topics: ['roadmap', 'initiatives'] },
    { start: 3300, end: 4200, title: 'Action Items & Next Steps', speaker: 'Sarah Chen', topics: ['action-items', 'timeline'] },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = segments[segments.length - 1].end;

  return (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-5xl mx-auto">
        {/* Playback Control */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center transition-all shadow-lg shadow-blue-500/25"
            >
              {isPlaying ? (
                <Pause className="size-5 text-white" />
              ) : (
                <Play className="size-5 text-white ml-0.5" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Segments */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50" />

          {/* Segments */}
          <div className="space-y-6">
            {segments.map((segment, index) => (
              <div
                key={index}
                onClick={() => setCurrentTime(segment.start)}
                className="relative pl-16 cursor-pointer group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-gray-900 group-hover:scale-125 transition-transform shadow-lg shadow-blue-500/50" />

                {/* Content Card */}
                <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">
                        {formatTime(segment.start)} - {formatTime(segment.end)}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {segment.title}
                      </h3>
                      <div className="text-sm text-gray-400">{segment.speaker}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor((segment.end - segment.start) / 60)} min
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {segment.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
