import { Play, History, FileText, Search, Settings } from 'lucide-react';

type ViewType = 'processing' | 'history' | 'artifacts' | 'search' | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'processing' as ViewType, label: 'Process', icon: Play },
    { id: 'history' as ViewType, label: 'History', icon: History },
    { id: 'artifacts' as ViewType, label: 'Artifacts', icon: FileText },
    { id: 'search' as ViewType, label: 'Search', icon: Search },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Play className="size-5" />
          </div>
          <div>
            <div className="font-semibold">AI Meeting</div>
            <div className="text-xs text-gray-400">Manager</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Storage</div>
          <div className="text-sm">245 GB / 500 GB</div>
          <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '49%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
