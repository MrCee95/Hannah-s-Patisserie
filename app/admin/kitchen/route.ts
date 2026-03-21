'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_URL!, process.env.NEXT_PUBLIC_KEY!);

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // 1. Initial Fetch
    fetchOrders();

    // 2. Real-time Subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' }, 
        (payload) => {
          setOrders((prev) => [payload.new, ...prev]);
          new Audio('/chime.mp3').play().catch(() => {}); // Play alert
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(orders.filter(o => o.id !== id)); // Remove from view if "Completed"
  };

  return (
    <div className="bg-stone-900 min-h-screen p-6 text-white">
      <header className="flex justify-between items-center mb-8 border-b border-stone-700 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">KITCHEN LIVE FEED</h1>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-stone-400 font-mono">LIVE CONNECTION</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white text-black rounded-lg shadow-xl overflow-hidden">
            <div className="bg-amber-100 px-4 py-2 flex justify-between border-b border-amber-200">
              <span className="font-mono font-bold">#{order.id.slice(0, 5)}</span>
              <span className="text-sm font-semibold uppercase">{order.customer_name}</span>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Order Content */}
              <ul className="space-y-2">
                {order.items?.map((item: any, i: number) => (
                  <li key={i} className="flex justify-between">
                    <span className="font-bold">{item.quantity}x</span>
                    <span className="flex-1 ml-4">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => updateStatus(order.id, 'ready')}
              className="w-full bg-stone-800 text-white py-4 font-bold hover:bg-green-600 transition-colors"
            >
              MARK AS READY
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}