import { useState } from 'react';
import { Search, Terminal, Zap } from 'lucide-react';

interface CommandPaletteProps {
  onClose: () => void;
  onSelectMeeting: (id: string) => void;
}

export function CommandPalette({ onClose, onSelectMeeting }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'new', label: 'NEW_MEETING', action: 'Create new meeting record' },
    { id: 'export', label: 'EXPORT_CURRENT', action: 'Export to PDF/MD format' },
    { id: 'terminal', label: 'OPEN_TERMINAL', action: 'Show terminal output' },
    { id: 'analyze', label: 'REANALYZE', action: 'Run AI analysis again' },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-black/95 border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-cyan-500/30 bg-cyan-950/20 px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
              COMMAND INTERFACE
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-cyan-500/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-cyan-400/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="TYPE COMMAND..."
              autoFocus
              className="w-full pl-12 pr-4 py-3 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400 font-mono text-lg"
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto">
          <div className="p-2">
            {commands.map((cmd) => (
              <button
                key={cmd.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-cyan-500/20 transition-colors text-left group border border-transparent hover:border-cyan-500/30"
              >
                <Zap className="size-4 text-cyan-400" />
                <div className="flex-1">
                  <div className="text-cyan-400 font-mono font-bold text-sm">{cmd.label}</div>
                  <div className="text-cyan-400/60 font-mono text-xs">{cmd.action}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-cyan-950/20 border-t border-cyan-500/30 flex items-center justify-between font-mono text-xs text-cyan-400/60">
          <span>ESC TO CLOSE</span>
          <span>ENTER TO EXECUTE</span>
        </div>
      </div>
    </div>
  );
}
