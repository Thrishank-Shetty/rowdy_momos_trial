import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../hooks/useMenuData';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/format';
import { createOrder } from '../services/orderService';

export default function Checkout() {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const { table } = useMenuData();
  const [instructions, setInstructions] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const order = await createOrder({
        tableNumber: table?.tableNumber,
        items,
        instructions,
      });
      clearCart();
      navigate('/order-success', { state: { order } });
    } catch {
      showToast('Could not place order. Please try again.', { type: 'error' });
      setIsPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="text-4xl mb-3">🥟</p>
        <h1 className="font-display text-xl text-charcoal mb-2">Your cart is empty</h1>
        <p className="text-sm text-charcoal/60 mb-6">Add something rowdy before checking out.</p>
        <button
          onClick={() => navigate('/menu')}
          className="rounded-full bg-mustard px-6 py-3 font-display text-sm text-charcoal hover:bg-chili hover:text-cream transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl text-charcoal mb-2">Checkout</h1>
      {table && <p className="text-sm text-charcoal/60 mb-8">Ordering for Table {table.tableNumber}</p>}

      <div className="rounded-2xl bg-charcoal-2 p-6 mb-6">
        <h2 className="font-display text-sm text-mustard mb-4">Order Summary</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.lineId} className="flex items-center justify-between text-sm">
              <div className="text-cream">
                <span className="font-medium">{item.name}</span>
                <span className="text-cream-dim"> · {item.variantLabel} × {item.quantity}</span>
              </div>
              <span className="text-cream-dim">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t border-charcoal-3 pt-4">
          <div className="flex justify-between text-sm text-cream-dim">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-cream-dim">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-display text-base text-cream pt-1">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-2">
          Special Instructions
        </label>
        <textarea
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Less spicy, no onions, extra chutney..."
          className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-3 text-sm focus:border-mustard focus:outline-none resize-none"
        />
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isPlacing}
        className="w-full rounded-full bg-chili py-4 font-display text-sm text-cream hover:bg-chili-dark transition-colors disabled:opacity-60"
      >
        {isPlacing ? 'Placing Order…' : `Place Order · ${formatCurrency(total)}`}
      </button>
    </div>
  );
}
