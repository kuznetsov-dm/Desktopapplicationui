import { FileText, File } from 'lucide-react';
import { useState } from 'react';

interface ArtifactsPanelProps {
  selectedMeeting: string | null;
}

export function ArtifactsPanel({ selectedMeeting }: ArtifactsPanelProps) {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);

  const artifacts = selectedMeeting ? [
    { id: 'transcript', name: 'transcript.txt', type: 'text' },
    { id: 'summary', name: 'summary.md', type: 'text' },
    { id: 'structured', name: 'structured.json', type: 'json' },
    { id: 'meeting', name: 'MEETING.json', type: 'json' },
  ] : [];

  const artifactContent = {
    transcript: `[00:00:00] Speaker 1: Good morning everyone, let's begin our product strategy discussion for Q1 2026.

[00:00:08] Speaker 2: Thanks for joining. I've prepared a comprehensive overview of our current metrics and proposed initiatives.

[00:00:15] Speaker 1: Excellent. Let's start with the user engagement data from Q4.`,
    summary: `# Product Strategy Q1 2026

## Executive Summary
This meeting covered strategic planning for Q1 2026, focusing on product development priorities and resource allocation.

## Key Discussion Points
1. User engagement metrics from Q4 2025
2. Proposed feature roadmap
3. Resource allocation and team capacity
4. Risk assessment and mitigation strategies

## Action Items
- Finalize Q1 roadmap by Jan 20
- Schedule follow-up with engineering leads
- Prepare budget proposal for leadership review`,
    structured: `{
  "meeting_id": "2026-01-13_10-15-00_meeting",
  "topics": ["product strategy", "Q1 planning"],
  "action_items": 3,
  "participants": 5,
  "sentiment": "positive"
}`,
    meeting: `{
  "schema_version": "1.0",
  "meeting_id": "2026-01-13_10-15-00_meeting",
  "created_at": "2026-01-13T10:15:00Z",
  "pipeline_runs": 1,
  "artifacts": ["transcript.txt", "summary.md", "structured.json"]
}`,
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
        <FileText className="size-4 text-gray-600" />
        <h3 className="font-semibold text-gray-900 text-sm">Artifacts</h3>
      </div>
      
      {!selectedMeeting ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Select a meeting to view artifacts
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Artifact List */}
          <div className="w-48 border-r border-gray-200 overflow-auto bg-gray-50">
            <div className="divide-y divide-gray-200">
              {artifacts.map((artifact) => (
                <button
                  key={artifact.id}
                  onClick={() => setSelectedArtifact(artifact.id)}
                  className={`w-full px-3 py-2.5 text-left hover:bg-gray-100 transition-colors ${
                    selectedArtifact === artifact.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <File className="size-4 flex-shrink-0" />
                    <span className="text-xs truncate">{artifact.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Content */}
          <div className="flex-1 overflow-auto">
            {selectedArtifact ? (
              <pre className="p-4 text-xs text-gray-900 font-mono leading-relaxed whitespace-pre-wrap">
                {artifactContent[selectedArtifact as keyof typeof artifactContent]}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Select an artifact to view content
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
