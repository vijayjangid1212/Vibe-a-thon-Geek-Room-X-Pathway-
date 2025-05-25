export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type DataSource = 'financial' | 'tech' | 'health' | 'project';

export interface DataEntry {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: Date;
  category: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  relevance?: number;
}