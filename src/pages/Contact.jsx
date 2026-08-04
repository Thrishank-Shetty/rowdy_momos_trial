import { useState } from 'react';
import { useMenuData } from '../hooks/useMenuData';

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Contact() {
  const { restaurant } = useMenuData();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-2xl sm:text-3xl text-charcoal mb-8">Get in Touch</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-chili py-3 text-sm font-bold text-cream hover:bg-chili-dark transition-colors"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-sm text-veg font-medium">
              Thanks! This is a demo form — no message was actually sent.
            </p>
          )}
        </form>

        <div className="space-y-6">
          <div className="rounded-2xl bg-charcoal-2 p-6 text-cream">
            <h3 className="font-display text-sm text-mustard mb-3">Reach Us Directly</h3>
            <p className="text-sm text-cream-dim">📞 {restaurant?.phone}</p>
            <p className="text-sm text-cream-dim mt-2">✉️ {restaurant?.email}</p>
            <p className="text-sm text-cream-dim mt-2">📍 {restaurant?.address}</p>

            <div className="mt-4 flex gap-2">
              <a
                href={restaurant?.phone ? `tel:${restaurant.phone}` : undefined}
                className="flex-1 rounded-full bg-mustard py-2.5 text-center text-xs font-bold text-charcoal hover:bg-mustard-dark transition-colors"
              >
                📞 Call Us
              </a>
              <a
                href={restaurant?.social?.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-veg py-2.5 text-center text-xs font-bold text-cream hover:opacity-90 transition-opacity"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {restaurant?.hours && (
            <div className="rounded-2xl bg-white border-2 border-charcoal/10 p-6">
              <h3 className="font-display text-sm text-charcoal mb-3">Business Hours</h3>
              <ul className="text-sm text-charcoal/70 space-y-1.5">
                {DAY_ORDER.map((day) => (
                  <li key={day} className="flex justify-between">
                    <span className="font-medium">{day}</span>
                    <span className="text-charcoal/50">{restaurant.hours[day]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl overflow-hidden bg-charcoal-2 h-48 flex items-center justify-center">
            <div className="text-center text-cream-dim">
              <p className="text-3xl mb-1">📍</p>
              <p className="text-xs">Google Maps embed placeholder</p>
            </div>
          </div>

          <div className="rounded-2xl bg-mustard/10 border-2 border-mustard/30 p-6">
            <p className="text-sm text-charcoal/70 mb-3">
              Prefer to order in person? Just walk in — we're a short skywalk away from Vidyavihar
              station.
            </p>
            <div className="flex gap-3">
              <a
                href={restaurant?.social?.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-mustard transition-colors"
              >
                📷
              </a>
              <a
                href={restaurant?.social?.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-mustard transition-colors"
              >
                📘
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
