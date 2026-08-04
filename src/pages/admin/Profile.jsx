import { useEffect, useState } from 'react';
import { getRestaurant, updateRestaurant } from '../../services/restaurantService';
import { useToast } from '../../context/ToastContext';

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Profile() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getRestaurant().then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, []);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const updateHours = (day, value) =>
    setForm((f) => ({ ...f, hours: { ...f.hours, [day]: value } }));
  const updateSocial = (key, value) =>
    setForm((f) => ({ ...f, social: { ...f.social, [key]: value } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const updated = await updateRestaurant(form);
    setForm(updated);
    setSaving(false);
    showToast('Restaurant profile updated');
  };

  if (loading || !form) {
    return (
      <div>
        <h1 className="font-display text-2xl text-charcoal mb-6">Restaurant Profile</h1>
        <div className="h-96 animate-pulse rounded-2xl bg-charcoal-2" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-1">Restaurant Profile</h1>
      <p className="text-sm text-charcoal/60 mb-6">
        Changes here update what customers see across the site.
      </p>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <section className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-sm text-charcoal mb-4">Basics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Restaurant Name">
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Local / Native Name">
              <input
                value={form.nameLocal || ''}
                onChange={(e) => update('nameLocal', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Logo URL" full>
              <input
                type="url"
                placeholder="https://..."
                value={form.logo || ''}
                onChange={(e) => update('logo', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Tagline" full>
              <input
                value={form.tagline || ''}
                onChange={(e) => update('tagline', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Description" full>
              <textarea
                rows={3}
                value={form.shortDescription || ''}
                onChange={(e) => update('shortDescription', e.target.value)}
                className="input resize-none"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-sm text-charcoal mb-4">Contact</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Address" full>
              <textarea
                rows={2}
                value={form.address || ''}
                onChange={(e) => update('address', e.target.value)}
                className="input resize-none"
              />
            </Field>
            <Field label="Phone">
              <input
                value={form.phone || ''}
                onChange={(e) => update('phone', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email || ''}
                onChange={(e) => update('email', e.target.value)}
                className="input"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-sm text-charcoal mb-4">Opening Hours</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DAY_ORDER.map((day) => (
              <Field key={day} label={day}>
                <input
                  value={form.hours?.[day] || ''}
                  onChange={(e) => updateHours(day, e.target.value)}
                  className="input"
                />
              </Field>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-sm text-charcoal mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Instagram">
              <input
                type="url"
                value={form.social?.instagram || ''}
                onChange={(e) => updateSocial('instagram', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Facebook">
              <input
                type="url"
                value={form.social?.facebook || ''}
                onChange={(e) => updateSocial('facebook', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="WhatsApp">
              <input
                type="url"
                value={form.social?.whatsapp || ''}
                onChange={(e) => updateSocial('whatsapp', e.target.value)}
                className="input"
              />
            </Field>
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-mustard px-8 py-3 font-display text-sm text-charcoal hover:bg-mustard-dark transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, full, children }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
