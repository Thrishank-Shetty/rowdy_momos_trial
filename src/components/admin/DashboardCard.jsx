export default function DashboardCard({ label, value, icon, accent = 'mustard' }) {
  const ACCENTS = {
    mustard: 'bg-mustard/15 text-mustard-dark',
    chili: 'bg-chili/15 text-chili',
    veg: 'bg-veg/15 text-veg',
    charcoal: 'bg-charcoal-2 text-cream',
  };

  return (
    <div className="rounded-2xl bg-charcoal-2 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-cream-dim">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${ACCENTS[accent]}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl text-cream">{value}</p>
    </div>
  );
}
