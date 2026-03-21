// app/page.tsx
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import ClassCard from '@/components/ClassCard';

export default async function HomePage() {
  // Fetch both data sets in parallel for speed
  const [products, trainingClasses] = await Promise.all([
    supabase.from('products').select('*').eq('in_stock', true),
    supabase.from('classes').select('*').gt('spots_left', 0)
  ]);

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
  {products.map((p) => (
    <ProductCard key={p.id} product={p} />
  ))}
</div>
        </section>

        {/* 2. TRAINING SECTION */}
        <section className="bg-white rounded-3xl p-10 border border-stone-200">
          <h2 className="text-3xl font-bold mb-8">Learn the Craft</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {trainingClasses.data?.map(workshop => (
              <ClassCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';

export default async function HomePage() {
  // 1. Fetch the latest pastries and ice cream from Supabase
  // We sort by 'created_at' so your newest creations appear first!
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not fetch products:', error.message);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* 2. The High-Impact Header */}
      <Hero />

      {/* 3. The Live Bakery Display */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="text-amber-700 font-bold uppercase tracking-widest text-[10px]">Fresh from the Oven</span>
            <h2 className="text-4xl font-serif mt-2">Saturday’s Selection</h2>
          </div>
          <p className="text-stone-400 text-sm hidden md:block">Handcrafted in Kasoa • Updated 7:18 AM</p>
        </header>

        {/* The Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State: If you haven't added products to Supabase yet */}
        {(!products || products.length === 0) && (
          <div className="text-center py-20 bg-white rounded-bakery border-2 border-dashed border-stone-200">
            <p className="text-stone-400 font-serif italic">Our digital shelves are being stocked. Check back in a moment!</p>
          </div>
        )}
      </section>
    </main>
  );
}

// ... (imports remain the same)
import ProductGrid from '@/components/ProductGrid';

export default async function HomePage() {
  const { data: products } = await supabase.from('products').select('*');

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <Hero />
      <section className="max-w-7xl mx-auto px-6 mt-12">
        {/* Pass the data from the server to the client grid */}
        <ProductGrid initialProducts={products || []} />
      </section>
    </main>
  );
}