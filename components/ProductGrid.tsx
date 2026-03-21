'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Search, Cookie, Croissant, IceCream } from 'lucide-react';

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: null },
    { name: 'Pastries', icon: <Croissant size={16} /> },
    { name: 'Bread', icon: <Cookie size={16} /> }, // Closest icon for sourdough
    { name: 'Ice Cream', icon: <IceCream size={16} /> },
  ];

  // Logic: Filter by Category AND Search Term simultaneously
  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-[2.5rem] shadow-soft border border-stone-100">
        
        {/* Category Toggles */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.name 
                ? 'bg-stone-900 text-white shadow-lg' 
                : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text"
            placeholder="Search our kitchen..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 rounded-full border-none focus:ring-2 focus:ring-amber-700 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-400 font-serif italic">No pastries found matching "{search}" in {activeCategory}.</p>
        </div>
      )}
    </div>
  );
}