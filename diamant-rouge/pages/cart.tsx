import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <main className="p-8 text-center text-ivory">
                <h1 className="text-4xl font-serif text-gold mb-4">Your Cart</h1>
                <p className="text-platinumGray">Your cart is currently empty.</p>
                <Link href="/" className="text-gold hover:underline">
                    Continue Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="p-8 max-w-3xl mx-auto text-ivory">
            <h1 className="text-4xl font-serif text-gold mb-6">Your Cart</h1>

            <ul className="space-y-6">
                {cart.map((item) => (
                    <li key={item.productId} className="bg-ebony/50 p-4 rounded-lg flex items-center gap-4 shadow-lg">
                        <Image
                            src={item.image || "/images/placeholder.jpg"}
                            width={100}
                            height={100}
                            alt={item.name}
                            className="rounded-lg object-cover"
                            onError={(e) => e.currentTarget.src = "/images/placeholder.jpg"} // ✅ Handle image errors
                        />
                        <div className="flex-1">
                            <p className="text-xl font-semibold">{item.name}</p>
                            <p className="text-sm text-platinumGray">SKU: {item.sku}</p>
                            <p className="text-sm text-platinumGray">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-lg font-bold text-gold">€{(item.price * item.quantity).toFixed(2)}</p>
                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="text-crimson hover:text-gold transition mt-2"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="text-right mt-8">
                <p className="text-2xl font-bold text-gold mb-4">Total: €{total.toFixed(2)}</p>
                <button onClick={clearCart} className="bg-crimson hover:bg-gold text-ivory px-6 py-3 rounded-full mr-4">
                    Clear Cart
                </button>
                <Link href="/checkout">
                    <button className="bg-gold hover:bg-crimson text-ebony px-6 py-3 rounded-full transition">
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </main>
    );
}
