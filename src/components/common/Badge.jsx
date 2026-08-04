const VARIANT_STYLES = {
  veg: 'bg-veg/15 text-veg border border-veg/40',
  nonveg: 'bg-chili/15 text-chili border border-chili/40',
  bestseller: 'bg-mustard text-charcoal border border-mustard-dark',
  unavailable: 'bg-charcoal-2 text-cream-dim border border-charcoal-3',
};

export default function Badge({ variant = 'veg', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
