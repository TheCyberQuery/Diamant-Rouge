import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
    productId: number;
    variationId?: number; // track which variation is chosen
    sku: string;
    name: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number, variationId?: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    function addToCart(item: CartItem) {
        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (p) => p.productId === item.productId && p.variationId === item.variationId
            );
            if (existingIndex > -1) {
                // update existing item quantity
                const updated = [...prev];
                updated[existingIndex].quantity += item.quantity;
                return updated;
            } else {
                return [...prev, item];
            }
        });
    }

    function removeFromCart(productId: number, variationId?: number) {
        setCart((prev) =>
            prev.filter(
                (p) => p.productId !== productId || p.variationId !== variationId
            )
        );
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
