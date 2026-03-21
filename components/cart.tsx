const handleCheckout = async (cartItems) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      items: cartItems, 
      type: 'order' // or 'booking' for the training center
    }),
  });

  const { url, error } = await response.json();
  
  if (url) {
    window.location.href = url; // Redirect to Stripe
  } else {
    console.error("Payment failed to initialize:", error);
  }
};


const handleCheckout = async () => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      items: cart, 
      type: 'retail',
      pickupDate: '2026-03-25', // If it's a cake
      inscription: 'Happy Birthday!' 
    }),
  });

  const { url } = await response.json();
  if (url) window.location.href = url; // Redirects the user to Stripe's secure page
};