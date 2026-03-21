'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // 1. Logic to add to your Cart Context/Zustand goes here
    setAdded(true);
    
    // Reset the "Added" state after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.image_url || '/placeholder-pastry.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-800">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-900">{product.name}</h3>
          <p className="text-lg font-mono text-amber-700">${product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-stone-500 text-sm mb-6 line-clamp-2">
          Freshly baked this morning using organic flour and local dairy.
        </p>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            added 
              ? 'bg-green-600 text-white' 
              : 'bg-stone-900 text-white hover:bg-amber-800'
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}


// Inside ProductCard.tsx
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...product, quantity: 1 } 
    });
  };
  
  // ... rest of component
}