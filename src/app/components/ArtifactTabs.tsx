import { useState } from 'react';
import { FileText, Brain, Code } from 'lucide-react';

interface ArtifactTabsProps {
  meetingId: string;
}

export function ArtifactTabs({ meetingId }: ArtifactTabsProps) {
  const [activeArtifact, setActiveArtifact] = useState('transcript');

  const artifacts = [
    { id: 'transcript', label: 'TRANSCRIPT', icon: FileText },
    { id: 'summary', label: 'AI SUMMARY', icon: Brain },
    { id: 'structured', label: 'STRUCTURED', icon: Code },
  ];

  const transcriptContent = [
    { time: '00:00:00', speaker: 'SARAH_CHEN', text: 'Good morning everyone! Let\'s dive into our Q1 product strategy. We have some exciting developments to discuss today.' },
    { time: '00:00:15', speaker: 'MARCUS_ROD', text: 'Thanks Sarah. I\'ve prepared a comprehensive analysis of our user feedback from the past quarter. The AI-powered insights feature is getting incredible traction.' },
    { time: '00:00:32', speaker: 'SARAH_CHEN', text: 'That\'s fantastic! Can you share the key metrics?' },
    { time: '00:00:38', speaker: 'MARCUS_ROD', text: 'Absolutely. We\'re seeing 87% user satisfaction on the AI features, and the processing time has decreased by 45% since our optimization sprint.' },
    { time: '00:00:55', speaker: 'ELENA_KOW', text: 'This is impressive. However, we need to address the scalability concerns that engineering raised last week.' },
  ];

  const summaryContent = `
EXECUTIVE SUMMARY
================================================================================

MEETING: PRODUCT_STRATEGY_Q1_2026
DATE: 2026.01.13 10:15:00
DURATION: 84:32
PARTICIPANTS: 8

KEY HIGHLIGHTS
--------------------------------------------------------------------------------
[1] PERFORMANCE METRICS
    - User Satisfaction: 87% (↑23% vs Q4)
    - Processing Speed: 45% improvement
    - Active Users: 234% increase

[2] STRATEGIC INITIATIVES
    - AI Integration Expansion: 3x engagement increase
    - Infrastructure Optimization: Latency reduction achieved
    - UX Enhancement: 65% longer session durations

[3] ACTION ITEMS IDENTIFIED
    [HIGH] Scale infrastructure (10x capacity)
    [HIGH] Multi-language support (ES, DE, FR)
    [MED]  Beta program launch (50 enterprise customers)
    [MED]  Mobile app development kickoff

[4] RISKS & CONCERNS
    [CRITICAL] Scalability: Current arch struggles >100k users
    [HIGH]     Competition: New market entrant with aggressive pricing
    [MEDIUM]   Regulatory: GDPR compliance review needed

NEXT STEPS
--------------------------------------------------------------------------------
2026.01.20 - Q2 Roadmap Planning
2026.01.25 - Infrastructure Audit
2026.02.01 - Beta Program Launch

END OF SUMMARY
================================================================================
`;

  const structuredContent = `
STRUCTURED ANALYSIS - TF-IDF + KeyBERT
================================================================================

PRIMARY TOPICS (WEIGHTED)
--------------------------------------------------------------------------------
[1] AI FEATURE PERFORMANCE............................ [WEIGHT: 0.92]
    - User satisfaction exceeding targets
    - Processing optimization delivering results
    - Exponential adoption curve detected
    
    ENTITIES:
    • ai-powered-insights (14 mentions)
    • user-feedback-analysis (8 mentions)
    • performance-metrics (12 mentions)

[2] TECHNICAL INFRASTRUCTURE.......................... [WEIGHT: 0.78]
    - Scalability concerns flagged
    - Optimization sprint outcomes
    - Architecture review recommendations
    
    KEYWORDS:
    • distributed-computing (3x)
    • caching-mechanisms (2x)
    • latency-reduction (4x)

[3] BUSINESS STRATEGY................................ [WEIGHT: 0.85]
    - Q1 objectives alignment
    - Market positioning analysis
    - Competitive landscape review

EXTRACTED ACTION ITEMS
--------------------------------------------------------------------------------
[CRITICAL PRIORITY]
[ ] Infrastructure scaling assessment
    OWNER: Engineering Team
    DEADLINE: 2026.01.25
    DEPENDENCIES: Performance audit

[ ] GDPR compliance review
    OWNER: Legal & Compliance
    DEADLINE: 2026.02.01
    RISK: HIGH (blocks EU launch)

[HIGH PRIORITY]
[ ] Multi-language support (Phase 1)
    OWNER: Product Team
    DEADLINE: Q2 2026
    LANGUAGES: Spanish, German, French

[ ] Beta program design
    OWNER: Customer Success
    DEADLINE: 2026.02.01
    TARGET: 50 enterprise customers

SENTIMENT ANALYSIS
--------------------------------------------------------------------------------
OVERALL TONE: POSITIVE (78%)
  Positive moments: 65%
  Neutral moments: 25%
  Concerns raised: 10%

ENGAGEMENT METRICS:
  Sarah Chen:      32% speaking time [HIGH]
  Marcus Rodriguez: 28% speaking time [HIGH]
  Elena Kowalski:  18% speaking time [MODERATE]

TOPIC CLUSTERING
--------------------------------------------------------------------------------
Performance & Metrics.......... 38%
Infrastructure & Tech.......... 24%
Strategy & Planning............ 22%
Risks & Challenges............. 16%

END OF ANALYSIS
================================================================================
`;

  const getContent = () => {
    if (activeArtifact === 'transcript') {
      return (
        <div className="p-6 space-y-4">
          {transcriptContent.map((item, index) => (
            <div key={index} className="bg-black/80 border border-cyan-500/30 rounded p-4 relative overflow-hidden">
              {/* OLED Effect */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(0, 255, 255, 0.1) 50%)',
                backgroundSize: '100% 2px'
              }} />
              
              <div className="relative">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 w-20 text-cyan-400/60 font-mono text-xs">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="text-cyan-400 font-mono text-sm mb-2">
                      [{item.speaker}]
                    </div>
                    <div className="text-cyan-400/80 leading-relaxed">
                      {item.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeArtifact === 'summary') {
      return (
        <div className="p-6">
          <div className="bg-black border border-green-500/30 rounded overflow-hidden">
            {/* OLED Screen Header */}
            <div className="border-b border-green-500/30 bg-green-950/20 px-4 py-2">
              <div className="text-green-400 font-mono text-xs font-bold">
                AI_SUMMARY.TXT
              </div>
            </div>
            {/* OLED Content */}
            <div className="p-6 relative">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(0, 255, 0, 0.1) 50%)',
                backgroundSize: '100% 2px'
              }} />
              <pre className="text-green-400 font-mono text-sm leading-relaxed relative" style={{
                textShadow: '0 0 5px rgba(0, 255, 0, 0.3)'
              }}>
                {summaryContent}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    if (activeArtifact === 'structured') {
      return (
        <div className="p-6">
          <div className="bg-black border border-amber-500/30 rounded overflow-hidden">
            {/* OLED Screen Header */}
            <div className="border-b border-amber-500/30 bg-amber-950/20 px-4 py-2">
              <div className="text-amber-400 font-mono text-xs font-bold">
                STRUCTURED_ANALYSIS.DAT
              </div>
            </div>
            {/* OLED Content */}
            <div className="p-6 relative">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(255, 191, 0, 0.1) 50%)',
                backgroundSize: '100% 2px'
              }} />
              <pre className="text-amber-400 font-mono text-sm leading-relaxed relative" style={{
                textShadow: '0 0 5px rgba(255, 191, 0, 0.3)'
              }}>
                {structuredContent}
              </pre>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Artifact Selector */}
      <div className="flex-shrink-0 border-b border-cyan-500/30 bg-black/40">
        <div className="flex">
          {artifacts.map((artifact) => {
            const Icon = artifact.icon;
            return (
              <button
                key={artifact.id}
                onClick={() => setActiveArtifact(artifact.id)}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold tracking-wider transition-all relative ${
                  activeArtifact === artifact.id
                    ? 'text-cyan-400 bg-cyan-500/20'
                    : 'text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                <Icon className="size-4" />
                {artifact.label}
                {activeArtifact === artifact.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {getContent()}
      </div>
    </div>
  );
}
