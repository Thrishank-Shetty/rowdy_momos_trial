const OPTIONS = [
  { value: 'default', label: 'Sort: Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha', label: 'Alphabetical: A–Z' },
];

export default function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort menu items"
      className="rounded-full border-2 border-charcoal/10 bg-white px-4 py-2 text-xs font-bold text-charcoal focus:border-mustard focus:outline-none"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
