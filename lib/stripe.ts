import Stripe from 'stripe';

// We initialize the Stripe instance with the Secret Key from environment variables.
// The 'apiVersion' ensures we are using the version of the API our code was built for.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Or the latest stable version
  typescript: true,
});