import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeItem } = useCart();

  return (
    <div className="flex gap-3 border-b border-charcoal/10 py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-charcoal truncate">{item.name}</p>
            <p className="text-xs text-charcoal/50">{item.variantLabel}</p>
          </div>
          <button
            onClick={() => removeItem(item.lineId)}
            aria-label="Remove item"
            className="text-charcoal/40 hover:text-chili transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-charcoal/5 px-1.5 py-1">
            <button
              onClick={() => decreaseQty(item.lineId)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-charcoal hover:bg-mustard transition-colors"
            >
              −
            </button>
            <span className="w-4 text-center text-xs font-bold text-charcoal">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQty(item.lineId)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-charcoal hover:bg-mustard transition-colors"
            >
              +
            </button>
          </div>
          <span className="font-display text-xs text-mustard-dark">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
