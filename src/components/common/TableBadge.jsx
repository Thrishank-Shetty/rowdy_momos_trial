export default function TableBadge({ tableNumber }) {
  return (
    <div className="paint-stroke inline-flex items-center gap-2 bg-mustard px-5 py-2">
      <span className="text-charcoal font-display text-sm">Table {tableNumber}</span>
    </div>
  );
}
