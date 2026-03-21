// app/admin/inventory/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function InventoryManager({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  const toggleStock = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ inStock: !currentStatus })
      .eq('id', id);

    if (!error) {
      setProducts(products.map(p => 
        p.id === id ? { ...p, inStock: !currentStatus } : p
      ));
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Daily Inventory</h1>
      <div className="bg-white rounded-xl shadow border border-stone-200 divide-y">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-md overflow-hidden">
                <img src={product.image_url} alt="" className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="font-semibold text-stone-900">{product.name}</p>
                <p className="text-sm text-stone-500">${product.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold uppercase ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Sold Out'}
              </span>
              <button
                onClick={() => toggleStock(product.id, product.inStock)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  product.inStock ? 'bg-green-500' : 'bg-stone-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  product.inStock ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}