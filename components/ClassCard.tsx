// components/ClassCard.tsx
import { Users, Clock, Star } from 'lucide-react';

export default function TrainingClassCard({ workshop }: { workshop: any }) {
  const isFull = workshop.spots_left <= 0;

  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <div className="h-48 bg-stone-100 relative">
        <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-800">
          {workshop.difficulty}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-stone-900 mb-2">{workshop.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
          <div className="flex items-center gap-1">
            <Clock size={16} /> {workshop.duration} hrs
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} /> {workshop.spots_left} seats left
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-stone-900">${workshop.price}</span>
            <span className="text-stone-400 text-sm"> / person</span>
          </div>

          <button 
            disabled={isFull}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              isFull 
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
              : 'bg-amber-800 text-white hover:bg-amber-900'
            }`}
          >
            {isFull ? 'Sold Out' : 'Book Class'}
          </button>
        </div>
      </div>
    </div>
  );
}