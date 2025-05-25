import React from 'react';
import { useApp } from '../context/AppContext';
import { DataSourceSelector } from '../components/DataSourceSelector';
import { ChatInterface } from '../components/ChatInterface';
import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';
import { ZapIcon, RefreshCw } from 'lucide-react';

export const Home: React.FC = () => {
  const { refreshData, isLoading } = useApp();
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-1/2 h-full md:h-auto overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-medium flex items-center">
              <ZapIcon className="h-5 w-5 mr-2 text-purple-400" />
              Insights
            </h2>
            <button 
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center px-3 py-1.5 text-sm rounded-full bg-slate-700 hover:bg-slate-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Updating...' : 'Update Data'}
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <DataSourceSelector />
            <Dashboard />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-full md:h-auto border-l border-slate-700 flex flex-col">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};