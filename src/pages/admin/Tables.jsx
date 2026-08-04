import { useEffect, useState } from 'react';
import { getTables, endSession, disableTable, enableTable } from '../../services/tableService';
import { useToast } from '../../context/ToastContext';

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    getTables().then((data) => {
      setTables(data);
      setLoading(false);
    });
  }, []);

  const applyUpdate = (updated) => {
    setTables((prev) => prev.map((t) => (t.tableNumber === updated.tableNumber ? updated : t)));
  };

  const handleEndSession = async (table) => {
    const updated = await endSession(table.tableNumber);
    applyUpdate(updated);
    showToast(`Table ${table.tableNumber} session ended`);
  };

  const handleToggleDisabled = async (table) => {
    const updated = table.disabled
      ? await enableTable(table.tableNumber)
      : await disableTable(table.tableNumber);
    applyUpdate(updated);
    showToast(`Table ${table.tableNumber} ${updated.disabled ? 'disabled' : 'enabled'}`);
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-charcoal mb-1">Tables</h1>
      <p className="text-sm text-charcoal/60 mb-6">See which tables are seated and manage sessions.</p>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-charcoal-2" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tables.map((table) => (
            <div
              key={table.tableNumber}
              className={`rounded-2xl p-4 ${
                table.disabled
                  ? 'bg-charcoal-2/50 opacity-60'
                  : table.status === 'occupied'
                    ? 'bg-chili/10'
                    : 'bg-veg/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-charcoal">#{table.tableNumber}</span>
                {table.activeSession && !table.disabled && (
                  <span className="h-2.5 w-2.5 rounded-full bg-chili animate-pulse" title="Active session" />
                )}
              </div>
              <p className="mt-1 text-xs text-charcoal/60">{table.seats} seats</p>
              <p
                className={`mt-2 text-xs font-bold capitalize ${
                  table.disabled ? 'text-charcoal/40' : table.status === 'occupied' ? 'text-chili' : 'text-veg'
                }`}
              >
                {table.disabled ? 'Disabled' : table.status}
              </p>

              <div className="mt-3 flex flex-col gap-1.5">
                <button
                  onClick={() => setViewing(table)}
                  className="w-full rounded-full border-2 border-charcoal/10 py-1.5 text-[11px] font-bold text-charcoal hover:border-mustard transition-colors"
                >
                  View
                </button>
                {table.activeSession && !table.disabled && (
                  <button
                    onClick={() => handleEndSession(table)}
                    className="w-full rounded-full bg-mustard py-1.5 text-[11px] font-bold text-charcoal hover:bg-mustard-dark transition-colors"
                  >
                    End Session
                  </button>
                )}
                <button
                  onClick={() => handleToggleDisabled(table)}
                  className={`w-full rounded-full py-1.5 text-[11px] font-bold transition-colors ${
                    table.disabled
                      ? 'bg-veg/15 text-veg hover:bg-veg/25'
                      : 'border-2 border-chili/30 text-chili hover:bg-chili/10'
                  }`}
                >
                  {table.disabled ? 'Enable Table' : 'Disable Table'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4"
          onClick={() => setViewing(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-cream p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg text-charcoal mb-4">Table {viewing.tableNumber}</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal/50">Seats</dt>
                <dd className="font-bold text-charcoal">{viewing.seats}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal/50">Status</dt>
                <dd className="font-bold capitalize text-charcoal">
                  {viewing.disabled ? 'Disabled' : viewing.status}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal/50">Active Session</dt>
                <dd className="font-bold text-charcoal">
                  {viewing.activeSession && !viewing.disabled ? 'Yes' : 'No'}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => setViewing(null)}
              className="mt-6 w-full rounded-full bg-mustard py-2.5 text-sm font-bold text-charcoal hover:bg-mustard-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
