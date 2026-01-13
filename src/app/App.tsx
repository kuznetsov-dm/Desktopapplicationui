import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MeetingWorkspace } from './components/MeetingWorkspace';
import { CommandPalette } from './components/CommandPalette';
import { QuickActions } from './components/QuickActions';

export default function App() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>('2026-01-13_10-15-00_meeting');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`h-screen overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative h-full flex">
          {/* Sidebar */}
          <Sidebar 
            selectedMeeting={selectedMeeting}
            onSelectMeeting={setSelectedMeeting}
            theme={theme}
            onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          />

          {/* Main Workspace */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <MeetingWorkspace 
              meetingId={selectedMeeting}
              onOpenCommandPalette={() => setShowCommandPalette(true)}
            />
          </div>

          {/* Quick Actions Floating Panel */}
          <QuickActions meetingId={selectedMeeting} />
        </div>

        {/* Command Palette */}
        {showCommandPalette && (
          <CommandPalette 
            onClose={() => setShowCommandPalette(false)}
            onSelectMeeting={setSelectedMeeting}
          />
        )}
      </div>
    </div>
  );
}
