import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Book } from '../types';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from('books')
        .select('*, summaries(short_summary, long_summary)')
        .order('title');
      
      if (data) {
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
      setLoading(false);
    }
    fetchBooks();
  }, []);

  return { books, loading };
}
