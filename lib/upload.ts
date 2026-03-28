import { supabase } from './supabase';

export async function uploadPastryImage(file: File) {
  // 1. Create a unique name (e.g., "croissant-1711123456.jpg")
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `menu/${fileName}`;

  // 2. Upload to the 'pastries' bucket
  const { data, error } = await supabase.storage
    .from('pastries')
    .upload(filePath, file);

  if (error) throw error;

  // 3. Get the Public URL to save into the Products table
  const { data: { publicUrl } } = supabase.storage
    .from('pastries')
    .getPublicUrl(filePath);

  return publicUrl;
}