const url = process.env.SUPABASE_URL;
const fixed = url ? url.replace(/\/rest\/v1\/?$/, '') : "https://ksewmzuchawakpgcgsqx.supabase.co";
console.log(fixed);
