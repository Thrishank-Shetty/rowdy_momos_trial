import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, nextStatus } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import { formatCurrency } from '../../utils/format';

const NEXT_LABEL = {
  pending: 'Accept',
  preparing: 'Mark Ready',
  ready: 'Mark Served',
  served: 'Mark Completed',
};

const STATUS_FILTERS = ['all', 'pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'];

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [cancelTarget, setCancelTarget] = useState(null);
  const { showToast } = useToast();

  const loadOrders = () => getOrders().then((data) => setOrders(data));

  useEffect(() => {
    loadOrders().then(() => setLoading(false));
  }, []);

  const handleAdvance = async (order) => {
    const next = nextStatus(order.status);
    if (!next) return;
    const updated = await updateOrderStatus(order.id, next);
    setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
    showToast(`${order.id} marked ${next}`);
  };

  const handleCancel = async () => {
    if (!cancelTarget) return;
    const updated = await updateOrderStatus(cancelTarget.id, 'cancelled');
    setOrders((prev) => prev.map((o) => (o.id === cancelTarget.id ? updated : o)));
    showToast(`${cancelTarget.id} cancelled`, { type: 'info' });
    setCancelTarget(null);
  };

  const visibleOrders =
    statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-1">Orders</h1>
      <p className="text-sm text-charcoal/60 mb-6">Manage incoming orders and update their status.</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
              statusFilter === s
                ? 'border-mustard bg-mustard text-charcoal'
                : 'border-charcoal/10 bg-white text-charcoal/60 hover:border-mustard/50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-charcoal-2" />
          ))}
        </div>
      ) : visibleOrders.length === 0 ? (
        <EmptyState icon="🧾" title="No orders here" subtitle="Nothing matches this status right now." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleOrders.map((order) => {
            const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
            const next = nextStatus(order.status);
            const canCancel = order.status !== 'completed' && order.status !== 'cancelled';

            return (
              <div key={order.id} className="rounded-2xl bg-white p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-sm text-charcoal">{order.id}</p>
                    <p className="text-xs text-charcoal/50">
                      Table {order.tableNumber} · {formatTime(order.orderTime)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                <div className="mt-3 space-y-1.5 border-t border-charcoal/10 pt-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-charcoal/70">
                      <span>
                        {item.name} <span className="text-charcoal/40">· {item.variantLabel}</span> ×{' '}
                        {item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {order.instructions && (
                  <p className="mt-3 rounded-lg bg-mustard/10 px-3 py-2 text-xs text-charcoal/70">
                    📝 {order.instructions}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between text-xs font-bold text-charcoal/60">
                  <span>⏱️ Est. {order.estimatedPrepTime} min</span>
                  <span className="font-display text-sm text-charcoal">{formatCurrency(total)}</span>
                </div>

                {(next || canCancel) && (
                  <div className="mt-4 flex gap-2">
                    {next && (
                      <button
                        onClick={() => handleAdvance(order)}
                        className="flex-1 rounded-full bg-mustard py-2 text-xs font-bold text-charcoal hover:bg-mustard-dark transition-colors"
                      >
                        {NEXT_LABEL[order.status]}
                      </button>
                    )}
                    {canCancel && (
                      <button
                        onClick={() => setCancelTarget(order)}
                        className="rounded-full border-2 border-chili/40 px-4 py-2 text-xs font-bold text-chili hover:bg-chili/10 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Cancel this order?"
        message={cancelTarget ? `${cancelTarget.id} for Table ${cancelTarget.tableNumber} will be marked cancelled.` : ''}
        confirmLabel="Cancel Order"
        danger
      />
    </div>
  );
}
