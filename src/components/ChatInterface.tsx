import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageBubble } from './MessageBubble';
import { SendIcon } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { messages, addMessage, isTyping } = useApp();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    addMessage(inputValue);
    setInputValue('');
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <>
      <div className="p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <h2 className="text-lg font-medium">Chat with Ziron AI</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center">
            <div className="rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
              <div className="bg-white rounded-full h-1.5 w-1.5 animate-pulse"></div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-sm max-w-[80%]">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse delay-150"></div>
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Ziron a question..."
            className="flex-1 px-4 py-2 rounded-l-lg bg-slate-700 border-slate-600 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || inputValue.trim() === ''}
            className="px-4 py-2 rounded-r-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </>
  );
};