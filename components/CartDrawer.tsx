'use client';

import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: state.items,
          type: state.items.some(i => i.category === 'cake') ? 'cake' : 'retail'
        }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag size={24} /> Your Bag
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {state.items.length === 0 ? (
            <p className="text-stone-500 text-center py-20">Your bag is empty. Time for a treat?</p>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-stone-100 pb-4">
                <div>
                  <p className="font-bold text-stone-900">{item.name}</p>
                  <p className="text-sm text-stone-500">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                  {item.pickupDate && (
                    <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">
                      Pickup: {item.pickupDate}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="text-stone-300 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="pt-8 border-t border-stone-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-500 font-medium">Subtotal</span>
              <span className="text-2xl font-mono font-bold">${state.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-amber-800 transition disabled:bg-stone-400"
            >
              {loading ? 'Processing...' : 'Checkout Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}