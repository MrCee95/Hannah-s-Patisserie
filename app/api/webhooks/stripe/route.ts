import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js'; 
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the successful payment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata?.orderType === 'booking') {
      await handleClassBooking(session);
    } else {
      await handleStoreOrder(session);
    }
  }

  return NextResponse.json({ received: true });
}

async function handleClassBooking(session: any) {
  // 1. Mark seat as taken in Supabase
  // 2. Trigger "Class Confirmation" Email
  console.log("Processing Training Booking for:", session.customer_details.email);
}

async function handleStoreOrder(session: any) {
  // 1. Add order to Kitchen Queue table
  // 2. Trigger "Pickup Ready" Email/SMS logic
  console.log("Processing Pastry Order for:", session.customer_details.email);
}

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const { type, classId } = session.metadata;

      if (type === 'training') {
        // 1. Update Class Capacity
        await supabase.rpc('decrement_class_spots', { row_id: classId });
        // 2. Send Calendar Invite via Resend
        await resend.emails.send({
          from: 'Training <edu@pastryshop.com>',
          to: session.customer_details.email,
          subject: 'Your Baking Class Confirmation',
          text: `Get ready to bake! Your spot for ${session.line_items[0].description} is confirmed.`
        });
      } else {
        // 3. Create Kitchen Order
        await supabase.from('orders').insert({
          customer_email: session.customer_details.email,
          total_amount: session.amount_total / 100,
          items: session.line_items,
          status: 'paid'
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function handleStoreOrder(session: any) {
  // 1. Get data from session
  const customerName = session.customer_details.name;
  const email = session.customer_details.email;
  
  // 2. Send the email
  await resend.emails.send({
    from: 'Shop <orders@hannahsPatisserie.com>',
    to: email,
    subject: 'Your Pastry Order is Confirmed!',
    react: OrderConfirmationEmail({ customerName, items: session.line_items, orderId: session.id }),
  });
}

