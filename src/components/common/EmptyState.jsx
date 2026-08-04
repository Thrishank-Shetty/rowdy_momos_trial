export default function EmptyState({ icon = '🥟', title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-4xl mb-3">{icon}</p>
      <p className="font-display text-sm text-charcoal">{title}</p>
      {subtitle && <p className="mt-1.5 max-w-xs text-sm text-charcoal/60">{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
