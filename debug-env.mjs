// Debug script to check environment variables
console.log('=== Environment Variables Debug ===');
console.log('VITE_SUPABASE_URL:', import.meta.env?.VITE_SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env?.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

// Try to load from .env file manually
import { readFileSync } from 'fs';
import path from 'path';

try {
  const envPath = path.join(process.cwd(), '.env');
  const envContent = readFileSync(envPath, 'utf8');
  console.log('\n=== .env file content ===');
  console.log(envContent);
} catch (error) {
  console.log('\n=== .env file ===');
  console.log('File not found or cannot be read');
}

try {
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envLocalContent = readFileSync(envLocalPath, 'utf8');
  console.log('\n=== .env.local file content ===');
  console.log(envLocalContent);
} catch (error) {
  console.log('\n=== .env.local file ===');
  console.log('File not found or cannot be read');
}
