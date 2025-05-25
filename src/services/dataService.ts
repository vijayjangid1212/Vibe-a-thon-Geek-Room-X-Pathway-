import { DataEntry, DataSource } from '../types';

// Mock financial data
const financialData: DataEntry[] = [
  {
    id: '1',
    title: 'Tesla shares rose 5% following positive Q3 earnings report',
    content: 'Tesla reported stronger than expected earnings for Q3 2025, with revenue up 20% year-over-year. The company also announced expanded production capacity for its energy products.',
    source: 'Financial Times',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    category: 'stocks',
    sentiment: 'positive',
    relevance: 0.95,
  },
  {
    id: '2',
    title: 'Fed signals potential rate cut in upcoming meeting',
    content: 'The Federal Reserve has indicated it may lower interest rates by 25 basis points in its next meeting, citing cooling inflation data and moderate economic growth.',
    source: 'Wall Street Journal',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    category: 'macroeconomics',
    sentiment: 'positive',
    relevance: 0.88,
  },
  {
    id: '3',
    title: 'Apple announces new subscription service for AI features',
    content: 'Apple unveiled a new subscription service that will provide premium AI features across its device ecosystem. The service will cost $9.99 per month and launch next quarter.',
    source: 'Bloomberg',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    category: 'stocks',
    sentiment: 'neutral',
    relevance: 0.75,
  }
];

// Mock tech news data
const techData: DataEntry[] = [
  {
    id: '1',
    title: 'OpenAI introduces GPT-5 with enhanced reasoning capabilities',
    content: 'OpenAI has released GPT-5, featuring significant improvements in logical reasoning, code generation, and multimodal understanding. The new model shows 30% better performance on benchmark tests.',
    source: 'TechCrunch',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    category: 'AI',
    sentiment: 'positive',
    relevance: 0.97,
  },
  {
    id: '2',
    title: 'New quantum computing breakthrough achieved by Google',
    content: 'Google researchers have demonstrated quantum supremacy in a new class of problems, using a 128-qubit processor to solve optimization problems previously thought impossible on classical computers.',
    source: 'MIT Technology Review',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    category: 'quantum computing',
    sentiment: 'positive',
    relevance: 0.85,
  },
  {
    id: '3',
    title: 'Major security vulnerability discovered in popular web frameworks',
    content: 'A critical zero-day vulnerability has been identified affecting multiple web frameworks including React and Angular. Developers are urged to update to the latest patches immediately.',
    source: 'The Register',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    category: 'security',
    sentiment: 'negative',
    relevance: 0.92,
  }
];

// Mock health data
const healthData: DataEntry[] = [
  {
    id: '1',
    title: 'New study links intermittent fasting to improved longevity',
    content: 'Researchers at Stanford have published findings suggesting that intermittent fasting patterns may contribute to cellular repair processes that extend lifespan. The 5-year study followed 10,000 participants.',
    source: 'Journal of Medicine',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    category: 'nutrition',
    sentiment: 'positive',
    relevance: 0.89,
  },
  {
    id: '2',
    title: 'FDA approves breakthrough treatment for Alzheimer\'s disease',
    content: 'The FDA has granted approval for a new drug that targets amyloid plaques in the brain, showing a 32% reduction in cognitive decline in clinical trials compared to placebo.',
    source: 'Medical News Today',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: 'pharmaceuticals',
    sentiment: 'positive',
    relevance: 0.94,
  },
  {
    id: '3',
    title: 'Wearable device accurately predicts onset of respiratory infections',
    content: 'A new smartwatch-based monitoring system can detect subtle changes in biometrics that indicate an oncoming respiratory infection up to 48 hours before symptom onset, with 91% accuracy.',
    source: 'Nature Biotechnology',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    category: 'wearables',
    sentiment: 'positive',
    relevance: 0.78,
  }
];

// Mock project data
const projectData: DataEntry[] = [
  {
    id: '1',
    title: 'Frontend redesign completed ahead of schedule',
    content: 'The UI team has completed the application redesign two days ahead of schedule. All components have been updated to the new design system and accessibility improvements have been implemented.',
    source: 'Product Management Tool',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    category: 'development',
    sentiment: 'positive',
    relevance: 0.96,
  },
  {
    id: '2',
    title: 'Database migration delayed due to unexpected data volume',
    content: 'The planned database migration has been postponed by 48 hours due to larger than expected data volumes. The team is optimizing the migration scripts to reduce downtime.',
    source: 'Engineering Slack Channel',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    category: 'infrastructure',
    sentiment: 'negative',
    relevance: 0.93,
  },
  {
    id: '3',
    title: 'New API endpoint deployed for analytics integration',
    content: 'The analytics team has deployed a new API endpoint that provides real-time user behavior data. Documentation has been updated and example implementations are available in the developer portal.',
    source: 'GitHub Pull Request',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: 'development',
    sentiment: 'positive',
    relevance: 0.85,
  }
];

// Function to fetch initial data based on the selected source
export const fetchInitialData = async (dataSource: DataSource): Promise<DataEntry[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  switch (dataSource) {
    case 'financial':
      return [...financialData];
    case 'tech':
      return [...techData];
    case 'health':
      return [...healthData];
    case 'project':
      return [...projectData];
    default:
      return [];
  }
};

// Generate a new data entry
const generateNewEntry = (dataSource: DataSource, existingEntries: DataEntry[]): DataEntry => {
  const now = new Date();
  const id = (Math.max(...existingEntries.map(entry => parseInt(entry.id))) + 1).toString();
  
  const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
  
  const newEntries = {
    financial: {
      titles: [
        'Bitcoin surpasses $100,000 for the first time',
        'Major merger announced between tech giants',
        'Startup raises $500M in latest funding round',
        'Market volatility increases amid global uncertainty'
      ],
      contents: [
        'The cryptocurrency market reached a new milestone as Bitcoin crossed the $100,000 mark, driven by institutional adoption and regulatory clarity.',
        'Two of the largest technology companies have announced plans to merge, creating a combined entity valued at over $2 trillion.',
        'A promising AI startup has secured $500M in Series C funding, valuing the company at $8 billion.',
        'Global markets are experiencing increased volatility due to geopolitical tensions and uncertain economic indicators.'
      ],
      sources: ['Bloomberg', 'CNBC', 'Wall Street Journal', 'Reuters'],
      categories: ['cryptocurrency', 'mergers', 'startups', 'markets']
    },
    tech: {
      titles: [
        'Revolutionary new battery technology promises week-long phone charge',
        'Major breakthrough in quantum error correction announced',
        'Tech company unveils neural interface for consumer market',
        'Autonomous vehicle fleet achieves 1 million miles without human intervention'
      ],
      contents: [
        'Researchers have developed a new battery technology that could extend smartphone battery life to over a week on a single charge.',
        'Scientists have solved a key challenge in quantum computing by developing a more efficient error correction algorithm.',
        'A leading tech company has announced a consumer-grade neural interface that allows basic device control through thought alone.',
        'A fleet of fully autonomous vehicles has completed 1 million miles of driving without requiring human intervention.'
      ],
      sources: ['Wired', 'IEEE Spectrum', 'The Verge', 'TechCrunch'],
      categories: ['hardware', 'quantum computing', 'biotech', 'autonomous vehicles']
    },
    health: {
      titles: [
        'New cancer screening method detects 50 types with single blood test',
        'AI system outperforms doctors in diagnosing rare diseases',
        'Study finds strong correlation between sleep quality and cognitive health',
        'Novel treatment shows promise for antibiotic-resistant infections'
      ],
      contents: [
        'A revolutionary blood test can now screen for 50 different types of cancer with high accuracy from a single blood sample.',
        'An artificial intelligence diagnostic system has demonstrated superior performance in identifying rare diseases compared to specialist physicians.',
        'New research indicates that sleep quality is more strongly linked to long-term cognitive health than previously understood.',
        'Scientists have developed a new treatment approach that shows effectiveness against infections resistant to conventional antibiotics.'
      ],
      sources: ['New England Journal of Medicine', 'Science Daily', 'The Lancet', 'Medical News Today'],
      categories: ['diagnostics', 'AI in medicine', 'sleep science', 'infectious disease']
    },
    project: {
      titles: [
        'User testing reveals critical usability improvements needed',
        'Security audit completed with no critical findings',
        'Performance optimization reduced page load time by 40%',
        'New feature request prioritized for next sprint'
      ],
      contents: [
        'Recent user testing sessions have identified several key usability issues that need addressing before the next release.',
        'The third-party security audit has been completed with no critical vulnerabilities found. Minor recommendations have been documented.',
        'The performance team has implemented optimizations that reduced average page load time by 40%, significantly improving user experience.',
        'The product team has prioritized a new feature request for the upcoming sprint based on customer feedback and strategic alignment.'
      ],
      sources: ['UX Research Report', 'Security Assessment Document', 'Performance Monitoring Dashboard', 'Product Backlog'],
      categories: ['user experience', 'security', 'performance', 'product development']
    }
  };
  
  const sourceData = newEntries[dataSource];
  
  return {
    id,
    title: getRandomElement(sourceData.titles),
    content: getRandomElement(sourceData.contents),
    source: getRandomElement(sourceData.sources),
    timestamp: now,
    category: getRandomElement(sourceData.categories),
    sentiment: getRandomElement(sentiments),
    relevance: 0.7 + Math.random() * 0.3 // Between 0.7 and 1.0
  };
};

// Function to fetch new data (simulating real-time updates)
export const fetchNewData = async (
  dataSource: DataSource, 
  existingEntries: DataEntry[]
): Promise<DataEntry[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Generate 1-2 new entries
  const numberOfNewEntries = Math.random() > 0.5 ? 2 : 1;
  const newEntries: DataEntry[] = [];
  
  for (let i = 0; i < numberOfNewEntries; i++) {
    newEntries.push(generateNewEntry(dataSource, [...existingEntries, ...newEntries]));
  }
  
  // Return the updated list with new entries at the beginning
  return [...newEntries, ...existingEntries];
};