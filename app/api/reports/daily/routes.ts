import { Resend } from 'resend';
import { getAdminClient } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // 1. Check for a Secret Header (to prevent random people from triggering your report)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  // 2. Fetch today's orders
  const { data: orders } = await supabase
    .from('orders')
    .select('total_amount, items')
    .gte('created_at', `${today}T00:00:00Z`);

  if (!orders || orders.length === 0) {
    return new Response('No orders today', { status: 200 });
  }

  // 3. Calculate Stats
  const totalRevenue = orders.reduce((acc, curr) => acc + Number(curr.total_amount), 0);
  const totalOrders = orders.length;

  // 4. Find the Best Seller
  const itemCounts: Record<string, number> = {};
  orders.forEach(order => {
    order.items.forEach((item: any) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
    });
  });
  const bestSeller = Object.entries(itemCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  // 5. Send the Report Email
  await resend.emails.send({
    from: 'Bakery Analytics <reports@bakerydomain.com>',
    to: 'hannah@mybakery.com', // Your email
    subject: `🥐 Daily Report: ${new Date().toLocaleDateString('en-GB')}`,
    html: `
      <div style="font-family: sans-serif; color: #1c1917; padding: 40px; background: #fafaf9;">
        <h2 style="font-family: serif; font-size: 24px;">Today's Harvest Summary</h2>
        <hr style="border: 1px solid #e7e5e4;" />
        <div style="margin: 30px 0; display: grid; gap: 20px;">
          <p><strong>Total Revenue:</strong> ₵${totalRevenue.toFixed(2)}</p>
          <p><strong>Total Orders:</strong> ${totalOrders}</p>
          <p><strong>Top Performer:</strong> ${bestSeller}</p>
        </div>
        <p style="font-size: 12px; color: #a8a29e;">Report generated at 8:00 PM GMT • Kasoa, Ghana</p>
      </div>
    `,
  });

  return new Response('Report Sent', { status: 200 });
}