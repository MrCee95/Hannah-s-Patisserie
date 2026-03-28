'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Clock, Package, Bell } from 'lucide-react';

export default function KitchenView() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // 1. Initial Load of Pending/Preparing orders
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .filter('status', 'in', '("Pending", "Preparing")')
        .order('created_at', { ascending: true });
      setOrders(data || []);
    };

    fetchOrders();

    // 2. REALTIME: Listen for new orders automatically
    const channel = supabase
      .channel('kitchen_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders((prev) => [...prev, payload.new]);
        new Audio('/notification.mp3').play().catch(() => {}); // Optional alert sound
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    setOrders((prev) => prev.filter(order => order.id !== id || newStatus === 'Preparing'));
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8">
      <header className="flex justify-between items-center mb-12 border-b border-stone-800 pb-6">
        <div>
          <h1 className="text-4xl font-serif">Kitchen Prep List</h1>
          <p className="text-amber-500 font-mono text-sm uppercase tracking-widest mt-2">Live Orders • Kasoa</p>
        </div>
        <div className="bg-stone-800 px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold uppercase">System Online</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-stone-800 rounded-bakery p-6 border-l-8 border-amber-600 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase mb-1">Order #{order.id.slice(-4)}</p>
                <h3 className="text-xl font-bold">{order.customer_name}</h3>
              </div>
              <span className="bg-stone-700 text-amber-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <ul className="space-y-4 mb-8">
              {order.items.map((item: any, idx: number) => (
                <li key={idx} className="flex justify-between items-center border-b border-stone-700 pb-2">
                  <span className="text-lg font-medium"><span className="text-amber-500 font-bold">x{item.quantity}</span> {item.name}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button 
                onClick={() => updateStatus(order.id, 'Preparing')}
                className="flex-1 bg-stone-700 hover:bg-stone-600 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Clock size={16} /> Start Prep
              </button>

                const markAsReady = async (id: string) => {
  // Call our new API route
  const response = await fetch('/api/orders/ready', {
    method: 'POST',
    body: JSON.stringify({ orderId: id }),
  });

  if (response.ok) {
    // Remove from the kitchen list locally
    setOrders((prev) => prev.filter(order => order.id !== id));
  }
};

// ... in the button JSX
<button 
  onClick={() => markAsReady(order.id)}
  className="flex-1 bg-amber-600 hover:bg-amber-500 py-3 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
>
  <Package size={16} /> Mark Ready & Notify
</button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-40 opacity-20">
          <h2 className="text-3xl font-serif">All caught up!</h2>
          <p>The ovens are prepped for the next batch.</p>
        </div>
      )}
    </div>
  );
}