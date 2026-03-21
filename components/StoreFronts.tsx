'use client';
import { useState } from 'react';

export default function StoreFront({ products, classes }) {
  const [cart, setCart] = useState([]);

  const checkout = async (type: 'retail' | 'training', id?: string) => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ 
        items: type === 'retail' ? cart : [{ id }], 
        metadata: { type } 
      }),
    });
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section id="menu">
        <h2 className="text-3xl font-serif mb-6">Today's Fresh Batch</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(p => (
            <div key={p.id} className="border p-4 rounded-xl">
              <img src={p.image_url} className="rounded-lg mb-2" />
              <p className="font-bold">{p.name}</p>
              <button 
                onClick={() => setCart([...cart, p])}
                className="w-full mt-2 bg-stone-100 py-2 rounded-lg text-sm"
              >
                Add to Bag - ${p.price}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="classes" className="mt-20">
        <h2 className="text-3xl font-serif mb-6">Upcoming Workshops</h2>
        <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
          {classes.map(c => (
            <div key={c.id} className="flex justify-between items-center py-4 border-b border-amber-200 last:border-0">
              <div>
                <h4 className="font-bold text-lg">{c.title}</h4>
                <p className="text-sm text-stone-600">{new Date(c.event_date).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => checkout('training', c.id)}
                className="bg-amber-800 text-white px-6 py-2 rounded-full"
              >
                Book Seat - ${c.price}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}