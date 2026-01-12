import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProcessingPanel } from './components/ProcessingPanel';
import { HistoryView } from './components/HistoryView';
import { ArtifactViewer } from './components/ArtifactViewer';
import { SearchView } from './components/SearchView';
import { SettingsView } from './components/SettingsView';

type ViewType = 'processing' | 'history' | 'artifacts' | 'search' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('processing');
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-gray-900">AI Meeting Manager</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {currentView === 'processing' && 'Process new meetings'}
              {currentView === 'history' && 'Meeting history'}
              {currentView === 'artifacts' && 'View artifacts'}
              {currentView === 'search' && 'Search meetings'}
              {currentView === 'settings' && 'Settings & plugins'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">v1.0.0</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {currentView === 'processing' && (
            <ProcessingPanel onMeetingCreated={(id) => {
              setSelectedMeeting(id);
              setCurrentView('artifacts');
            }} />
          )}
          {currentView === 'history' && (
            <HistoryView onSelectMeeting={(id) => {
              setSelectedMeeting(id);
              setCurrentView('artifacts');
            }} />
          )}
          {currentView === 'artifacts' && (
            <ArtifactViewer meetingId={selectedMeeting} />
          )}
          {currentView === 'search' && <SearchView />}
          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
