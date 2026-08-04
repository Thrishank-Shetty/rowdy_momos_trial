import { useEffect, useState } from 'react';
import {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from '../../services/menuService';
import { getCategories } from '../../services/categoryService';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/format';
import MenuItemFormModal from '../../components/admin/MenuItemFormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Badge from '../../components/common/Badge';

export default function MenuManagement() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([getMenuItems(), getCategories()]).then(([m, c]) => {
      setItems(m);
      setCategories(c);
      setLoading(false);
    });
  }, []);

  const categoryLabel = (id) => categories.find((c) => c.id === id)?.label || id;

  const openAdd = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSave = async (data) => {
    if (editingItem) {
      const updated = await updateMenuItem(editingItem.id, data);
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? updated : i)));
      showToast('Menu item updated');
    } else {
      const created = await addMenuItem(data);
      setItems((prev) => [created, ...prev]);
      showToast('Menu item added');
    }
    setFormOpen(false);
  };

  const handleToggleAvailability = async (item) => {
    const updated = await toggleAvailability(item.id);
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
    showToast(`${item.name} marked ${updated.available ? 'available' : 'unavailable'}`);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMenuItem(deleteTarget.id);
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    showToast(`${deleteTarget.name} deleted`, { type: 'info' });
    setDeleteTarget(null);
  };

  const filteredItems = items.filter((i) => i.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-charcoal mb-1">Menu Items</h1>
          <p className="text-sm text-charcoal/60">Add, edit, price, and manage availability.</p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-full bg-mustard px-5 py-2.5 text-sm font-bold text-charcoal hover:bg-mustard-dark transition-colors"
        >
          + Add Menu Item
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search menu items…"
        className="mb-6 w-full max-w-sm rounded-full border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
      />

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-charcoal-2" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState icon="🥟" title="No Menu Items" subtitle="Nothing matches your search, or the menu is empty." />
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white">
          <div className="divide-y divide-charcoal/10">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center gap-4 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-charcoal">{item.name}</p>
                    <Badge variant={item.veg ? 'veg' : 'nonveg'}>{item.veg ? 'Veg' : 'Non-Veg'}</Badge>
                    {item.bestseller && <Badge variant="bestseller">🔥</Badge>}
                    {!item.available && <Badge variant="unavailable">Unavailable</Badge>}
                  </div>
                  <p className="text-xs text-charcoal/50">
                    {categoryLabel(item.category)} · {formatCurrency(item.variants[0].price)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => handleToggleAvailability(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                      item.available
                        ? 'bg-veg/15 text-veg hover:bg-veg/25'
                        : 'bg-chili/15 text-chili hover:bg-chili/25'
                    }`}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="rounded-full border-2 border-charcoal/10 px-3 py-1.5 text-xs font-bold text-charcoal hover:border-mustard transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="rounded-full border-2 border-chili/30 px-3 py-1.5 text-xs font-bold text-chili hover:bg-chili/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <MenuItemFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        categories={categories}
        item={editingItem}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this item?"
        message={deleteTarget ? `"${deleteTarget.name}" will be permanently removed from the menu.` : ''}
        confirmLabel="Delete"
        danger
      />
    </div>
  );
}
