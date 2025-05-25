import React from 'react';
import { Message } from '../types';
import { ZapIcon, UserIcon, InfoIcon } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  if (message.role === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="px-3 py-1.5 bg-slate-800/60 border border-slate-700 rounded-full text-xs text-slate-400 flex items-center">
          <InfoIcon className="h-3 w-3 mr-1.5" />
          {message.content}
        </div>
      </div>
    );
  }
  
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'items-start' : 'items-start justify-end'}`}>
      {isAssistant && (
        <div className="rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
          <ZapIcon className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className={`
        px-4 py-2 rounded-lg text-sm max-w-[80%]
        ${isAssistant 
          ? 'bg-slate-800/80 border border-slate-700' 
          : 'bg-gradient-to-br from-blue-600 to-purple-700 text-white'}
      `}>
        <div className="whitespace-pre-line">
          {message.content}
        </div>
        <div className={`text-xs mt-1 ${isAssistant ? 'text-slate-500' : 'text-blue-200'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {!isAssistant && (
        <div className="rounded-full w-8 h-8 bg-slate-700 flex items-center justify-center ml-2">
          <UserIcon className="h-4 w-4 text-slate-300" />
        </div>
      )}
    </div>
  );
};