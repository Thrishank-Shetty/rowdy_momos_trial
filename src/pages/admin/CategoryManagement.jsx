import { useEffect, useState } from 'react';
import {
  getCategories,
  addCategory,
  renameCategory,
  deleteCategory,
} from '../../services/categoryService';
import { getMenuItems } from '../../services/menuService';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLabel, setNewLabel] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([getCategories(), getMenuItems()]).then(([c, m]) => {
      setCategories(c);
      setMenuItems(m);
      setLoading(false);
    });
  }, []);

  const itemCount = (categoryId) => menuItems.filter((i) => i.category === categoryId).length;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    const created = await addCategory(newLabel.trim());
    setCategories((prev) => [...prev, created]);
    setNewLabel('');
    showToast('Category created');
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
  };

  const saveEdit = async (id) => {
    if (!editLabel.trim()) return;
    const updated = await renameCategory(id, editLabel.trim());
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    setEditingId(null);
    showToast('Category renamed');
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteCategory(deleteTarget.id);
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    showToast(`"${deleteTarget.label}" deleted`, { type: 'info' });
    setDeleteTarget(null);
  };

  const editableCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-1">Categories</h1>
      <p className="text-sm text-charcoal/60 mb-6">Organize the menu into sections customers can browse.</p>

      <form onSubmit={handleAdd} className="mb-6 flex max-w-md gap-2">
        <input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="New category name…"
          className="flex-1 rounded-full border-2 border-charcoal/10 bg-white px-4 py-2.5 text-sm focus:border-mustard focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-mustard px-5 py-2.5 text-sm font-bold text-charcoal hover:bg-mustard-dark transition-colors"
        >
          Add
        </button>
      </form>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-charcoal-2" />
          ))}
        </div>
      ) : editableCategories.length === 0 ? (
        <EmptyState icon="🏷️" title="No categories yet" subtitle="Add your first category above." />
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white divide-y divide-charcoal/10">
          {editableCategories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 p-4">
              {editingId === cat.id ? (
                <input
                  autoFocus
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(cat.id)}
                  className="flex-1 rounded-xl border-2 border-mustard bg-white px-3 py-2 text-sm focus:outline-none"
                />
              ) : (
                <div className="flex-1">
                  <p className="text-sm font-bold text-charcoal">{cat.label}</p>
                  <p className="text-xs text-charcoal/50">
                    {itemCount(cat.id)} item{itemCount(cat.id) !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              <div className="flex shrink-0 gap-2">
                {editingId === cat.id ? (
                  <button
                    onClick={() => saveEdit(cat.id)}
                    className="rounded-full bg-mustard px-3 py-1.5 text-xs font-bold text-charcoal hover:bg-mustard-dark transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(cat)}
                    className="rounded-full border-2 border-charcoal/10 px-3 py-1.5 text-xs font-bold text-charcoal hover:border-mustard transition-colors"
                  >
                    Rename
                  </button>
                )}
                <button
                  onClick={() => setDeleteTarget(cat)}
                  className="rounded-full border-2 border-chili/30 px-3 py-1.5 text-xs font-bold text-chili hover:bg-chili/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this category?"
        message={
          deleteTarget
            ? `"${deleteTarget.label}" will be removed. Items in it will keep the category tag but won't show under it in the menu tabs.`
            : ''
        }
        confirmLabel="Delete"
        danger
      />
    </div>
  );
}
