import { useState } from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export default function FoodModal({ item, isOpen, onClose }) {
  const { addItem } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const variant = item.variants[variantIdx];

  const handleClose = () => {
    setVariantIdx(0);
    setQuantity(1);
    onClose();
  };

  const handleAdd = () => {
    addItem(item, variant, quantity);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-xl">
      <div className="p-6 pt-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant={item.veg ? 'veg' : 'nonveg'}>{item.veg ? '● Veg' : '● Non-Veg'}</Badge>
          {item.bestseller && <Badge variant="bestseller">🔥 Bestseller</Badge>}
          {!item.available && <Badge variant="unavailable">Sold Out</Badge>}
        </div>

        <h2 className="font-display text-xl text-charcoal">{item.name}</h2>
        <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{item.fullDescription}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-charcoal/60">
          <span className="inline-flex items-center gap-1.5">
            ⏱️ {item.prepTimeMins ? `${item.prepTimeMins} min prep` : 'Prep time unavailable'}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 ${item.available ? 'text-veg' : 'text-chili'}`}
          >
            {item.available ? '● In Stock' : '● Currently Unavailable'}
          </span>
        </div>

        <div className="mt-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-2">
            Ingredients
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {item.ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-full bg-charcoal/5 px-2.5 py-1 text-xs text-charcoal/70"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {item.variants.length > 1 && (
          <div className="mt-4">
            <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-2">
              Choose Option
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.variants.map((v, idx) => (
                <button
                  key={v.label}
                  onClick={() => setVariantIdx(idx)}
                  className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${
                    idx === variantIdx
                      ? 'border-mustard bg-mustard text-charcoal'
                      : 'border-charcoal/10 text-charcoal/60 hover:border-mustard/50'
                  }`}
                >
                  {v.label} · {formatCurrency(v.price)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 rounded-full bg-charcoal/5 px-2 py-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-charcoal font-bold hover:bg-mustard transition-colors"
            >
              −
            </button>
            <span className="w-6 text-center font-bold text-charcoal">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-charcoal font-bold hover:bg-mustard transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={!item.available}
            className="flex-1 rounded-full bg-chili py-3 text-sm font-bold text-cream hover:bg-chili-dark transition-colors disabled:opacity-40"
          >
            Add {formatCurrency(variant.price * quantity)} to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
}
