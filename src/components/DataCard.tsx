import React from 'react';
import { DataEntry } from '../types';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, CalendarIcon } from 'lucide-react';

interface DataCardProps {
  entry: DataEntry;
}

export const DataCard: React.FC<DataCardProps> = ({ entry }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 transition-colors p-4 group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm md:text-base group-hover:text-white transition-colors line-clamp-1">
          {entry.title}
        </h4>
        <div className={`
          rounded-full p-1
          ${entry.sentiment === 'positive' ? 'bg-green-900/30 text-green-400' : 
            entry.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' : 
            'bg-blue-900/30 text-blue-400'}
        `}>
          {entry.sentiment === 'positive' ? <TrendingUpIcon className="h-4 w-4" /> : 
           entry.sentiment === 'negative' ? <TrendingDownIcon className="h-4 w-4" /> : 
           <MinusIcon className="h-4 w-4" />}
        </div>
      </div>
      <p className="text-xs md:text-sm text-slate-400 mb-3 line-clamp-2">
        {entry.content}
      </p>
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span className="capitalize bg-slate-700 rounded-full px-2 py-0.5">
          {entry.category}
        </span>
        <div className="flex items-center">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>{formatDate(entry.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};