import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
  id: string;
  name: string | null;
  document: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_document: string | null;
  customer_phone: string | null;
  product_id: string;
  product_name: string;
  product_price: number;
  payment_method: string;
  payment_status: string;
  payment_amount: number;
  event_type: string;
  webhook_data: any;
  created_at: string;
}

export interface UserModule {
  id: string;
  user_id: string;
  module_id: string;
  unlocked_at: string;
}