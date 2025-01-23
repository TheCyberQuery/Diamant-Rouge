// pages/checkout.tsx
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    function handleCheckout() {
        // In a real application, integrate with a payment gateway
        // For now, we’ll mock a successful checkout
        clearCart();
        setCheckoutComplete(true);
    }

    if (checkoutComplete) {
        return (
            <main className="p-8 text-center">
                <h1 className="text-3xl font-serif mb-4">Thank You!</h1>
                <p>Your order has been placed successfully.</p>
            </main>
        );
    }

    return (
        <main className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif mb-4">Checkout</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <p className="mb-4">Total: €{total.toFixed(2)}</p>
                    <button onClick={handleCheckout} className="bg-crimson hover:bg-gold text-ivory py-2 px-4">
                        Place Order
                    </button>
                </>
            )}
        </main>
    );
}
