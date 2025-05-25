import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message, DataSource, DataEntry } from '../types';
import { generateResponse } from '../services/aiService';
import { fetchInitialData, fetchNewData } from '../services/dataService';

interface AppContextType {
  messages: Message[];
  addMessage: (content: string) => void;
  isTyping: boolean;
  dataSource: DataSource;
  setDataSource: (source: DataSource) => void;
  dataEntries: DataEntry[];
  refreshData: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Ziron AI, your real-time life copilot. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource>('financial');
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchInitialData(dataSource);
      setDataEntries(data);
      setIsLoading(false);
    };
    
    loadData();
  }, [dataSource]);

  const addMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Generate AI response
    try {
      const response = await generateResponse(content, dataSource, dataEntries);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to generate response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    const newData = await fetchNewData(dataSource, dataEntries);
    setDataEntries(newData);
    setIsLoading(false);
    
    // Add system message about new data
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: 'system',
      content: `New ${dataSource} data has been ingested and processed.`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, systemMessage]);
  };

  return (
    <AppContext.Provider 
      value={{ 
        messages, 
        addMessage, 
        isTyping, 
        dataSource, 
        setDataSource, 
        dataEntries, 
        refreshData,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};