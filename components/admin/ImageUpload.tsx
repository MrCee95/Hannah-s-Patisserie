'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, Loader2, CheckCircle } from 'lucide-react';

export default function ImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setStatus('idle');

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `menu/${fileName}`;

      // 1. Upload the file to your 'pastries' bucket
      const { error: uploadError } = await supabase.storage
        .from('pastries')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pastries')
        .getPublicUrl(filePath);

      // 3. Send the URL back to the main form
      onUploadComplete(publicUrl);
      setStatus('success');
    } catch (error) {
      alert('Error uploading image!');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-bakery cursor-pointer transition-all ${
        status === 'success' ? 'border-green-500 bg-green-50' : 'border-stone-300 bg-stone-50 hover:bg-stone-100'
      }`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
              <p className="text-xs font-bold text-green-600 uppercase">Image Ready</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-stone-400 mb-2" />
              <p className="text-sm text-stone-500 font-medium">Upload Pastry Photo</p>
              <p className="text-[10px] text-stone-400 mt-1 uppercase">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={uploading} 
        />
      </label>
    </div>
  );
}