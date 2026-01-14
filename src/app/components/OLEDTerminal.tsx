import { useEffect, useState } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

interface OLEDTerminalProps {
  meetingId: string;
}

export function OLEDTerminal({ meetingId }: OLEDTerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');

  useEffect(() => {
    const terminalOutput = [
      '> INITIALIZING AI ANALYSIS ENGINE...',
      '> LOADING MEETING DATA: PRODUCT_STRATEGY_Q1_2026',
      '> FILE SIZE: 45.2 MB | FORMAT: WEBM',
      '> ',
      '> [01] AUDIO EXTRACTION..................... [OK]',
      '> [02] WHISPER TRANSCRIPTION................ [OK]',
      '>     MODEL: ggml-large-v3.bin',
      '>     LANGUAGE: AUTO-DETECTED (en)',
      '>     DURATION: 84:32',
      '>     SEGMENTS: 247',
      '> ',
      '> [03] TEXT PROCESSING...................... [OK]',
      '>     ALGORITHM: TF-IDF + KeyBERT',
      '>     WORDS: 3,847',
      '>     TOPICS: 8 DETECTED',
      '> ',
      '> [04] AI SUMMARY GENERATION................ [OK]',
      '>     PROVIDER: DeepSeek R1',
      '>     TOKENS: 8,943',
      '>     LATENCY: 4.2s',
      '> ',
      '> [05] STRUCTURED ANALYSIS.................. [OK]',
      '>     ACTION ITEMS: 23 EXTRACTED',
      '>     DECISIONS: 7 IDENTIFIED',
      '>     RISKS: 3 FLAGGED',
      '> ',
      '> [06] AI INSIGHTS GENERATION............... [OK]',
      '>     INSIGHTS: 14 GENERATED',
      '>     CONFIDENCE: 92% AVG',
      '>     SENTIMENT: POSITIVE (78%)',
      '> ',
      '> ANALYSIS COMPLETE',
      '> ARTIFACTS SAVED: /meetings/2026-01-13_10-15-00/',
      '> TOTAL PROCESSING TIME: 12.8 SECONDS',
      '> ',
      '> SYSTEM READY FOR NEXT OPERATION',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < terminalOutput.length) {
        setLines(prev => [...prev, terminalOutput[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [meetingId]);

  return (
    <div className="h-full flex flex-col bg-black">
      {/* OLED Screen Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(0, 255, 0, 0.1) 50%)',
          backgroundSize: '100% 2px'
        }} />
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)'
        }} />
      </div>

      {/* Terminal Header */}
      <div className="flex-shrink-0 border-b border-green-500/30 bg-green-950/20 px-4 py-2 relative">
        <div className="flex items-center gap-3">
          <Terminal className="size-4 text-green-400" />
          <span className="text-green-400 font-mono text-xs font-bold tracking-wider">
            TERMINAL OUTPUT
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400/60 font-mono text-xs">LIVE</span>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-auto p-6 relative">
        <div className="font-mono text-sm space-y-1">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.includes('[OK]') ? 'text-green-400' :
                line.includes('[ERROR]') ? 'text-red-400' :
                line.startsWith('>     ') ? 'text-green-400/60' :
                line.startsWith('> [') ? 'text-green-400' :
                'text-green-400/80'
              }`}
              style={{
                textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
              }}
            >
              {line}
            </div>
          ))}
          {/* Cursor */}
          <div className="flex items-center">
            <ChevronRight className="size-4 text-green-400 mr-1" />
            <span className="text-green-400">{currentLine}</span>
            <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
          </div>
        </div>
      </div>

      {/* System Info Footer */}
      <div className="flex-shrink-0 border-t border-green-500/30 bg-green-950/20 px-4 py-2">
        <div className="flex items-center justify-between font-mono text-xs text-green-400/60">
          <span>LINES: {lines.length}</span>
          <span>ENCODING: UTF-8</span>
          <span>SHELL: BASH</span>
          <span>USER: root@ai-meeting-system</span>
        </div>
      </div>
    </div>
  );
}
