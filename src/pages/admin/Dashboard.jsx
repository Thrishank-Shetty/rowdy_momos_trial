import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../services/orderService';
import DashboardCard from '../../components/admin/DashboardCard';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import { formatCurrency } from '../../utils/format';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const counts = useMemo(
    () => ({
      pending: orders.filter((o) => o.status === 'pending').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      ready: orders.filter((o) => o.status === 'ready').length,
      completed: orders.filter((o) => o.status === 'served' || o.status === 'completed').length,
    }),
    [orders]
  );

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-1">Dashboard</h1>
      <p className="text-sm text-charcoal/60 mb-8">A live look at how the kitchen is running.</p>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-charcoal-2" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <DashboardCard label="Pending Orders" value={counts.pending} icon="⏳" accent="mustard" />
          <DashboardCard label="Preparing" value={counts.preparing} icon="🍳" accent="chili" />
          <DashboardCard label="Ready" value={counts.ready} icon="✅" accent="veg" />
          <DashboardCard label="Completed" value={counts.completed} icon="🎉" accent="charcoal" />
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base text-charcoal">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm font-bold text-chili hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-charcoal/50">Loading orders…</p>
        ) : recentOrders.length === 0 ? (
          <p className="py-8 text-center text-sm text-charcoal/50">No orders yet.</p>
        ) : (
          <div className="divide-y divide-charcoal/10">
            {recentOrders.map((order) => {
              const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
              return (
                <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <p className="text-sm font-bold text-charcoal">
                      {order.id} · Table {order.tableNumber}
                    </p>
                    <p className="text-xs text-charcoal/50">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} ·{' '}
                      {formatCurrency(total)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
