import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DataCard } from './DataCard';
import { AlertCircleIcon } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { dataEntries, dataSource, isLoading } = useApp();
  
  const sentimentCounts = useMemo(() => {
    return dataEntries.reduce((acc, entry) => {
      const sentiment = entry.sentiment || 'neutral';
      acc[sentiment] = (acc[sentiment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [dataEntries]);
  
  const categoryCounts = useMemo(() => {
    const counts = dataEntries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Sort by count (descending)
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [dataEntries]);
  
  const latestUpdateTime = useMemo(() => {
    if (dataEntries.length === 0) return null;
    
    const latest = [...dataEntries].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    )[0].timestamp;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(latest);
  }, [dataEntries]);
  
  if (dataEntries.length === 0 && !isLoading) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center">
        <AlertCircleIcon className="h-10 w-10 mx-auto mb-4 text-slate-500" />
        <h3 className="text-lg font-medium text-slate-300 mb-2">No data available</h3>
        <p className="text-sm text-slate-400">
          There is no data available for the selected source.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-slate-400">Latest Information</h3>
          {latestUpdateTime && (
            <span className="text-xs text-slate-500">
              Last updated: {latestUpdateTime}
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          {dataEntries.slice(0, 3).map((entry) => (
            <DataCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Sentiment Analysis</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-2 w-full">
              {Object.entries(sentimentCounts).map(([sentiment, count]) => (
                <div key={sentiment} className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize">{sentiment}</span>
                    <span>{count} {count === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        sentiment === 'positive' ? 'bg-green-500' :
                        sentiment === 'negative' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(count / dataEntries.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Top Categories</h3>
          <div className="space-y-2">
            {categoryCounts.map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm capitalize bg-slate-700 rounded-full px-2 py-0.5">
                  {category}
                </span>
                <span className="text-xs text-slate-400">{count} {count === 1 ? 'entry' : 'entries'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">
          {dataSource === 'financial' && 'Market Insights'}
          {dataSource === 'tech' && 'Technology Trends'}
          {dataSource === 'health' && 'Health Indicators'}
          {dataSource === 'project' && 'Project Status'}
        </h3>
        <p className="text-sm text-slate-300">
          {dataSource === 'financial' && 'Based on current market data, there is a trend toward technology and renewable energy sectors. Volatility remains moderate with positive sentiment slightly outweighing negative indicators.'}
          {dataSource === 'tech' && 'Current technology trends indicate strong momentum in AI and quantum computing research. Major breakthroughs in these areas could disrupt multiple industries in the coming months.'}
          {dataSource === 'health' && 'Recent health data shows promising advancements in early disease detection and prevention technologies. Wearable devices continue to improve in diagnostic capabilities.'}
          {dataSource === 'project' && 'Project progress is on track with minor delays in the infrastructure components. Frontend development is ahead of schedule, and most critical path items are proceeding as planned.'}
        </p>
      </div>
    </div>
  );
};