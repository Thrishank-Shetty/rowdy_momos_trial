const VARIANTS = {
  primary:
    'bg-mustard text-charcoal hover:bg-chili hover:text-cream focus-visible:ring-mustard/50',
  secondary:
    'bg-charcoal-2 text-cream hover:bg-charcoal-3 focus-visible:ring-cream/30',
  outline:
    'bg-transparent text-cream border-2 border-cream/30 hover:border-mustard hover:text-mustard focus-visible:ring-mustard/40',
  ghost:
    'bg-transparent text-charcoal hover:bg-charcoal/6 focus-visible:ring-charcoal/20',
  danger:
    'bg-chili text-cream hover:bg-chili-dark focus-visible:ring-chili/50',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
};

export default function Button({
  as: As = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <As
      className={`
        relative inline-flex items-center justify-center rounded-full
        font-display font-normal tracking-wide
        transition-all duration-200 ease-out
        active:scale-[0.96]
        focus-visible:outline-none focus-visible:ring-4
        disabled:opacity-45 disabled:pointer-events-none disabled:active:scale-100
        ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      disabled={As === 'button' ? isDisabled : undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className={loading ? 'invisible' : 'inline-flex items-center gap-2'}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 rounded-full border-2 border-current/30 border-t-current animate-spin" />
        </span>
      )}
    </As>
  );
}
