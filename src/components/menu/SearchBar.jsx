export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search momos, ramen, wings..."
        className="w-full rounded-full border-2 border-charcoal/10 bg-white py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-mustard focus:outline-none transition-colors"
      />
    </div>
  );
}
