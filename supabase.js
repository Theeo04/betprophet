// utils/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bzdaeaklmnwmwakandpb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZGFlYWtsbW53bXdha2FuZHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NzgwNzcsImV4cCI6MjAxMDQ1NDA3N30.VyxPEA9hVf0kuFrlsoyilSltgvEMqI-oIx6XaTKL5Pw";

export const supabase = createClient(supabaseUrl, supabaseKey);
