// components/CakeAvailability.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CakeAvailability({ cakeId, maxDailyCakes = 10 }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [isFull, setIsFull] = useState(false);

  const checkAvailability = async (date: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .eq('pickup_date', date);

    if (data && data.length >= maxDailyCakes) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  };

  return (
    <div className="space-y-4">
      <input 
        type="date"
        className={`w-full p-3 border rounded-xl ${isFull ? 'border-red-500 bg-red-50' : 'border-stone-200'}`}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          checkAvailability(e.target.value);
        }}
      />
      
      {isFull && (
        <p className="text-red-600 text-sm font-medium">
          ⚠️ We are fully booked for cakes on this date. Please select another day!
        </p>
      )}

      <button 
        disabled={isFull || !selectedDate}
        className="w-full bg-stone-900 text-white py-3 rounded-xl disabled:bg-stone-300"
      >
        {isFull ? 'Date Unavailable' : 'Reserve Cake Slot'}
      </button>
    </div>
  );
}