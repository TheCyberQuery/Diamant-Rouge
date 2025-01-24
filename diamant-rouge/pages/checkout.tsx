import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY  || '');

export default function CheckoutPage() {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);

    async function handleCheckout() {
        if (!cart || cart.length === 0) {
            console.error('Cart is empty or null.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems: cart }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data && data.sessionId) {
                const stripe = await stripePromise;
                if (stripe) {
                    await stripe.redirectToCheckout({ sessionId: data.sessionId });
                }
            } else {
                console.error('No sessionId returned.');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif mb-4">Checkout</h1>
            {/* ...display cart items */}
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-crimson hover:bg-gold text-ivory py-2 px-4"
            >
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </main>
    );
}