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
            <main className="section-light p-8 text-center min-h-screen">
                <h1 className="text-4xl font-serif text-brandGold mb-4">Thank You!</h1>
                <p className="text-platinumGray">Your order has been placed successfully.</p>
                <button
                    className="mt-4 bg-burgundy hover:bg-brandGold text-brandIvory px-6 py-3 rounded-full transition duration-300"
                    onClick={() => router.push("/profile")}
                >
                    View My Orders
                </button>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="section-light p-8 text-center min-h-screen">
                <h1 className="text-4xl font-serif text-brandGold mb-4">Checkout</h1>
                <p className="text-platinumGray">Your cart is empty.</p>
                <button
                    className="mt-4 bg-brandGold text-richEbony px-6 py-3 rounded-full hover:bg-burgundy hover:text-brandIvory transition duration-300"
                    onClick={() => router.push("/")}
                >
                    Continue Shopping
                </button>
            </main>
        );
    }

    return (
        <main className="section-light p-8 max-w-2xl mx-auto min-h-screen">
            <h1 className="text-4xl font-serif text-brandGold mb-6">Checkout</h1>
            <div className="mb-4">
                <p className="text-2xl font-bold text-brandGold">
                    Total: €{total.toFixed(2)}
                </p>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
                <label className="block text-lg font-semibold text-richEbony mb-2">
                    Select Payment Method
                </label>
                <div className="flex gap-4">
                    <button
                        className={`px-6 py-3 rounded-full transition duration-300 ${
                            paymentMethod === "CMI"
                                ? "bg-brandGold text-richEbony"
                                : "bg-burgundy/20 text-richEbony hover:bg-burgundy/40"
                        }`}
                        onClick={() => setPaymentMethod("CMI")}
                    >
                        Pay with Credit Card (CMI)
                    </button>
                    <button
                        className={`px-6 py-3 rounded-full transition duration-300 ${
                            paymentMethod === "COD"
                                ? "bg-brandGold text-richEbony"
                                : "bg-burgundy/20 text-richEbony hover:bg-burgundy/40"
                        }`}
                        onClick={() => setPaymentMethod("COD")}
                    >
                        Pay on Delivery
                    </button>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-4 space-y-2">
                <label className="block text-lg font-semibold text-richEbony">
                    Address
                </label>
                <input
                    className="w-full p-3 text-richEbony rounded-lg border border-brandGold focus:ring focus:ring-brandGold transition"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                />
            </div>
            <div className="mb-4 space-y-2 flex gap-4">
                <div className="flex-1">
                    <label className="block text-lg font-semibold text-richEbony">
                        City
                    </label>
                    <input
                        className="w-full p-3 text-richEbony rounded-lg border border-brandGold focus:ring focus:ring-brandGold transition"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-lg font-semibold text-richEbony">
                        Postal Code
                    </label>
                    <input
                        className="w-full p-3 text-richEbony rounded-lg border border-brandGold focus:ring focus:ring-brandGold transition"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Enter postal code"
                    />
                </div>
            </div>
            <div className="mb-6 space-y-2">
                <label className="block text-lg font-semibold text-richEbony">
                    Country
                </label>
                <input
                    className="w-full p-3 text-richEbony rounded-lg border border-brandGold focus:ring focus:ring-brandGold transition"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                />
            </div>

            {error && <p className="text-burgundy text-lg mb-4">{error}</p>}

            <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-burgundy hover:bg-brandGold text-brandIvory px-6 py-3 rounded-full font-medium transition w-full duration-300"
            >
                {loading ? "Processing..." : "Confirm & Pay"}
            </button>
        </main>
    );
}
