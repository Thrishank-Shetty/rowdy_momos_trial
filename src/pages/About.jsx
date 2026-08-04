import { useMenuData } from '../hooks/useMenuData';

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function About() {
  const { restaurant } = useMenuData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-charcoal mb-4">Our Story</h1>
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
            {restaurant?.name} started with one idea: momos don't have to play it safe. We took
            the classic Himalayan dumpling and threw it into a rowdy mash-up of Korean heat,
            tandoori smoke, and street-food swagger — steamed, fried, sauced, or sizzling, however
            you like it loud. Every plate is made fresh, folded by hand, and served the way we'd
            want it ourselves: hot, messy, and worth the trip to Vidya Vihar.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1">
                Address
              </h3>
              <p className="text-sm text-charcoal/80">{restaurant?.address}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1">
                Phone
              </h3>
              <p className="text-sm text-charcoal/80">{restaurant?.phone}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1">
                Email
              </h3>
              <p className="text-sm text-charcoal/80">{restaurant?.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-2">
              Opening Hours
            </h3>
            <ul className="text-sm text-charcoal/80 space-y-1">
              {restaurant &&
                DAY_ORDER.map((day) => (
                  <li key={day} className="flex justify-between max-w-xs">
                    <span className="font-medium">{day}</span>
                    <span className="text-charcoal/60">{restaurant.hours[day]}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-charcoal-2 aspect-square md:aspect-auto md:h-full min-h-[320px] flex items-center justify-center">
          <div className="text-center text-cream-dim p-6">
            <p className="text-4xl mb-2">📍</p>
            <p className="text-sm">Google Maps placeholder</p>
            <p className="text-xs mt-1 text-cream-dim/70">Vidya Vihar East, Mumbai</p>
          </div>
        </div>
      </div>
    </div>
  );
}
