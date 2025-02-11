import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [checkoutComplete, setCheckoutComplete] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Payment method state
    const [paymentMethod, setPaymentMethod] = useState<"CMI" | "COD" | "">("");

    // Shipping info states
    const [shippingAddress, setShippingAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    async function handleCheckout() {
        setLoading(true);
        setError("");

        if (!paymentMethod) {
            setError("⚠ Please select a payment method.");
            setLoading(false);
            return;
        }

        if (!shippingAddress || !city || !postalCode || !country) {
            setError("⚠ Please fill out all shipping details.");
            setLoading(false);
            return;
        }

        try {
            if (paymentMethod === "CMI") {
                const res = await fetch("/api/payment/cmi", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: Date.now().toString(),
                        amount: total,
                        customerEmail: "customer@example.com", // Replace with actual email
                    }),
                });

                const data = await res.json();
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    setError("⚠ Payment error. Please try again.");
                }
            } else {
                const res = await fetch("/api/order/place-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cart,
                        paymentMethod,
                        shippingAddress,
                        city,
                        postalCode,
                        country,
                    }),
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || "⚠ Failed to place order");
                    return;
                }

                clearCart();
                setCheckoutComplete(true);
            }
        } catch (err) {
            console.error(err);
            setError("⚠ An error occurred placing your order.");
        } finally {
            setLoading(false);
        }
    }

    if (checkoutComplete) {
        return (
            <main className="p-8 text-center text-ivory">
                <h1 className="text-4xl font-serif text-gold mb-4">Thank You!</h1>
                <p>Your order has been placed successfully.</p>
                <button
                    className="mt-4 bg-crimson text-ivory px-6 py-3 rounded-full hover:bg-gold transition"
                    onClick={() => router.push("/profile")}
                >
                    View My Orders
                </button>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="p-8 text-center text-ivory">
                <h1 className="text-4xl font-serif text-gold mb-4">Checkout</h1>
                <p>Your cart is empty.</p>
                <button
                    className="mt-4 bg-gold text-ebony px-6 py-3 rounded-full hover:bg-crimson transition"
                    onClick={() => router.push("/")}
                >
                    Continue Shopping
                </button>
            </main>
        );
    }

    return (
        <main className="p-8 max-w-2xl mx-auto text-ivory">
            <h1 className="text-4xl font-serif text-gold mb-6">Checkout</h1>
            <div className="mb-4">
                <p className="text-xl font-bold text-gold">Total: €{total.toFixed(2)}</p>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
                <label className="block text-lg mb-2">Select Payment Method</label>
                <div className="flex gap-4">
                    <button
                        className={`px-6 py-3 rounded-full transition ${
                            paymentMethod === "CMI" ? "bg-gold text-ebony" : "bg-ebony text-ivory"
                        }`}
                        onClick={() => setPaymentMethod("CMI")}
                    >
                        Pay with Credit Card (CMI)
                    </button>
                    <button
                        className={`px-6 py-3 rounded-full transition ${
                            paymentMethod === "COD" ? "bg-gold text-ebony" : "bg-ebony text-ivory"
                        }`}
                        onClick={() => setPaymentMethod("COD")}
                    >
                        Pay on Delivery
                    </button>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-4 space-y-2">
                <label className="block text-lg">Address</label>
                <input
                    className="w-full p-3 text-ebony rounded-lg border border-gold focus:ring focus:ring-gold"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                />
            </div>
            <div className="mb-4 space-y-2 flex gap-4">
                <div className="flex-1">
                    <label className="block text-lg">City</label>
                    <input
                        className="w-full p-3 text-ebony rounded-lg border border-gold focus:ring focus:ring-gold"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-lg">Postal Code</label>
                    <input
                        className="w-full p-3 text-ebony rounded-lg border border-gold focus:ring focus:ring-gold"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Enter postal code"
                    />
                </div>
            </div>
            <div className="mb-6 space-y-2">
                <label className="block text-lg">Country</label>
                <input
                    className="w-full p-3 text-ebony rounded-lg border border-gold focus:ring focus:ring-gold"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                />
            </div>

            {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

            <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-crimson hover:bg-gold text-ivory px-6 py-3 rounded-full font-medium transition w-full"
            >
                {loading ? "Processing..." : "Confirm & Pay"}
            </button>
        </main>
    );
}
