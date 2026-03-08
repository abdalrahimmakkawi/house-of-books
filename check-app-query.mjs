import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key
const supabase = createClient(
  'https://ulxzyjqmvzyqjynmqywe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHp5anFtdnp5cWp5bm1xeXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjI5NzI3NiwiZXhwIjoyMDg3ODczMjc2fQ.LlF5YqF9HAfmnYJiOrgthA1vsF_sx3f9gAIs4ckZdyM'
);

async function checkAppQuery() {
  try {
    console.log('=== Testing Exact App Query for Atomic Habits ===\n');
    
    // This is the exact query the app uses in useBooks.ts
    const { data, error } = await supabase
      .from('books')
      .select('*, summaries(short_summary, long_summary, key_insights)')
      .eq('title', 'Atomic Habits')
      .single();
    
    if (error) {
      console.error('❌ Query Error:', error);
      return;
    }
    
    console.log('✅ Found Atomic Habits book data');
    console.log('📊 Book info:');
    console.log('- Title:', data.title);
    console.log('- Author:', data.author);
    console.log('- ID:', data.id);
    
    console.log('\n📄 Summaries data:');
    if (data.summaries && data.summaries.length > 0) {
      const summary = data.summaries[0];
      console.log('- Short summary length:', summary.short_summary?.length || 0, 'characters');
      console.log('- Long summary length:', summary.long_summary?.length || 0, 'characters');
      console.log('- Key insights count:', summary.key_insights?.length || 0);
      
      console.log('\n📝 Short summary (first 200 chars):');
      console.log('─'.repeat(50));
      console.log(summary.short_summary?.substring(0, 200) || 'No content');
      console.log('─'.repeat(50));
      
      console.log('\n📝 Long summary (first 500 chars):');
      console.log('─'.repeat(50));
      console.log(summary.long_summary?.substring(0, 500) || 'No content');
      console.log('─'.repeat(50));
      
      // Check if this looks like the detailed summary we created
      const isDetailed = summary.long_summary?.includes('comprehensive framework') && 
                        summary.long_summary?.length > 1000;
      
      console.log('\n🔍 Analysis:');
      console.log('- Is detailed summary:', isDetailed);
      console.log('- Contains comprehensive framework:', summary.long_summary?.includes('comprehensive framework'));
      console.log('- Word count:', summary.long_summary?.split(' ').length || 0);
    } else {
      console.log('❌ No summaries data found');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkAppQuery();
