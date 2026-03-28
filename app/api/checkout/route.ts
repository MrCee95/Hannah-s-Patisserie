import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // Importing the utility we just created

export async function POST(req: Request) {
  try {
    const { items, type, classId, pickupDate, inscription, userId } = await req.json();

    // 1. Map your local cart items to Stripe's format
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'ghs',
        product_data: {
          name: item.name,
          description: item.category === 'cake' ? `Pickup: ${pickupDate}` : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses pesewas for Ghana, so we convert cedis to pesewas
      },
      quantity: item.quantity || 1,
    }));

    // 2. Create the Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      // Metadata is "Invisible Data" passed to the webhook later
      metadata: { 
        type, 
        classId: classId || '', 
        pickupDate: pickupDate || '', 
        inscription: inscription || '' 
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    // 3. Return the URL to the frontend
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
