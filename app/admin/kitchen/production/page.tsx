'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format, isTomorrow, isToday } from 'date-fns';

export default function CakeProductionCalendar() {
  const [dailyGroups, setDailyGroups] = useState<any>({});

  useEffect(() => {
    const fetchCakes = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .contains('items', [{ category: 'cake' }]) // Filter for cakes
        .neq('status', 'completed')
        .order('pickup_date', { ascending: true });

      // Group by Date: { "2026-03-22": [order1, order2], ... }
      const groups = data?.reduce((acc: any, order: any) => {
        const date = order.pickup_date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(order);
        return acc;
      }, {});
      
      setDailyGroups(groups || {});
    };

    fetchCakes();
  }, []);

  return (
    <div className="p-8 bg-stone-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-stone-800">Cake Production Schedule</h1>
      
      <div className="space-y-10">
        {Object.keys(dailyGroups).map((date) => (
          <div key={date} className="space-y-4">
            <h2 className={`text-xl font-mono font-bold p-2 inline-block rounded ${
              isToday(new Date(date)) ? 'bg-red-100 text-red-700' : 
              isTomorrow(new Date(date)) ? 'bg-amber-100 text-amber-700' : 'bg-stone-200'
            }`}>
              {format(new Date(date), 'EEEE, MMM do')} 
              {isToday(new Date(date)) && " — TODAY"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyGroups[date].map((order: any) => (
                <div key={order.id} className="bg-white border-2 border-stone-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-stone-400 uppercase">Order #{order.id.slice(0,5)}</span>
                    <span className="bg-stone-100 text-[10px] px-2 py-1 rounded">PREP REQUIRED</span>
                  </div>

                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="mb-4">
                      <p className="text-lg font-bold text-stone-900">{item.name}</p>
                      {item.inscription && (
                        <div className="mt-2 p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-900 italic">
                          " {item.inscription} "
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button className="w-full mt-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition text-sm font-semibold">
                    View Specs & Photos
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}