import Modal from './Modal';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  danger = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="p-6 text-center">
        <h2 className="font-display text-lg text-charcoal mb-2">{title}</h2>
        {message && <p className="text-sm text-charcoal/60 mb-6">{message}</p>}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-charcoal/10 py-2.5 text-sm font-bold text-charcoal hover:bg-charcoal/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-full py-2.5 text-sm font-bold text-cream transition-colors ${
              danger ? 'bg-chili hover:bg-chili-dark' : 'bg-mustard text-charcoal hover:bg-mustard-dark'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
