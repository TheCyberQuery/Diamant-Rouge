// pages/checkout-success.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const { session_id } = router.query;
    const [loading, setLoading] = useState(true);
    const { clearCart } = useCart();

    useEffect(() => {
        if (session_id) {
            // Optionally verify session with Stripe to confirm payment
            // Then create an "Order" record in your DB
            console.log("Payment success, session ID:", session_id);
            clearCart();
            setLoading(false);
        }
    }, [session_id, clearCart]);

    if (loading) {
        return (
            <main className="section-light p-8 text-center min-h-screen">
                <h1 className="text-3xl font-serif text-brandGold mb-4">
                    Verifying Payment...
                </h1>
            </main>
        );
    }

    return (
        <main className="section-light p-8 text-center min-h-screen">
            <h1 className="text-4xl font-serif text-brandGold mb-4">Thank You!</h1>
            <p className="text-platinumGray">
                Your order has been placed successfully.
            </p>
        </main>
    );
}
