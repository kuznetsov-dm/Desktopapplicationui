import { Sparkles, TrendingUp, AlertCircle, CheckCircle, Lightbulb, Target } from 'lucide-react';

interface AIInsightsProps {
  meetingId: string;
}

export function AIInsights({ meetingId }: AIInsightsProps) {
  const insights = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'High Team Alignment',
      description: 'All participants showed strong agreement on Q1 priorities with 87% consensus rate.',
      confidence: 94,
      impact: 'high',
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertCircle,
      title: 'Scalability Risk Identified',
      description: 'Infrastructure concerns raised but no concrete action plan established. Recommend immediate follow-up.',
      confidence: 88,
      impact: 'high',
    },
    {
      id: 3,
      type: 'trend',
      icon: TrendingUp,
      title: 'Positive User Metrics Trend',
      description: '87% satisfaction represents 23% improvement vs Q4. Momentum is accelerating.',
      confidence: 92,
      impact: 'medium',
    },
    {
      id: 4,
      type: 'suggestion',
      icon: Lightbulb,
      title: 'Action Item Ownership Gap',
      description: '5 out of 23 action items lack clear ownership. Consider assigning DRIs before next sync.',
      confidence: 85,
      impact: 'medium',
    },
    {
      id: 5,
      type: 'goal',
      icon: Target,
      title: 'Q2 Roadmap Dependencies',
      description: 'Detected 3 Q2 initiatives dependent on infrastructure scaling. Timeline risk present.',
      confidence: 91,
      impact: 'high',
    },
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'warning':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'trend':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'suggestion':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'goal':
        return 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30';
      default:
        return 'from-gray-500/20 to-gray-500/20 border-gray-500/30';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'trend':
        return 'text-blue-400';
      case 'suggestion':
        return 'text-purple-400';
      case 'goal':
        return 'text-indigo-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI-Generated Insights</h2>
            <p className="text-gray-400">Powered by advanced language models and meeting analysis</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center gap-2">
            <Sparkles className="size-4 text-blue-400" />
            <span className="text-sm font-medium text-white">{insights.length} Insights</span>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${getTypeStyles(insight.type)} border backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white/10 ${getIconColor(insight.type)}`}>
                    <Icon className="size-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{insight.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            insight.impact === 'high' 
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {insight.impact.toUpperCase()} IMPACT
                          </span>
                          <span className="text-xs text-gray-400">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      {/* Confidence Bar */}
                      <div className="w-24">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Model Info */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="size-5 text-purple-400" />
            <h3 className="font-semibold text-white">Analysis Details</h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-400 mb-1">Model</div>
              <div className="text-sm font-medium text-white">DeepSeek R1 + TF-IDF</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Processing Time</div>
              <div className="text-sm font-medium text-white">4.2 seconds</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Tokens Analyzed</div>
              <div className="text-sm font-medium text-white">8,943 tokens</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
