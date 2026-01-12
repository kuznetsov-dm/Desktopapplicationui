import { useState } from 'react';
import { Search, Filter, FileText, Calendar } from 'lucide-react';

interface SearchResult {
  id: string;
  meetingId: string;
  meetingName: string;
  artifactKind: string;
  version: string;
  snippet: string;
  timestamp?: string;
  createdAt: string;
}

export function SearchView() {
  const [query, setQuery] = useState('');
  const [filterKind, setFilterKind] = useState<string>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      setResults([
        {
          id: '1',
          meetingId: '2026-01-12_14-30-00_team-sync',
          meetingName: '2026-01-12_14-30-00_team-sync',
          artifactKind: 'transcript',
          version: 't1',
          snippet: '...the AI Meeting Manager project. The core pipeline is now functional and processing meetings successfully...',
          timestamp: '00:00:18',
          createdAt: '2026-01-12T14:30:00Z',
        },
        {
          id: '2',
          meetingId: '2026-01-12_14-30-00_team-sync',
          meetingName: '2026-01-12_14-30-00_team-sync',
          artifactKind: 'summary',
          version: 't1-sA',
          snippet: '...The team reported significant progress on the AI Meeting Manager project. The core pipeline is now functional...',
          createdAt: '2026-01-12T14:30:00Z',
        },
        {
          id: '3',
          meetingId: '2026-01-11_10-15-00_product-review',
          meetingName: '2026-01-11_10-15-00_product-review',
          artifactKind: 'transcript',
          version: 't1',
          snippet: '...we need to ensure the pipeline handles all edge cases. The versioning system is critical for managing different results...',
          timestamp: '00:15:32',
          createdAt: '2026-01-11T10:15:00Z',
        },
      ]);
      setIsSearching(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      mockSearch();
    }
  };

  const artifactKinds = ['all', 'transcript', 'summary', 'actions', 'metadata'];

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across all meetings and artifacts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by type:</span>
              </div>
              <div className="flex gap-2">
                {artifactKinds.map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => setFilterKind(kind)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterKind === kind
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {kind.charAt(0).toUpperCase() + kind.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={!query.trim() || isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </h3>
            </div>

            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FileText className="size-5 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {result.meetingName}
                      </h4>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        {result.artifactKind}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {result.version}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {result.snippet}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        {new Date(result.createdAt).toLocaleDateString()}
                      </span>
                      {result.timestamp && (
                        <span className="flex items-center gap-1">
                          <span className="font-mono">{result.timestamp}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {query && results.length === 0 && !isSearching && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Search className="size-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No results found for "{query}"</p>
            <p className="text-sm text-gray-500 mt-1">Try different keywords or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
