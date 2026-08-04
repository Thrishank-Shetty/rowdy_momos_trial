import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { calcSubtotal, calcTax, calcTotal } from '../utils/format';
import { readStorage, writeStorage } from '../utils/storage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const TAX_RATE = 0.05;
const CART_STORAGE_KEY = 'rowdy_cart_items';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  // Persist on every change so a refresh (or accidental tab close) doesn't
  // lose the order someone was building.
  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, items);
  }, [items]);

  const addItem = useCallback(
    (menuItem, variant, quantity = 1) => {
      setItems((prev) => {
        const lineId = `${menuItem.id}::${variant.label}`;
        const existing = prev.find((i) => i.lineId === lineId);
        if (existing) {
          return prev.map((i) =>
            i.lineId === lineId ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [
          ...prev,
          {
            lineId,
            id: menuItem.id,
            name: menuItem.name,
            image: menuItem.image,
            veg: menuItem.veg,
            variantLabel: variant.label,
            price: variant.price,
            prepTimeMins: menuItem.prepTimeMins || 15,
            quantity,
          },
        ];
      });
      setIsCartOpen(true);
      showToast(`${menuItem.name} added to cart`);
    },
    [showToast]
  );

  const removeItem = useCallback(
    (lineId) => {
      const removed = items.find((i) => i.lineId === lineId);
      setItems((prev) => prev.filter((i) => i.lineId !== lineId));
      if (removed) showToast(`${removed.name} removed`, { type: 'info' });
    },
    [items, showToast]
  );

  const increaseQty = useCallback((lineId) => {
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decreaseQty = useCallback((lineId) => {
    setItems((prev) =>
      prev
        .map((i) => (i.lineId === lineId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const subtotal = useMemo(() => calcSubtotal(items), [items]);
  const tax = useMemo(() => calcTax(subtotal, TAX_RATE), [subtotal]);
  const total = useMemo(() => calcTotal(subtotal, tax), [subtotal, tax]);
  const itemCount = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  const value = {
    items,
    isCartOpen,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    openCart,
    closeCart,
    subtotal,
    tax,
    total,
    itemCount,
    taxRate: TAX_RATE,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
