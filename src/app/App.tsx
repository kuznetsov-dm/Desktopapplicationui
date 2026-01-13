import { useState } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';

export default function App() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[10:15:32] Application started',
    '[10:15:32] Ready to process files',
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleStartProcessing = (files: any[]) => {
    setIsProcessing(true);
    addLog(`Starting batch processing for ${files.length} file(s)...`);
    
    // Simulate processing
    setTimeout(() => {
      addLog('✅ Audio ready (cache hit)');
    }, 1000);
    
    setTimeout(() => {
      addLog('✅ Transcript: 2.3k words, ru');
    }, 2500);
    
    setTimeout(() => {
      addLog('✅ Summary ready (DeepSeek)');
    }, 4000);
    
    setTimeout(() => {
      addLog('✅ EDIT complete (TF-IDF)');
      setIsProcessing(false);
      setSelectedMeeting('2026-01-13_10-15-00_meeting');
    }, 5500);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#1E293B]">
      {/* Menu Bar */}
      <div className="h-10 bg-white dark:bg-[#334155] border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-6">
        <div className="font-semibold text-gray-900 dark:text-gray-100">AI Meeting Notes</div>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <button className="hover:text-gray-900 dark:hover:text-white">File</button>
          <button className="hover:text-gray-900 dark:hover:text-white">Edit</button>
          <button className="hover:text-gray-900 dark:hover:text-white">View</button>
          <button className="hover:text-gray-900 dark:hover:text-white">Settings</button>
          <button className="hover:text-gray-900 dark:hover:text-white">Help</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel (35%) */}
        <div className="w-[35%] border-r border-gray-200 dark:border-gray-700">
          <LeftPanel 
            isProcessing={isProcessing}
            onStartProcessing={handleStartProcessing}
            logs={logs}
          />
        </div>

        {/* Right Panel (65%) */}
        <div className="w-[65%]">
          <RightPanel 
            selectedMeeting={selectedMeeting}
            onSelectMeeting={setSelectedMeeting}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-white dark:bg-[#334155] border-t border-gray-200 dark:border-gray-700 flex items-center px-4 text-sm text-gray-600 dark:text-gray-300">
        {isProcessing ? (
          <span>⏳ Processing test2.webm | 2/5 files</span>
        ) : (
          <span>Ready</span>
        )}
      </div>
    </div>
  );
}
