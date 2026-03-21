// /types/index.ts
export interface Product {
  id: string;
  name: string;
  category: 'pastry' | 'ice-cream';
  price: number;
  inStock: boolean;
  image_url: string;
}

export interface TrainingClass {
  id: string;
  title: string;
  date: Date;
  capacity: number;
  spots_left: number;
  price: number;
}

// /lib/supabase.ts (Simplified Fetch)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.URL!, process.env.KEY!);

export const getProducts = async () => {
  const { data } = await supabase.from('products').select('*').eq('inStock', true);
  return data;
};