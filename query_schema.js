import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ksewmzuchawakpgcgsqx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZXdtenVjaGF3YWtwZ2Nnc3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1ODQ0NDEsImV4cCI6MjEwMTE2MDQ0MX0.33vBVcq5r1gS0cv9Shezp4sNhpSUtDQZAIiC27PLPHE";
const supabase = createClient(supabaseUrl, supabaseKey);
async function run() {
  const res = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
  const data = await res.json();
  console.log(data);
}
run();
