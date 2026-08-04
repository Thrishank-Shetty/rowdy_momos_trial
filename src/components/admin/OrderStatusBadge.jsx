const STATUS_STYLES = {
  pending: 'bg-mustard/15 text-mustard-dark border-mustard/40',
  preparing: 'bg-chili/15 text-chili border-chili/40',
  ready: 'bg-veg/15 text-veg border-veg/40',
  served: 'bg-charcoal-3 text-cream border-charcoal-3',
  completed: 'bg-veg/25 text-veg border-veg/50',
  cancelled: 'bg-charcoal-3 text-cream-dim border-charcoal-3 line-through',
};

const STATUS_LABELS = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
