import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import ClassCard from '@/components/ClassCard';

export default async function HomePage() {
  // Fetch both data sets in parallel for speed
  const [productsResult, classesResult] = await Promise.all([
    supabase.from('products').select('*').eq('in_stock', true),
    supabase.from('classes').select('*').gt('spots_left', 0)
  ]);

  const products = productsResult.data || [];
  const trainingClasses = classesResult.data || [];

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center bg-stone-900 text-white">
        <h1 className="text-5xl font-serif mb-4">Crust & Cream</h1>
        <p className="text-stone-400">Artisan Pastries | Small Batch Ice Cream | Masterclasses</p>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* 1. RETAIL SECTION */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Today's Batch</h2>
            <span className="text-amber-700 font-mono text-sm">UPDATED 5:00 AM</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* 2. TRAINING SECTION */}
        <section className="bg-white rounded-3xl p-10 border border-stone-200">
          <h2 className="text-3xl font-bold mb-8">Learn the Craft</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {trainingClasses.map((workshop: any) => (
              <ClassCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
