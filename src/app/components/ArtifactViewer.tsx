import { useState } from 'react';
import { FileText, Hash, GitBranch, Clock, CheckCircle2 } from 'lucide-react';

interface ArtifactViewerProps {
  meetingId: string | null;
}

type TabType = 'transcript' | 'summary' | 'actions' | 'metadata';

export function ArtifactViewer({ meetingId }: ArtifactViewerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('transcript');
  const [selectedVersion, setSelectedVersion] = useState('t1');

  if (!meetingId) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FileText className="size-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select a meeting to view artifacts</p>
        </div>
      </div>
    );
  }

  const versions = [
    { id: 't1', label: 't1', plugin: 'whispercpp', isPinned: true, createdAt: '2026-01-12T14:35:00Z' },
    { id: 't2', label: 't2', plugin: 'whisper-mock', isPinned: false, createdAt: '2026-01-12T15:20:00Z' },
  ];

  const tabs = [
    { id: 'transcript' as TabType, label: 'Transcript' },
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'actions' as TabType, label: 'Actions' },
    { id: 'metadata' as TabType, label: 'Metadata' },
  ];

  const mockTranscript = `[00:00:00] Speaker 1: Good morning everyone, thanks for joining today's team sync.

[00:00:05] Speaker 2: Morning! Happy to be here.

[00:00:08] Speaker 1: Let's start with the product review. We've made significant progress on the AI Meeting Manager project. The core pipeline is now functional.

[00:00:18] Speaker 3: That's great news. What about the plugin architecture?

[00:00:22] Speaker 1: The plugin system is working well. We've implemented the transcription stage with Whisper.cpp, and the versioning system is handling branches correctly.

[00:00:32] Speaker 2: Are we still on track for the demo next week?

[00:00:35] Speaker 1: Yes, absolutely. The UI is coming together nicely. We have the processing panel, history view, and artifact viewer all functional.

[00:00:45] Speaker 3: What about the search functionality?

[00:00:48] Speaker 1: That's in progress. We're building the index infrastructure now. Should be ready by Friday.

[00:00:55] Speaker 2: Perfect. Any blockers we should be aware of?

[00:01:00] Speaker 1: Not at the moment. The team is doing great work. Let's continue with our current velocity.`;

  const mockSummary = `# Team Sync Meeting Summary

## Date
January 12, 2026 at 14:30

## Duration
60 minutes

## Key Discussion Points

### 1. AI Meeting Manager Progress
The team reported significant progress on the AI Meeting Manager project. The core pipeline is now functional and processing meetings successfully.

### 2. Plugin Architecture
The plugin system is working as designed:
- Transcription stage implemented with Whisper.cpp
- Versioning system handling branches correctly
- Cache-hit mechanism functioning properly

### 3. UI Development
Major UI components completed:
- Processing panel with file selection
- History view with meeting list
- Artifact viewer with tabs
- Pipeline progress tracking

### 4. Search Functionality
Currently in progress, with index infrastructure being built. Expected completion by Friday.

## Next Steps
- Continue current development velocity
- Prepare for demo next week
- Complete search functionality by end of week

## Participants
- Speaker 1 (Lead)
- Speaker 2 (Developer)
- Speaker 3 (Developer)`;

  const mockActions = `# Action Items

## High Priority

- [ ] **Complete search functionality** (Assigned: Speaker 3, Due: Friday)
  - Build index infrastructure
  - Implement full-text search
  - Add semantic search capability

- [ ] **Prepare demo for next week** (Assigned: Team, Due: Next Monday)
  - Finalize UI polish
  - Prepare demo script
  - Test end-to-end workflows

## Medium Priority

- [ ] **Document plugin API** (Assigned: Speaker 1, Due: Next Week)
  - Write developer guide
  - Add code examples
  - Create plugin templates

## Completed

- [x] ~~Implement core pipeline~~ ✓
- [x] ~~Build plugin architecture~~ ✓
- [x] ~~Create main UI components~~ ✓`;

  const mockMetadata = {
    meeting_id: meetingId,
    base_name: meetingId,
    schema_version: '1.0',
    created_at: '2026-01-12T14:30:00Z',
    updated_at: '2026-01-12T15:25:00Z',
    naming_mode: 'branched',
    pipeline_runs: 2,
    active_version: 't1',
    nodes: {
      t1: {
        stage_id: 'transcription',
        tool: { plugin_id: 'whispercpp', version: '1.0.0' },
        params: { model: 'large-v3', language_mode: 'auto', two_pass: true },
        fingerprint: 'sha1:a7f8d9e2c1b4a5f6e8d9c7b1a2d3e4f5a6b7c8d9',
      },
      t2: {
        stage_id: 'transcription',
        tool: { plugin_id: 'whisper-mock', version: '1.0.0' },
        params: { model: 'medium', language_mode: 'forced', language: 'en' },
        fingerprint: 'sha1:b8e9c0f1d2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',
      },
    },
  };

  const getContent = () => {
    switch (activeTab) {
      case 'transcript':
        return <pre className="whitespace-pre-wrap text-sm leading-relaxed">{mockTranscript}</pre>;
      case 'summary':
        return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: mockSummary.replace(/\n/g, '<br/>').replace(/^### /gm, '<h3>').replace(/^## /gm, '<h2>').replace(/^# /gm, '<h1>') }} />;
      case 'actions':
        return <pre className="whitespace-pre-wrap text-sm leading-relaxed">{mockActions}</pre>;
      case 'metadata':
        return <pre className="text-sm text-gray-700">{JSON.stringify(mockMetadata, null, 2)}</pre>;
    }
  };

  return (
    <div className="h-full flex overflow-hidden bg-gray-50">
      {/* Sidebar - Versions */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Versions & Branches</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {versions.length} {versions.length === 1 ? 'version' : 'versions'}
          </p>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {versions.map((version) => (
            <button
              key={version.id}
              onClick={() => setSelectedVersion(version.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedVersion === version.id
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="size-4 text-gray-600" />
                  <span className="font-semibold text-gray-900">{version.label}</span>
                </div>
                {version.isPinned && (
                  <CheckCircle2 className="size-4 text-green-600" />
                )}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Plugin: {version.plugin}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="size-3" />
                {new Date(version.createdAt).toLocaleString()}
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="bg-blue-50 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-blue-900 font-medium mb-1">
              <Hash className="size-4" />
              Fingerprint
            </div>
            <div className="text-xs text-blue-700 font-mono break-all">
              sha1:a7f8d9e2...
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex gap-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {getContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
