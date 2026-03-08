import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key (has higher permissions)
const supabase = createClient(
  'https://ulxzyjqmvzyqjynmqywe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHp5anFtdnp5cWp5bm1xeXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjI5NzI3NiwiZXhwIjoyMDg3ODczMjc2fQ.LlF5YqF9HAfmnYJiOrgthA1vsF_sx3f9gAIs4ckZdyM'
);

async function checkAtomicHabits() {
  try {
    console.log('=== Querying Atomic Habits from Supabase ===\n');
    
    // Direct query as requested
    const { data, error } = await supabase
      .from('summaries')
      .select(`
        long_summary,
        books!inner(title)
      `)
      .eq('books.title', 'Atomic Habits');
    
    if (error) {
      console.error('❌ Query Error:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('❌ No data found for Atomic Habits');
      return;
    }
    
    const summary = data[0];
    console.log('✅ Found Atomic Habits summary');
    console.log('📊 Summary length:', summary.long_summary?.length || 0, 'characters');
    console.log('📄 First 500 characters:');
    console.log('─'.repeat(50));
    console.log(summary.long_summary?.substring(0, 500) || 'No content');
    console.log('─'.repeat(50));
    console.log('\n📝 Full summary stats:');
    console.log('- Word count:', summary.long_summary?.split(' ').length || 0);
    console.log('- Paragraph count:', summary.long_summary?.split('\n\n').length || 0);
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkAtomicHabits();
