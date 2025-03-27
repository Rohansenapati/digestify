
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface User {
  id: string;
  email: string;
  isVerified: boolean;
  name?: string;
  avatar?: string;
}

export interface Preference {
  id: string;
  userId: string;
  topics: string[];
  keywords: string[];
  sources: string[];
  excludedSources: string[];
}

export interface Article {
  id: string;
  title: string;
  source: string;
  author: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
  content: string;
  summary: string;
  sentiment: SentimentType;
  explanation: string;
  topics: string[];
  isRead: boolean;
  isSaved: boolean;
}
