import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Book } from '../types';
import { SAMPLE_BOOKS } from '../constants';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      console.log('SUPABASE URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('SUPABASE KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      try {
        // Check if Supabase is configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          console.log('Using sample books - Supabase not configured');
          const sampleBooksWithPremium = SAMPLE_BOOKS.map((book, index) => ({
            ...book,
            isPremium: index >= 2, // Books 3+ are premium (for testing with sample data)
          }));
          setBooks(sampleBooksWithPremium);
          setLoading(false);
          return;
        }

        // Check if user is premium
        const isPremium = localStorage.getItem('isPremium') === 'true';

        // Step 3: Original query
        const { data, error } = await supabase
          .from('books')
          .select('*, summaries(short_summary, long_summary, key_insights)')
          .order('title');
        
        if (error) {
          console.error('Error fetching books from Supabase:', error);
          console.log('Falling back to sample books');
          const sampleBooksWithPremium = SAMPLE_BOOKS.map((book, index) => ({
            ...book,
            isPremium: index >= 2, // Books 3+ are premium (for testing with sample data)
          }));
          setBooks(sampleBooksWithPremium);
        } else if (data) {
          const mapped = data.map((b, index) => ({
            id: b.id,
            title: b.title,
            author: b.author,
            coverUrl: b.cover_url,
            category: b.category,
            readTime: b.read_time_mins || 15,
            summary: b.summaries?.[0]?.short_summary || '',
            longSummary: b.summaries?.[0]?.long_summary || '',
            keyInsights: b.summaries?.[0]?.key_insights || [],
            isPremium: index >= 44, // Books 45+ are premium
          }));

          console.log('Total books:', mapped.length);
          console.log('Free books:', mapped.filter(b => !b.isPremium).length);
          console.log('Premium books:', mapped.filter(b => b.isPremium).length);

          // Always show all 110 books - isPremium flag controls access, not filtering
          const filteredBooks = mapped; 
          setBooks(filteredBooks);
        }
      } catch (error) {
        console.error('Error in fetchBooks:', error);
        console.log('Falling back to sample books');
        const sampleBooksWithPremium = SAMPLE_BOOKS.map((book, index) => ({
          ...book,
          isPremium: index >= 2, // Books 3+ are premium (for testing with sample data)
        }));
        setBooks(sampleBooksWithPremium);
      }
      setLoading(false);
    }
    fetchBooks();
  }, []);

  return { books, loading };
}
