// components/CakeOrderForm.tsx
'use client';
import { useState } from 'react';
import { addDays, format } from 'date-fns';

export default function CakeOrderForm({ cake }) {
  const minDate = addDays(new Date(), cake.lead_time_days || 2);
  const [selectedDate, setSelectedDate] = useState(format(minDate, 'yyyy-MM-dd'));
  const [inscription, setInscription] = useState('');

  const handleAddToCart = () => {
    const cartItem = {
      ...cake,
      pickupDate: selectedDate,
      inscription: inscription,
      quantity: 1
    };
    // Add to your global Cart state (Zustand/Context)
    console.log("Cake added to cart:", cartItem);
  };

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-sm">
      <h3 className="text-2xl font-bold">{cake.name}</h3>
      <p className="text-stone-500 mb-4">{cake.description}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pickup Date (Min 48hr notice)</label>
          <input 
            type="date" 
            min={format(minDate, 'yyyy-MM-dd')}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cake Inscription (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g., Happy Birthday Sarah!"
            value={inscription}
            onChange={(e) => setInscription(e.target.value)}
            className="w-full p-2 border rounded-md"
            maxLength={40}
          />
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-amber-800 transition"
        >
          Add to Order • ${cake.price}
        </button>
      </div>
    </div>
  );
}