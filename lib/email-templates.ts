export const getOrderReadyEmailHtml = (customerName: string, orderId: string) => `
  <div style="font-family: serif; color: #1c1917; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #e7e5e4; border-radius: 24px; background-color: #fffaf3; text-align: center;">
    <h1 style="color: #78350f; font-size: 28px; letter-spacing: 1px;">IT'S FRESH. IT'S READY.</h1>
    <div style="margin: 30px 0;">
      <img src="https://your-bakery.com/bakery-icon.png" width="80" alt="Hannah's Patisserie" />
    </div>
    <p style="font-size: 18px; line-height: 1.6;">
      Hi ${customerName},<br />
      Great news! Your order <strong>#${orderId.slice(-4)}</strong> is packed and waiting for you at our Osu counter.
    </p>
    <div style="background: #78350f; color: white; padding: 20px; border-radius: 12px; margin: 30px 0;">
      <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Pickup Location</p>
      <p style="margin: 5px 0 0 0; font-weight: bold;">123 Liberation Road, Osu, Accra</p>
    </div>
    <p style="font-size: 14px; color: #78716c;">Please have your order number ready when you arrive!</p>
    <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;" />
    <p style="font-size: 12px; color: #a8a29e;">Hannah's Patisserie — Handcrafted in Kasoa</p>
  </div>
`;