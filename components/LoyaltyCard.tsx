'use client';

import { Wheat } from 'lucide-react';

export default function LoyaltyCard({ stamps }: { stamps: number }) {
  const goal = 5;
  const progress = (stamps % goal);
  const isRewardReady = stamps > 0 && progress === 0;

  return (
    <div className="bg-stone-900 text-white p-6 rounded-bakery shadow-xl border border-amber-900/30">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-serif text-lg">Sourdough Club</h4>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
          {stamps} Total Loaves
        </span>
      </div>

      {/* The 5-Stamp Grid */}
      <div className="flex justify-between gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              i <= (progress === 0 && stamps > 0 ? 5 : progress) 
              ? 'border-amber-600 bg-amber-600/20 text-amber-500' 
              : 'border-stone-700 text-stone-700'
            }`}
          >
            <Wheat size={20} className={i <= progress ? 'animate-pulse' : ''} />
          </div>
        ))}
      </div>

      {isRewardReady ? (
        <div className="bg-amber-600 text-white text-center py-2 rounded-xl font-bold text-xs animate-bounce">
          🎉 NEXT LOAF IS ON US!
        </div>
      ) : (
        <p className="text-xs text-stone-400 text-center italic">
          {goal - progress} more loaves until your free gift.
        </p>
      )}
    </div>
  );
}