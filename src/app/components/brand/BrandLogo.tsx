interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}

export function BrandLogo({ variant = 'full', size = 'md', theme = 'light' }: BrandLogoProps) {
  const sizes = {
    sm: { icon: 24, height: 24, text: 'text-sm' },
    md: { icon: 32, height: 32, text: 'text-base' },
    lg: { icon: 48, height: 48, text: 'text-2xl' },
  };

  const config = sizes[size];
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  // Icon Only
  if (variant === 'icon') {
    return (
      <svg width={config.icon} height={config.icon} viewBox="0 0 48 48" fill="none">
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        
        {/* Background Circle */}
        <circle cx="24" cy="24" r="22" fill="url(#brand-gradient)" opacity="0.1" />
        
        {/* Microphone Stand */}
        <path
          d="M24 34V38M20 38H28"
          stroke="url(#brand-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Microphone Body */}
        <rect
          x="19"
          y="12"
          width="10"
          height="16"
          rx="5"
          fill="url(#brand-gradient)"
        />
        
        {/* Sound Wave Left */}
        <path
          d="M12 20C12 20 10 22 10 24C10 26 12 28 12 28"
          stroke="url(#brand-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Sound Wave Right */}
        <path
          d="M36 20C36 20 38 22 38 24C38 26 36 28 36 28"
          stroke="url(#brand-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* AI Sparkle */}
        <circle cx="32" cy="14" r="2" fill="#EC4899" opacity="0.8" />
        <circle cx="35" cy="17" r="1.5" fill="#8B5CF6" opacity="0.6" />
        <circle cx="29" cy="16" r="1.5" fill="#3B82F6" opacity="0.6" />
      </svg>
    );
  }

  // Compact (Icon + Acronym)
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <svg width={config.icon} height={config.icon} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="brand-gradient-compact" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#brand-gradient-compact)" opacity="0.1" />
          <path d="M24 34V38M20 38H28" stroke="url(#brand-gradient-compact)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="19" y="12" width="10" height="16" rx="5" fill="url(#brand-gradient-compact)" />
          <path d="M12 20C12 20 10 22 10 24C10 26 12 28 12 28" stroke="url(#brand-gradient-compact)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M36 20C36 20 38 22 38 24C38 26 36 28 36 28" stroke="url(#brand-gradient-compact)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <circle cx="32" cy="14" r="2" fill="#EC4899" opacity="0.8" />
        </svg>
        <span className={`font-bold ${config.text} ${textColor} tracking-tight`}>
          AIMM
        </span>
      </div>
    );
  }

  // Full Logo (Icon + Full Text)
  return (
    <div className="flex items-center gap-3">
      <svg width={config.icon} height={config.icon} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="brand-gradient-full" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#brand-gradient-full)" opacity="0.1" />
        <path d="M24 34V38M20 38H28" stroke="url(#brand-gradient-full)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="19" y="12" width="10" height="16" rx="5" fill="url(#brand-gradient-full)" />
        <path d="M12 20C12 20 10 22 10 24C10 26 12 28 12 28" stroke="url(#brand-gradient-full)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M36 20C36 20 38 22 38 24C38 26 36 28 36 28" stroke="url(#brand-gradient-full)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="32" cy="14" r="2" fill="#EC4899" opacity="0.8" />
        <circle cx="35" cy="17" r="1.5" fill="#8B5CF6" opacity="0.6" />
        <circle cx="29" cy="16" r="1.5" fill="#3B82F6" opacity="0.6" />
      </svg>
      <div className="flex flex-col">
        <span className={`font-bold ${config.text} ${textColor} leading-none tracking-tight`}>
          AI Meeting Manager
        </span>
        <span className="text-xs text-gray-500 leading-none mt-0.5">
          Intelligent Meeting Analysis
        </span>
      </div>
    </div>
  );
}
