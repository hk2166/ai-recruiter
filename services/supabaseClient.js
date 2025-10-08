import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null;

export const supabase = new Proxy({}, {
    get(target, prop) {
        if (!supabaseInstance) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

            if (supabaseUrl && supabaseKey) {
                supabaseInstance = createClient(supabaseUrl, supabaseKey);
            } else {
                throw new Error('Supabase credentials are not configured');
            }
        }
        return supabaseInstance[prop];
    }
});