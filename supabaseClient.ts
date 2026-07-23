import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qboycwhftvydxiypyfhg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFib3ljd2hmdHZ5ZHhpeXB5ZmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NDg2NjksImV4cCI6MjA4NTEyNDY2OX0.MFMmHqozvbJzAZXoYzpRbXp184wcy2sBgLT3wrRzH1U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);