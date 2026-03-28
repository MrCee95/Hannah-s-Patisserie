import { CartProvider } from '@/context/CartContext';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar /> {/* Your navbar can now show the "Cart Count" */}
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}