import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulxzyjqmvzyqjynmqywe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHp5anFtdnp5cWp5bm1xeXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTcyNzYsImV4cCI6MjA4Nzg3MzI3Nn0.Oe9S5tGJqGJmveLHkMVbCfqAmVp0HRFzc0JHhDJVpSc';

console.log('Supabase URL available:', !!supabaseUrl);
console.log('Supabase Key available:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
