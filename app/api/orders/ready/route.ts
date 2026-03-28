import { Resend } from 'resend';
import { getOrderReadyEmailHtml } from '@/lib/email-templates';
import { getAdminClient } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { orderId } = await req.json();
  const supabase = getAdminClient();

  // 1. Fetch order details
  const { data: order, error } = await supabase
    .from('orders')
    .select('customer_name, customer_email')
    .eq('id', orderId)
    .single();

  if (error || !order) return new Response('Order not found', { status: 404 });

  // 2. Update status to 'Ready'
  await supabase.from('orders').update({ status: 'Ready' }).eq('id', orderId);

  // 3. Send the "Ready for Pickup" Email
  await resend.emails.send({
    from: 'Hannah\'s Patisserie <bakery@bakerydomain.com>',
    to: order.customer_email,
    subject: '🥐 Your Hannah\'s Patisserie order is ready!',
    html: getOrderReadyEmailHtml(order.customer_name, orderId),
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}