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

        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

        // Step 1: Simple query to see ALL columns
        const { data: simpleData, error: simpleError } = await supabase
          .from('books')
          .select('*')
          .limit(1);
        
        console.log('Simple query result:', simpleData);
        console.log('Query error:', simpleError);

        // Step 2: Try with summaries
        const { data: summaryData, error: summaryError } = await supabase
          .from('books')
          .select('*, summaries(*)')
          .limit(1);
        
        console.log('With summaries:', summaryData);
        console.log('Summary query error:', summaryError);

        // Step 3: Original query
        const { data, error } = await supabase
          .from('books')
          .select('*, summaries(short_summary, long_summary, key_insights)')
          .order('title');
        
        if (error) {
          console.error('Error fetching books from Supabase:', error);
          console.log('Falling back to sample books');
          setBooks(SAMPLE_BOOKS);
        } else if (data) {
          console.log('Raw Supabase row:', JSON.stringify(data[0], null, 2));
          const mapped = data.map(b => ({
            id: b.id,
            title: b.title,
            author: b.author,
            coverUrl: b.cover_url,
            category: b.category,
            readTime: b.read_time_mins || 15,
            summary: b.summaries?.[0]?.short_summary || '',
            longSummary: b.summaries?.[0]?.long_summary || '',
            keyInsights: b.summaries?.[0]?.key_insights || [],
          }));
          console.log('Mapped book:', mapped[0]);
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
