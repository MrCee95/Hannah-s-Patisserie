'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Calculate total quantity (e.g., 2 croissants + 1 cake = 3 items)
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-stone-900">
            CRUST <span className="text-amber-700">&</span> CREAM
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link href="/" className="hover:text-amber-700 transition">Shop</Link>
            <Link href="/classes" className="hover:text-amber-700 transition">Training</Link>
            <Link href="/about" className="hover:text-amber-700 transition">Our Story</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-stone-50 rounded-full hover:bg-stone-100 transition group"
            >
              <ShoppingBag size={20} className="text-stone-700 group-hover:text-amber-700" />
              
              {/* Cart Badge */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button className="md:hidden p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* The Cart Sidebar Component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}