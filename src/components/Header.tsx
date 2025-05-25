import React from 'react';
import { ZapIcon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-700 backdrop-blur-md bg-slate-900/70 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2 mr-3">
            <ZapIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ziron AI
          </h1>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/50">
            ALPHA
          </span>
        </div>
        
        <nav>
          <ul className="flex space-x-1">
            <li>
              <a href="#" className="px-3 py-1.5 text-sm rounded-md hover:bg-slate-800 transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="px-3 py-1.5 text-sm rounded-md hover:bg-slate-800 transition-colors">
                Sources
              </a>
            </li>
            <li>
              <a href="#" className="px-3 py-1.5 text-sm rounded-md hover:bg-slate-800 transition-colors">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};