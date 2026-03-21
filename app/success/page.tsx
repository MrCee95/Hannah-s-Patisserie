import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/'); // Send them home if there's no ID
  }

  // 1. Retrieve the session from Stripe to verify payment status
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Pending</h1>
          <p className="text-stone-500">We haven't received confirmation yet. Please check your email.</p>
        </div>
      </div>
    );
  }

  // 2. Extract the Metadata we passed in the Checkout Route
  const { type, inscription, pickupDate } = session.metadata || {};

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-sm border border-stone-100 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✓
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">It’s Official!</h1>
        <p className="text-lg text-stone-600 mb-8">
          Thank you, {session.customer_details?.name}. We’ve received your order and sent a receipt to {session.customer_details?.email}.
        </p>

        <div className="bg-stone-50 rounded-2xl p-6 mb-8 text-left space-y-4">
          <h3 className="font-bold text-stone-800 uppercase text-xs tracking-widest">Order Summary</h3>
          
          {type === 'cake' ? (
            <div>
              <p className="font-medium">🎂 Custom Cake Order</p>
              <p className="text-sm text-stone-500">Pickup Date: <span className="text-stone-900 font-semibold">{pickupDate}</span></p>
              {inscription && (
                <p className="text-sm text-stone-500 italic mt-1">"{inscription}"</p>
              )}
            </div>
          ) : (
            <p className="font-medium">🥐 Fresh Cake, Pastry & Ice Cream Pickup</p>
          )}
          
          <p className="text-xs text-stone-400">Please show this screen or your email at the counter.</p>
        </div>

        <Link 
          href="/"
          className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}