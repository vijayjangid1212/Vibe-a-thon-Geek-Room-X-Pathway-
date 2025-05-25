import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUpIcon, MonitorIcon, HeartIcon, ClipboardListIcon } from 'lucide-react';

export const DataSourceSelector: React.FC = () => {
  const { dataSource, setDataSource, isLoading } = useApp();
  
  const sources = [
    {
      id: 'financial',
      name: 'Financial',
      icon: <TrendingUpIcon className="h-4 w-4" />,
      color: 'from-green-500 to-emerald-700',
      description: 'Stock market, economic indicators, and financial news'
    },
    {
      id: 'tech',
      name: 'Tech News',
      icon: <MonitorIcon className="h-4 w-4" />,
      color: 'from-blue-500 to-indigo-700',
      description: 'Latest technology news, launches, and breakthroughs'
    },
    {
      id: 'health',
      name: 'Health',
      icon: <HeartIcon className="h-4 w-4" />,
      color: 'from-red-500 to-rose-700',
      description: 'Medical research, health trends, and wellness data'
    },
    {
      id: 'project',
      name: 'Project',
      icon: <ClipboardListIcon className="h-4 w-4" />,
      color: 'from-purple-500 to-violet-700',
      description: 'Team updates, tasks, and project management'
    }
  ];
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-slate-400 mb-3">Data Source</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => !isLoading && setDataSource(source.id as any)}
            disabled={isLoading}
            className={`
              p-3 rounded-lg border flex flex-col items-center justify-center text-center
              transition-all duration-200 hover:shadow-lg
              ${dataSource === source.id 
                ? `bg-gradient-to-br ${source.color} border-transparent shadow-lg` 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }
            `}
          >
            <div className={`
              rounded-full p-2 mb-2
              ${dataSource === source.id 
                ? 'bg-white/20' 
                : 'bg-slate-700'
              }
            `}>
              {source.icon}
            </div>
            <span className="font-medium text-sm mb-1">{source.name}</span>
            <span className="text-xs opacity-70 hidden md:block">{source.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};