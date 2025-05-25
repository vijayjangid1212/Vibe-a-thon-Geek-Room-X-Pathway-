import React from 'react';
import { Home } from './pages/Home';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;