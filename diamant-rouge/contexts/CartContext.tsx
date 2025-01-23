// contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
    productId: number;
    sku: string;
    name: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    function addToCart(item: CartItem) {
        setCart((prev) => {
            const existing = prev.find((p) => p.productId === item.productId);
            if (existing) {
                return prev.map((p) =>
                    p.productId === item.productId
                        ? { ...p, quantity: p.quantity + item.quantity }
                        : p
                );
            } else {
                return [...prev, item];
            }
        });
    }

    function removeFromCart(productId: number) {
        setCart((prev) => prev.filter((p) => p.productId !== productId));
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
