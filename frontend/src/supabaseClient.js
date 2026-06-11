import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rivnmqryckchsusbgelm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdm5tcXJ5Y2tjaHN1c2JnZWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2Mzg0NzEsImV4cCI6MjA5NTIxNDQ3MX0.ocBVxVy1PYN3EsEYnAMC1rBNvXXnuusz8d_9rYTtllc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);