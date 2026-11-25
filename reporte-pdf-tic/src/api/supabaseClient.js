import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxxqxftovrdzeaqmdcdo.supabase.co';
const supabaseAnonKey = 'sb_publishable_eHLP1_apad-fCcxpgmrx3g_REXCOcwC';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Faltan las variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);