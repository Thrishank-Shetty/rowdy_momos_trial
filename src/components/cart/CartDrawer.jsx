import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, subtotal, tax, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-charcoal/70" onClick={closeCart} />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 p-5">
          <h2 className="font-display text-lg text-charcoal">Your Order</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/5 text-charcoal"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-16">
              <p className="text-4xl mb-3">🥟</p>
              <p className="font-display text-sm text-charcoal">Your cart is empty</p>
              <p className="text-xs text-charcoal/50 mt-1">Add some rowdy momos to get started.</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.lineId} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-charcoal/10 p-5 space-y-2">
            <div className="flex justify-between text-sm text-charcoal/70">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-charcoal/70">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-display text-base text-charcoal pt-1">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-3 w-full rounded-full bg-chili py-3 text-sm font-bold text-cream hover:bg-chili-dark transition-colors"
            >
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
