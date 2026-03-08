import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ulxzyjqmvzyqjynmqywe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHp5anFtdnp5cWp5bm1xeXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjI5NzI3NiwiZXhwIjoyMDg3ODczMjc2fQ.LlF5YqF9HAfmnYJiOrgthA1vsF_sx3f9gAIs4ckZdyM'
);

async function getMissingBooks() {
  // First get all books with summaries
  const { data: booksWithSummaries, error: summaryError } = await supabase
    .from('summaries')
    .select('book_id');
  
  if (summaryError) {
    console.error('Error fetching summaries:', summaryError);
    return;
  }
  
  const bookIdsWithSummaries = new Set(booksWithSummaries?.map(s => s.book_id) || []);
  
  // Then get all books and filter
  const { data: allBooks, error: booksError } = await supabase
    .from('books')
    .select('id, title, author');
  
  if (booksError) {
    console.error('Error fetching books:', booksError);
    return;
  }
  
  const missingBooks = allBooks.filter(book => !bookIdsWithSummaries.has(book.id));
  
  console.log('Missing books:');
  missingBooks.forEach(book => console.log(`- ${book.title} by ${book.author}`));
  console.log(`Total missing: ${missingBooks.length}`);
}

getMissingBooks();
