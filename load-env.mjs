import { readFileSync } from 'fs';
import path from 'path';

// Load environment variables from .env file
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf8');
    
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key] = value;
        }
      }
    });
    
    console.log('Environment variables loaded successfully');
  } catch (error) {
    console.error('Error loading .env file:', error.message);
  }
}

loadEnv();

export const supabaseUrl = process.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT SET');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'SET' : 'NOT SET');
