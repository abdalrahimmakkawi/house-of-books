import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './load-env.mjs';

// Test Supabase connection with proper environment variables
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);
    console.log('Key exists:', !!supabaseAnonKey);
    
    // Test a simple query
    const { data, error } = await supabase
      .from('books')
      .select('title, author')
      .limit(1);
    
    if (error) {
      console.error('Supabase query error:', error);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('Sample data:', data);
    }
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testSupabaseConnection();
