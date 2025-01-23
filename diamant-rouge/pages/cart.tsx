// pages/cart.tsx
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <main className="p-8">
                <h1 className="text-3xl font-serif mb-4">Your Cart</h1>
                <p>Your cart is empty.</p>
                <Link href="/">Go back to Home</Link>
            </main>
        );
    }

    return (
        <main className="p-8">
            <h1 className="text-3xl font-serif mb-4">Your Cart</h1>

            <ul className="space-y-4">
                {cart.map((item) => (
                    <li key={item.productId} className="bg-ebony/50 p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p>SKU: {item.sku}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                            <div>
                                <p>€{(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="text-crimson ml-2"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="text-right mt-6">
                <p className="text-xl mb-2">Total: €{total.toFixed(2)}</p>
                <button
                    onClick={clearCart}
                    className="bg-crimson hover:bg-gold text-ivory py-2 px-4 mr-4"
                >
                    Clear Cart
                </button>
                <Link href="/checkout" className="bg-crimson hover:bg-gold text-ivory py-2 px-4">
                    Proceed to Checkout
                </Link>
            </div>
        </main>
    );
}
