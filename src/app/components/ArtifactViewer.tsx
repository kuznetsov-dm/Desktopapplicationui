import { useState } from 'react';
import { Copy, Check, Download, Maximize2, Type, Code, Eye } from 'lucide-react';

interface ArtifactViewerProps {
  meetingId: string;
}

export function ArtifactViewer({ meetingId }: ArtifactViewerProps) {
  const [selectedArtifact, setSelectedArtifact] = useState('transcript');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');

  const artifacts = [
    { id: 'transcript', label: 'Transcript', icon: Type, words: 3847 },
    { id: 'summary', label: 'Summary', icon: Eye, words: 420 },
    { id: 'edited', label: 'Structured', icon: Code, words: 892 },
  ];

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const transcriptContent = [
    {
      timestamp: '00:00:00',
      speaker: 'Sarah Chen',
      text: 'Good morning everyone! Let\'s dive into our Q1 product strategy. We have some exciting developments to discuss today.',
      sentiment: 'positive'
    },
    {
      timestamp: '00:00:15',
      speaker: 'Marcus Rodriguez',
      text: 'Thanks Sarah. I\'ve prepared a comprehensive analysis of our user feedback from the past quarter. The AI-powered insights feature is getting incredible traction.',
      sentiment: 'positive'
    },
    {
      timestamp: '00:00:32',
      speaker: 'Sarah Chen',
      text: 'That\'s fantastic! Can you share the key metrics?',
      sentiment: 'positive'
    },
    {
      timestamp: '00:00:38',
      speaker: 'Marcus Rodriguez',
      text: 'Absolutely. We\'re seeing 87% user satisfaction on the AI features, and the processing time has decreased by 45% since our optimization sprint.',
      sentiment: 'positive'
    },
    {
      timestamp: '00:00:55',
      speaker: 'Elena Kowalski',
      text: 'This is impressive. However, we need to address the scalability concerns that engineering raised last week.',
      sentiment: 'neutral'
    },
  ];

  const summaryContent = `# Product Strategy Q1 2026 - Executive Summary

## Key Highlights

### Performance Metrics
- **User Satisfaction**: 87% positive feedback on AI features
- **Processing Speed**: 45% improvement in transcription time
- **Adoption Rate**: 234% increase in active users

### Strategic Initiatives

**1. AI Integration Expansion**
The team achieved significant milestones in AI-powered features. User engagement with intelligent insights increased by 3x compared to Q4 2025.

**2. Infrastructure Optimization**
Engineering successfully reduced processing latency through advanced caching mechanisms and distributed computing architecture.

**3. User Experience Enhancement**
New glassmorphic UI elements and micro-interactions resulted in 65% longer session durations.

### Action Items Identified
- Scale infrastructure to handle 10x current load
- Implement multi-language support (Phase 1: Spanish, German, French)
- Launch beta program for enterprise customers
- Develop mobile companion app

### Concerns & Risks
- **Scalability**: Current architecture may struggle beyond 100k concurrent users
- **Competition**: New entrant in the market with aggressive pricing
- **Regulatory**: GDPR compliance review needed for EU expansion

### Next Steps
1. Q2 roadmap planning session (Jan 20)
2. Infrastructure audit completion (Jan 25)
3. Beta program launch (Feb 1)`;

  const structuredContent = `# Structured Analysis - TF-IDF & KeyBERT Extraction

## Primary Topics (Weighted)

### 1. AI Feature Performance (0.92)
- User satisfaction metrics exceeding targets
- Processing optimization delivering measurable results
- Adoption curve showing exponential growth pattern

**Key Entities Mentioned:**
- AI-powered insights (mentioned 14x)
- User feedback analysis (mentioned 8x)
- Performance metrics (mentioned 12x)

### 2. Technical Infrastructure (0.78)
- Scalability concerns requiring immediate attention
- Optimization sprint outcomes
- Architecture review recommendations

**Technical Keywords:**
- distributed computing (3x)
- caching mechanisms (2x)
- latency reduction (4x)

### 3. Business Strategy (0.85)
- Q1 objectives alignment
- Market positioning
- Competitive landscape analysis

## Extracted Action Items

### Critical Priority
- [ ] **Infrastructure scaling assessment** 
  - Owner: Engineering Team
  - Deadline: Jan 25, 2026
  - Dependencies: Performance audit completion

- [ ] **GDPR compliance review**
  - Owner: Legal & Compliance
  - Deadline: Feb 1, 2026
  - Risk: High (blocks EU launch)

### High Priority
- [ ] **Multi-language support implementation**
  - Owner: Product Team
  - Deadline: Q2 2026
  - Phase 1 languages: Spanish, German, French

- [ ] **Beta program design**
  - Owner: Customer Success
  - Deadline: Feb 1, 2026
  - Target: 50 enterprise customers

### Medium Priority
- [ ] Mobile app development kickoff
- [ ] Competitive analysis deep-dive
- [ ] Customer success metrics dashboard

## Sentiment Analysis

**Overall Meeting Tone:** Positive (78%)
- Positive moments: 65%
- Neutral moments: 25%
- Concerns raised: 10%

**Participant Engagement:**
- Sarah Chen: High engagement (32% speaking time)
- Marcus Rodriguez: High engagement (28% speaking time)
- Elena Kowalski: Moderate engagement (18% speaking time)

## Topic Clustering

\`\`\`
Topic 1: Performance & Metrics (38% of content)
Topic 2: Infrastructure & Tech (24% of content)
Topic 3: Strategy & Planning (22% of content)
Topic 4: Risks & Challenges (16% of content)
\`\`\``;

  const getContent = () => {
    if (selectedArtifact === 'transcript') {
      return (
        <div className="space-y-6">
          {transcriptContent.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 text-sm text-gray-400 font-mono">
                  {item.timestamp}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {item.speaker.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-white">{item.speaker}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        item.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                        item.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.sentiment}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(item.text, `transcript-${index}`)}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      {copiedSection === `transcript-${index}` ? (
                        <Check className="size-4 text-green-400" />
                      ) : (
                        <Copy className="size-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (selectedArtifact === 'summary') {
      return (
        <div className="prose prose-invert max-w-none">
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
              {summaryContent}
            </pre>
          </div>
        </div>
      );
    }

    if (selectedArtifact === 'edited') {
      return (
        <div className="prose prose-invert max-w-none">
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
              {structuredContent}
            </pre>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex">
      {/* Artifact Sidebar */}
      <div className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <div className="space-y-2">
          {artifacts.map((artifact) => {
            const Icon = artifact.icon;
            return (
              <button
                key={artifact.id}
                onClick={() => setSelectedArtifact(artifact.id)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  selectedArtifact === artifact.id
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    selectedArtifact === artifact.id
                      ? 'bg-blue-500/20'
                      : 'bg-white/10'
                  }`}>
                    <Icon className="size-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">{artifact.label}</span>
                </div>
                <div className="text-xs text-gray-400 ml-11">
                  {artifact.words.toLocaleString()} words
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs font-medium text-gray-400 mb-3">View Mode</div>
          <div className="space-y-2">
            <button
              onClick={() => setViewMode('formatted')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'formatted'
                  ? 'bg-blue-500/20 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Formatted
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'raw'
                  ? 'bg-blue-500/20 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Raw JSON
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          {getContent()}
        </div>
      </div>
    </div>
  );
}
