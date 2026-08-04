import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

const emptyForm = {
  name: '',
  category: '',
  description: '',
  price: '',
  image: '',
  veg: true,
  bestseller: false,
  available: true,
  prepTimeMins: 15,
};

export default function MenuItemFormModal({ isOpen, onClose, onSave, categories, item }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        category: item.category,
        description: item.description || '',
        price: item.variants?.[0]?.price ?? '',
        image: item.image || '',
        veg: item.veg,
        bestseller: item.bestseller,
        available: item.available,
        prepTimeMins: item.prepTimeMins ?? 15,
      });
    } else {
      setForm({ ...emptyForm, category: categories[0]?.id || '' });
    }
  }, [item, isOpen, categories]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      fullDescription: item?.fullDescription || form.description.trim(),
      ingredients: item?.ingredients || [],
      image: form.image.trim() || emptyFormImage(),
      veg: form.veg,
      bestseller: form.bestseller,
      available: form.available,
      prepTimeMins: Number(form.prepTimeMins) || 15,
      variants: [{ label: 'Regular', price: Number(form.price) || 0 }],
    });
  };

  function emptyFormImage() {
    return 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80';
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="font-display text-lg text-charcoal mb-5">
          {item ? 'Edit Menu Item' : 'Add Menu Item'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
                Category
              </label>
              <select
                required
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
                Price (₹)
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              className="w-full rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-1.5">
              Prep Time (mins)
            </label>
            <input
              type="number"
              min="1"
              value={form.prepTimeMins}
              onChange={(e) => update('prepTimeMins', e.target.value)}
              className="w-32 rounded-xl border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={form.veg}
                onChange={(e) => update('veg', e.target.checked)}
                className="h-4 w-4 accent-mustard"
              />
              Veg
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={form.bestseller}
                onChange={(e) => update('bestseller', e.target.checked)}
                className="h-4 w-4 accent-mustard"
              />
              Bestseller
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => update('available', e.target.checked)}
                className="h-4 w-4 accent-mustard"
              />
              Available
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-charcoal/10 py-2.5 text-sm font-bold text-charcoal hover:bg-charcoal/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full bg-mustard py-2.5 text-sm font-bold text-charcoal hover:bg-mustard-dark transition-colors"
          >
            {item ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
