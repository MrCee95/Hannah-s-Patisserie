// components/BookingButton.tsx
export default function BookingButton({ classId, price }: { classId: string, price: number }) {
  const handleBooking = async () => {
    // 1. Call Stripe Checkout
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ classId, amount: price }),
    });
    const session = await response.json();
    window.location.href = session.url;
  };

  return (
    <button 
      onClick={handleBooking}
      className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition"
    >
      Reserve Your Spot
    </button>
  );
}