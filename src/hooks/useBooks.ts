import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Book } from '../types';
import { SAMPLE_BOOKS } from '../constants';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        // Check if Supabase is configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          console.log('Using sample books - Supabase not configured');
          setBooks(SAMPLE_BOOKS);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('books')
          .select('*, summaries(short_summary, long_summary)')
          .order('title');
        
        if (error) {
          console.error('Error fetching books from Supabase:', error);
          console.log('Falling back to sample books');
          setBooks(SAMPLE_BOOKS);
        } else if (data) {
          const mapped = data.map(b => ({
            id: b.id,
            title: b.title,
            author: b.author,
            coverUrl: b.cover_url,
            category: b.category,
            readTime: b.read_time || 15,
            summary: b.summaries?.[0]?.short_summary || '',
            keyInsights: b.key_insights || []
          }));
          setBooks(mapped);
        }
      } catch (error) {
        console.error('Error in fetchBooks:', error);
        console.log('Falling back to sample books');
        setBooks(SAMPLE_BOOKS);
      }
      setLoading(false);
    }
    fetchBooks();
  }, []);

  return { books, loading };
}
