import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!order) {
    // Reached directly (e.g. refresh) without an order in history state.
    return <Navigate to="/menu" replace />;
  }

  const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div
        className={`text-center transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-veg/15">
          <span className="text-5xl animate-[fadeIn_0.4s_ease-out]">🎉</span>
        </div>
        <h1 className="font-display text-2xl text-charcoal">Order Placed!</h1>
        <p className="mt-2 text-sm text-charcoal/60">
          Order <span className="font-bold text-charcoal">{order.id}</span> is headed to the
          kitchen for Table {order.tableNumber}.
        </p>
        <p className="mt-1 text-xs text-charcoal/50">This is a demo — no real order was sent.</p>
      </div>

      <div className="mt-8 rounded-2xl bg-charcoal-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm text-mustard">Order Summary</h2>
          <span className="rounded-full bg-mustard/15 px-3 py-1 text-xs font-bold text-mustard">
            ⏱️ Est. {order.estimatedPrepTime} min
          </span>
        </div>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div className="text-cream">
                <span className="font-medium">{item.name}</span>
                <span className="text-cream-dim"> · {item.variantLabel} × {item.quantity}</span>
              </div>
              <span className="text-cream-dim">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-charcoal-3 pt-4 font-display text-base text-cream">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Link
        to="/menu"
        className="mt-8 block w-full rounded-full bg-mustard py-3.5 text-center font-display text-sm text-charcoal hover:bg-chili hover:text-cream transition-colors"
      >
        Continue Browsing
      </Link>
    </div>
  );
}
