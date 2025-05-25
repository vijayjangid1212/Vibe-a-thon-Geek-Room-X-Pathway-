import { DataEntry, DataSource } from '../types';

// This is a mock AI service that simulates generating responses based on the data
export const generateResponse = async (
  query: string,
  dataSource: DataSource,
  dataEntries: DataEntry[]
): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simple keyword matching to simulate RAG
  const lowercaseQuery = query.toLowerCase();
  const relevantEntries = dataEntries.filter(entry => {
    const content = entry.content.toLowerCase();
    const title = entry.title.toLowerCase();
    return content.includes(lowercaseQuery) || title.includes(lowercaseQuery);
  });
  
  // No relevant entries found
  if (relevantEntries.length === 0) {
    return getGenericResponse(dataSource, query);
  }
  
  // Build a response based on the relevant entries
  const mostRelevant = relevantEntries.sort((a, b) => 
    (b.relevance || 0) - (a.relevance || 0)
  )[0];
  
  // Tailor the response based on the data source
  switch (dataSource) {
    case 'financial':
      return generateFinancialResponse(query, mostRelevant, relevantEntries.length);
    case 'tech':
      return generateTechResponse(query, mostRelevant, relevantEntries.length);
    case 'health':
      return generateHealthResponse(query, mostRelevant, relevantEntries.length);
    case 'project':
      return generateProjectResponse(query, mostRelevant, relevantEntries.length);
    default:
      return getGenericResponse(dataSource, query);
  }
};

const generateFinancialResponse = (
  query: string, 
  entry: DataEntry, 
  totalFound: number
): string => {
  const sentimentText = entry.sentiment === 'positive' 
    ? 'positive outlook' 
    : entry.sentiment === 'negative' 
      ? 'concerning indicators' 
      : 'neutral indicators';
  
  return `Based on the latest financial data${totalFound > 1 ? ` (${totalFound} relevant sources)` : ''}, ${entry.title}. 
  
The analysis suggests ${sentimentText}. ${entry.content}

This information was reported by ${entry.source} as of ${formatTimestamp(entry.timestamp)}.`;
};

const generateTechResponse = (
  query: string, 
  entry: DataEntry, 
  totalFound: number
): string => {
  return `According to recent tech news${totalFound > 1 ? ` (${totalFound} related articles)` : ''}, ${entry.title}.

${entry.content}

This was reported by ${entry.source} on ${formatTimestamp(entry.timestamp)}.`;
};

const generateHealthResponse = (
  query: string, 
  entry: DataEntry, 
  totalFound: number
): string => {
  return `Based on current health data${totalFound > 1 ? ` (${totalFound} relevant records)` : ''}, ${entry.title}.

${entry.content}

This information was updated on ${formatTimestamp(entry.timestamp)} from ${entry.source}.`;
};

const generateProjectResponse = (
  query: string, 
  entry: DataEntry, 
  totalFound: number
): string => {
  return `According to your project data${totalFound > 1 ? ` (${totalFound} relevant updates)` : ''}, ${entry.title}.

${entry.content}

This was last updated on ${formatTimestamp(entry.timestamp)} in ${entry.source}.`;
};

const getGenericResponse = (dataSource: DataSource, query: string): string => {
  const responses = {
    financial: `I don't have specific financial information about "${query}" in my current dataset. Would you like me to explain some general financial concepts related to this topic instead?`,
    tech: `I don't have specific tech news about "${query}" in my current dataset. Would you like me to explain some general technology concepts related to this topic instead?`,
    health: `I don't have specific health information about "${query}" in my current dataset. Would you like me to explain some general health concepts related to this topic instead?`,
    project: `I don't have specific project information about "${query}" in my current dataset. Would you like me to help you set up tracking for this aspect of your project?`,
  };
  
  return responses[dataSource];
};

const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};