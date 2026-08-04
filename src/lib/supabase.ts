import { createClient } from "@supabase/supabase-js";

let supabaseUrl = ((import.meta as any).env.VITE_SUPABASE_URL || "https://ksewmzuchawakpgcgsqx.supabase.co").trim();
if (supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
} else if (supabaseUrl.endsWith('/rest/v1')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1', '');
}
const supabaseKey = ((import.meta as any).env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZXdtenVjaGF3YWtwZ2Nnc3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1ODQ0NDEsImV4cCI6MjEwMTE2MDQ0MX0.33vBVcq5r1gS0cv9Shezp4sNhpSUtDQZAIiC27PLPHE").trim();

export const supabase = createClient(supabaseUrl, supabaseKey);
