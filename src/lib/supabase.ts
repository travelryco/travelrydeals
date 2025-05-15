import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://emgainlaebkiiifljwii.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZ2FpbmxhZWJraWlpZmxqd2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzA5MDEsImV4cCI6MjA2MjkwNjkwMX0.iT0N1YuKmlAUMQkG9lG6N4HsY4-GholgC_cjOdNGRq0';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 