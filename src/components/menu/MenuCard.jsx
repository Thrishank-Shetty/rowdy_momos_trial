import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export default function MenuCard({ item, onOpenDetails }) {
  const { addItem } = useCart();
  const lowestVariant = item.variants[0];

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(item, lowestVariant, 1);
  };

  return (
    <div
      onClick={() => onOpenDetails(item)}
      style={{ boxShadow: 'var(--shadow-card)' }}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-charcoal-2 ring-1 ring-cream/5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:ring-mustard/25 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative p-4 pb-0">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={item.veg ? 'veg' : 'nonveg'}>{item.veg ? '● Veg' : '● Non-Veg'}</Badge>
          {item.bestseller && <Badge variant="bestseller">🔥 Bestseller</Badge>}
          {!item.available && <Badge variant="unavailable">Sold Out</Badge>}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-sm text-cream leading-snug">{item.name}</h3>
        <p className="mt-2 text-xs text-cream-dim/85 leading-relaxed line-clamp-2">{item.description}</p>

        <div className="mt-3.5 flex items-center justify-between">
          <span className="font-display text-mustard text-sm">
            {formatCurrency(lowestVariant.price)}
            {item.variants.length > 1 && <span className="text-[10px] text-cream-dim"> +</span>}
          </span>
          <button
            onClick={handleQuickAdd}
            disabled={!item.available}
            className="rounded-full bg-mustard px-3.5 py-1.5 text-xs font-bold text-charcoal transition-all duration-150 hover:bg-chili hover:text-cream active:scale-90 disabled:opacity-40 disabled:hover:bg-mustard disabled:hover:text-charcoal disabled:active:scale-100"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
