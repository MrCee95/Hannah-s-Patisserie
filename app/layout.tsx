import { CartProvider } from '@/context/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar /> {/* Your navbar can now show the "Cart Count" */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}