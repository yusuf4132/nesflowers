import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cradhcnbwjcfwlmricmv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYWRoY25id2pjZndsbXJpY212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDA0MzEsImV4cCI6MjA3NzIxNjQzMX0.gq-mn8uXd9LRG0-S2cImmsKFRZObyfqSO1U-Ws01BYE" // Dashboard > Project Settings > API sekmesinde bulabilirsin

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,   // ✅ olmalı
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});