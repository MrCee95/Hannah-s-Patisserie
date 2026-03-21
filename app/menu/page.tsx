import React, { useState } from 'react';

// Mock Data for MVP - This will later come from Supabase
const MENU_ITEMS = [
  { id: '1', name: 'Almond Croissant', price: 4.50, category: 'pastry', img: '/pastry-1.jpg', tags: ['Classic', 'Best Seller'] },
  { id: '2', name: 'Dark Chocolate Gelato', price: 6.00, category: 'ice-cream', img: '/ice-1.jpg', tags: ['Vegan'] },
  { id: '3', name: 'Pistachio Tart', price: 5.50, category: 'pastry', img: '/pastry-2.jpg', tags: ['Limited'] },
  { id: '4', name: 'Honeycomb Scoop', price: 6.00, category: 'ice-cream', img: '/ice-2.jpg', tags: ['Award Winning'] },
];

export default function MenuGrid() {
  const [filter, setFilter] = useState<'all' | 'pastry' | 'ice-cream'>('all');

  const filteredItems = filter === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-800">Today's Selection</h2>
          <p className="text-stone-500 mt-2 italic">Baked fresh at 5:00 AM daily.</p>
        </div>

        <div className="flex bg-stone-100 p-1 rounded-xl">
          {['all', 'pastry', 'ice-cream'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === type ? 'bg-white shadow-sm text-amber-700' : 'text-stone-500'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
              {/* Image Placeholder - Use Next/Image in Prod */}
              <div className="absolute inset-0 bg-stone-300 group-hover:scale-105 transition-transform duration-500" />
              
              {/* Badge */}
              <div className="absolute top-3 left-3 flex gap-1">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold text-stone-800 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-stone-800">{item.name}</h3>
                <p className="text-amber-700 font-medium">${item.price.toFixed(2)}</p>
              </div>
              <button className="p-2 border border-stone-200 rounded-full hover:bg-stone-800 hover:text-white transition-colors">
                <PlusIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}