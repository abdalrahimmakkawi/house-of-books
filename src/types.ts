export type Theme = 'light' | 'dark' | 'classic' | 'nature' | 'beach' | 'cosmos';

export interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: 'serif' | 'sans';
}

export interface AmbientSound {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  readTime: number; // in minutes
  summary: string;
  keyInsights: string[];
}

export type Category = 'Self-Improvement' | 'Business' | 'Psychology' | 'Technology' | 'History';
